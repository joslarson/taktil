import { SimpleMidiMessage, MidiMessage, SysexMessage, MidiPattern } from '../midi/';
import { AbstractComponent } from '../component'
import session from '../../session';


export interface Color {
    r: number;
    g: number;
    b: number;
}

abstract class AbstractControl {
    name: string;
    resolution: number = 128;
    defaultState: { value: number, color: Color, [others: string]: any} = { value: 0, color: { r: 0, g: 0, b: 0 } };
    state = { ...this.defaultState };

    inPort: number = 0;
    outPort: number = 0;
    patterns: MidiPattern[];

    cache: string[] = [];
    cacheOnMidiIn: boolean = true;
    enableMidiOut: boolean = true;

    activeComponent: AbstractComponent = null;

    constructor({ port, inPort, outPort, patterns }: {
        port?: number, inPort?: number, outPort?: number, patterns: string[],  // patterns for all inPort and outPort MidiMessages
    }) {
        if (!patterns || patterns.length === 0) throw new Error(`Error, Control must specify at least one pattern.`);

        // set object properties
        this.inPort = port !== undefined ?  port : (inPort !== undefined ? inPort : this.inPort);
        this.outPort = port !== undefined ?  port : (outPort !== undefined ? outPort : this.outPort);
        this.patterns = patterns.map(pattern => new MidiPattern(pattern));
    }

    abstract getRenderMessages(): (MidiMessage | SysexMessage)[];

    abstract getStateFromInput(message: MidiMessage | SysexMessage): { value: number, color: Color, [others: string]: any };

    cacheMidiMessage(midiMessage: MidiMessage): boolean {
        if (this.cache.indexOf(midiMessage.hex) !== -1) return false;
        for (let i = 0; i < this.patterns.length; i++) {
            const pattern = this.patterns[i];
            if (pattern.test(midiMessage)) {
                this.cache[i] = midiMessage.hex;
                return true;
            }
        }
        // no match
        throw new Error(`MidiMessage "${midiMessage.hex}" does not match existing pattern on Control "${this.name}".`);
    }

    onMidi(midiMessage: MidiMessage) {
        if (this.cacheOnMidiIn) {
            // update cache with input
            this.cacheMidiMessage(midiMessage);
            // re-render based on current state (messages will only be sent if they are different than what's in the cache)
            this.render(this.state);
        }

        if (this.activeComponent) {
            this.activeComponent.onControlInput(this, this.getStateFromInput(midiMessage));
        } else {
            console.info(`Control "${this.name}" is not mapped in active view stack.`);
        }
    }

    render(state?: { value: number, color?: Color, [others: string]: any}, urgent = false) {
        // no midi out? no render.
        if (!this.enableMidiOut) return;
        // if render called with no args
        if (state === undefined) {
            // if control connected in view, recall render through component
            if (this.activeComponent) {
                this.activeComponent.renderControl(this);
            } else {  // otherwise, render default state
                this.renderDefaultState();
            }
        } else {
            // validate input
            if (state.value < 0 || state.value > this.resolution - 1) throw new Error(`Invalid value "${state.value}" for Control "${this.name}" with resolution "${this.resolution}".`);
            // remove undefined object property keys from incoming state to allow default state to override
            Object.keys(state).forEach(key => state[key] === undefined && delete state[key]);
            // update state
            this.state = { ...this.defaultState, ...state };
            // send messages
            for (let message of this.getRenderMessages()) {
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
    }

    renderDefaultState(urgent = false) {
        this.render({ ...this.defaultState }, urgent);
    }
}


export default AbstractControl;
