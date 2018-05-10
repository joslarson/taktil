import { MessagePattern, MidiMessage, SimpleMidiMessage, SysexMessage } from '../message/';
import { Control, ControlState } from './Control';

export type MidiControlState = ControlState;

export class MidiControl<State extends MidiControlState = MidiControlState> extends Control<State> {
    protected cache: string[] = [];

    patterns: MessagePattern[];

    port?: number;
    status?: number;
    data1?: number;
    data2?: number;

    enableMidiOut = true;
    cacheOnMidiIn = true;

    constructor({
        patterns,
        minValue,
        maxValue,
        enableMidiOut,
        enableCache,
        cacheOnMidiIn,
    }: {
        patterns: (string | Partial<SimpleMidiMessage> | MessagePattern)[];
        minValue?: number;
        maxValue?: number;
        enableMidiOut?: boolean;
        enableCache?: boolean;
        cacheOnMidiIn?: boolean;
    }) {
        super();
        if (!patterns || patterns.length === 0)
            throw new Error(`Error, Control must specify at least one pattern.`);
        // set object properties
        this.patterns = patterns.map(
            pattern => (pattern instanceof MessagePattern ? pattern : new MessagePattern(pattern))
        );

        if (minValue !== undefined) this.minValue = minValue;
        if (maxValue !== undefined) this.maxValue = maxValue;
        if (enableMidiOut !== undefined) this.enableMidiOut = enableMidiOut;
        if (enableCache !== undefined) this.enableCache = enableCache;
        if (cacheOnMidiIn !== undefined) this.cacheOnMidiIn = cacheOnMidiIn;

        // pull out shared pattern info into port, status, data1, and data2
        const isShared = this.patterns.reduce(
            (result, p1, index) => {
                // if there's just one pattern, return all true
                if (index === 0) return result;
                const p2 = this.patterns[index - 1];
                if (result.port && p1.port !== p2.port) result.port = false;
                if (result.status && p1.status !== p2.status) result.status = false;
                if (result.data1 && p1.data1 !== p2.data1) result.data1 = false;
                if (result.data2 && p1.data2 !== p2.data2) result.data2 = false;
                return result;
            },
            { port: true, status: true, data1: true, data2: true }
        );
        const [{ port, status, data1, data2 }] = this.patterns;
        if (isShared.port) this.port = port;
        if (isShared.status) this.status = status;
        if (isShared.data1) this.data1 = data1;
        if (isShared.data2) this.data2 = data2;
    }

    // message i/o

    getControlInput(message: MidiMessage | SysexMessage): State {
        if (
            message instanceof MidiMessage &&
            message.status === this.status &&
            message.data1 === this.data1
        ) {
            return Object.assign({}, this.state, { value: message.data2 });
        } else {
            return this.state;
        }
    }

    cacheMessage(message: MidiMessage): boolean {
        if (this.cache.indexOf(message.hex) !== -1) return false;
        for (let i = 0; i < this.patterns.length; i += 1) {
            const pattern = this.patterns[i];
            if (pattern.test(message)) {
                this.cache[i] = message.hex;
                return true;
            }
        }
        // no match
        throw new Error(
            `MidiMessage "${message.hex}" does not match existing pattern on Control "${
                this.label
            }".`
        );
    }

    onInputMessage(message: MidiMessage | SysexMessage) {
        // update cache with input
        if (this.cacheOnMidiIn && message instanceof MidiMessage) this.cacheMessage(message);

        if (this.activeComponent) {
            this.activeComponent.onControlInput(this.getControlInput(message));
            this.render(); // make sure hardware reflects control state
        } else {
            // re-render based on current state (messages will only be sent if they are
            // different than what's in the cache)
            this.render();
            console.info(`Control "${this.label}" is not mapped in the active view stack.`);
        }
    }

    getOutputMessages(state: State): (MidiMessage | SysexMessage)[] {
        const { port, status, data1, data2 } = this;
        if (port !== undefined && status !== undefined && data1 !== undefined) {
            // if it's a simple midi control (port,status, and data1 provided), handle it
            return !data2 ? [new MidiMessage({ port, status, data1, data2: state.value })] : [];
        } else {
            // otherwise leave it up to the implementation
            return [];
        }
    }

    // render

    controlWillRender?(messages: (MidiMessage | SysexMessage)[]): void;

    render(force = !this.enableCache): boolean {
        // no midi out? no render.
        if (!this.enableMidiOut) return false;

        // get list of messages that will be sent
        const messages = this.getOutputMessages(this.state).filter(message => {
            if (message instanceof MidiMessage) {
                // send midi message to cache, add to message list if new
                return this.cacheMessage(message) || force;
            } else {
                // sysex messages are not cached, always send
                return true;
            }
        });

        // call pre render hook only if something will be rendered
        if (messages.length && this.controlWillRender) this.controlWillRender(messages);

        for (const message of messages) {
            if (message instanceof MidiMessage) {
                // send midi message
                const { port, status, data1, data2, urgent } = message;
                this.session.midiOut.sendMidi({
                    port,
                    status,
                    data1,
                    data2,
                    urgent,
                    label: this.label,
                });
            } else {
                // send sysex message
                const { port, data } = message;
                this.session.midiOut.sendSysex({ port, data });
            }
        }

        // call post render hook
        if (this.controlDidRender) this.controlDidRender(messages);
        return true;
    }

    controlDidRender?(messages: (MidiMessage | SysexMessage)[]): void;
}
