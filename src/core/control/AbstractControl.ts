import { SimpleMidiMessage, MidiMessage, SysexMessage } from '../midi/';
import { AbstractComponent } from '../component'
import session from '../../session';
import logger from '../../logger';


export function getPatternFromMidi({
    status = undefined, data1 = undefined, data2 = undefined,
}: {
    status?: number, data1?: number, data2?: number,
}) {
    let result = '';
    for (let midiByte of [status, data1, data2]) {
        if (midiByte === undefined) {
            result = `${result}??`
        } else {
            let hexByteString = midiByte.toString(16).toUpperCase();
            if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
            result = `${result}${hexByteString}`;
        }
    }
    return result;
}

export function getMidiFromPattern(pattern: string) {
    const status = pattern.slice(0, 2);
    const data1 = pattern.slice(2, 4);
    const data2 = pattern.slice(4, 6);

    return {
        status: status.indexOf('?') === -1 ? parseInt(status, 16): undefined,
        data1: data1.indexOf('?') === -1 ? parseInt(data1, 16): undefined,
        data2: data2.indexOf('?') === -1 ? parseInt(data2, 16): undefined,
    }
}

export function patternIsValid(pattern: string) {
    return /[a-fA-F0-9\?]{6}/.test(pattern);
}

export interface Color {
    r: number;
    g: number;
    b: number;
}

abstract class AbstractControl {
    name: string;
    resolution: number = 128;
    defaultState = { value: 0, color: { r: 0, g: 0, b: 0 } as Color };
    state = { ...this.defaultState };

    inPort: number = 0;
    outPort: number = 0;
    patterns: string[];

    cache: string[] = [];
    cacheOnMidiIn: boolean = true;
    enableMidiOut: boolean = true;

    activeComponent: AbstractComponent = null;

    constructor({ port, inPort, outPort, patterns }: {
        port?: number, inPort?: number, outPort?: number, patterns: string[],  // patterns for all inPort and outPort MidiMessages
    }) {
        if (!patterns || patterns.length === 0) throw new Error(`Error, Control must specify at least one pattern.`);
        // verify pattern strings are valid
        for (let pattern of patterns) {
            if (!patternIsValid(pattern)) throw new Error(`Invalid midi pattern: "${pattern}"`);
        }

        // set object properties
        this.inPort = port !== undefined ?  port : (inPort !== undefined ? inPort : this.inPort);
        this.outPort = port !== undefined ?  port : (outPort !== undefined ? outPort : this.outPort);
        this.patterns = patterns;
    }

    abstract getRenderMessages({ value, color }: { value: number, color?: Color }): (MidiMessage | SysexMessage)[];

    abstract getValueFromMessage(message: MidiMessage | SysexMessage): number;

    cacheMidiMessage(midiMessage: MidiMessage): boolean {
        const midiMessagePattern = getPatternFromMidi(midiMessage);
        if (this.cache.indexOf(midiMessagePattern) !== -1) return false;
        for (let i = 0; i < this.patterns.length; i++) {
            let isMatch = true;
            const pattern = this.patterns[i];
            for (let ii = 0; ii < 6; ii++) {
                // if not a match, break early
                if (pattern[ii] !== '?' && pattern[ii] !== midiMessagePattern[ii]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                this.cache[i] = midiMessagePattern;
                return true;
            }
        }
        // no match
        throw new Error(`MidiMessage "${midiMessagePattern}" does not match existing pattern on Control "${this.name}".`);
    }

    onMidi(midiMessage: MidiMessage) {
        if (this.cacheOnMidiIn) {
            // update cache with input
            this.cacheMidiMessage(midiMessage);
            // re-render based on current state (messages will only be sent if they are different than what's in the cache)
            this.sendRenderMessages(this.getRenderMessages({ ...this.state }));
        }

        if (this.activeComponent) {
            this.activeComponent.onValue(this, this.getValueFromMessage(midiMessage));
        } else {
            logger.info(`Control "${this.name}" is unused in active view stack.`);
        }
    }

    sendRenderMessages(messages: (MidiMessage | SysexMessage)[], urgent = false) {
        // no midi out? no midi out.
        if (!this.enableMidiOut) return;

        for (let message of messages) {
            if (message instanceof MidiMessage) {
                // send message to cache, send to midi out if new
                if (this.cacheMidiMessage(message)){
                    const { port, status, data1, data2 } = message;
                    session.midiOut.sendMidi({ name: this.name, status, data1, data2, urgent });
                }
            } else if (message instanceof SysexMessage) {
                const { port, data } = message;
                session.midiOut.sendSysex({ port, data, urgent })
            } else {
                throw new Error('Unrecognized message type.');
            }
        }
    }

    render({ value, color = this.defaultState.color, urgent = false }: { value: number, color?: Color, urgent?: boolean }) {
        // validate input
        if (value < 0 || value > this.resolution - 1) throw new Error(`Invalid Control value "${value}" for resolution "${this.resolution}".`);
        // update state
        this.state = { value, color };
        // get messages
        const messages = this.getRenderMessages({ value, color });
        // send messages
        this.sendRenderMessages(messages, urgent);
    }

    renderDefaultState() {
        this.render({ ...this.defaultState });
    }
}


export default AbstractControl;