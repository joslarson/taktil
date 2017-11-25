import { MidiMessage, SimpleMidiMessage, SysexMessage, MessagePattern } from '../midi/';
import { Component } from '../component';
import { Color } from '../helpers';
import { Session } from '../session';

export interface ControlState {
    value: number;
    color?: Color;
    brightness?: number;
    pulse?:
        | boolean
        | {
              on: boolean;
              type?: 'sync' | 'free';
              rate?: number;
          };
    [key: string]: any;
}

type PatternInitializer = string | Partial<SimpleMidiMessage> | MessagePattern;

/**
 * Abstract class defining the the base functionality from which all
 * other controls must extend.
 */
export class Control<State extends ControlState = ControlState> {
    label: string;
    session: Session;
    patterns: MessagePattern[];

    port?: number;
    status?: number;
    data1?: number;
    data2?: number;

    minValue = 0;
    maxValue = 127;
    enableMidiOut = true;
    enableCache = true;
    cacheOnMidiIn = true;

    state: State = { value: 0 } as State;

    protected cache: string[] = [];
    private _defaultState: State;
    private _activeComponent: Component | null = null;

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

    get valueRange() {
        return this.maxValue - this.minValue;
    }

    // state

    get defaultState(): State {
        // if not set by setState, store initialized state value
        if (!this._defaultState) this._defaultState = JSON.parse(JSON.stringify(this.state));
        return this._defaultState;
    }

    setState(partialState: Partial<State>, render = true): void {
        this.defaultState; // make sure defaultState has been initialized
        if (partialState.value) {
            // validate value input
            if (partialState.value > this.maxValue || partialState.value < this.minValue) {
                throw new Error(
                    `Invalid value "${partialState.value}" for Control "${this
                        .label}" with value range ${this.minValue} to ${this.maxValue}.`
                );
            }
        }
        // update state
        this.state = {
            ...this.state as object,
            ...partialState as object,
        } as State; // TODO: should be able to remove type casting in future typescript release
        // re-render with new state
        if (render) this.render();
    }

    // active component

    get activeComponent() {
        return this._activeComponent;
    }

    set activeComponent(component: Component | null) {
        // component not changing? do nothing
        if (component === this._activeComponent) return;
        this._activeComponent = component;

        // on component change, reset state to default
        this.setState(this.defaultState, false);

        // render new control state
        component ? component.render() : this.render();
    }

    // midi i/o

    getControlInput(message: MidiMessage | SysexMessage): State {
        if (
            message instanceof MidiMessage &&
            message.status === this.status &&
            message.data1 === this.data1
        ) {
            return { ...this.state as ControlState, value: message.data2 } as State; // TODO: should be able to remove type casting in future typescript release
        } else {
            return this.state;
        }
    }

    cacheMidiMessage(midiMessage: MidiMessage): boolean {
        if (this.cache.indexOf(midiMessage.hex) !== -1) return false;
        for (let i = 0; i < this.patterns.length; i += 1) {
            const pattern = this.patterns[i];
            if (pattern.test(midiMessage)) {
                this.cache[i] = midiMessage.hex;
                return true;
            }
        }
        // no match
        throw new Error(
            `MidiMessage "${midiMessage.hex}" does not match existing pattern on Control "${this
                .label}".`
        );
    }

    onMidiInput(message: MidiMessage | SysexMessage) {
        // update cache with input
        if (this.cacheOnMidiIn && message instanceof MidiMessage) this.cacheMidiMessage(message);

        if (this.activeComponent) {
            this.activeComponent.onControlInput(this.getControlInput(message));
        } else {
            // re-render based on current state (messages will only be sent if they are
            // different than what's in the cache)
            this.render();
            console.info(`Control "${this.label}" is not mapped in the active view stack.`);
        }
    }

    getMidiOutput(state: State): (MidiMessage | SysexMessage)[] {
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
        const messages = this.getMidiOutput(this.state).filter(message => {
            if (message instanceof MidiMessage) {
                // send midi message to cache, add to message list if new
                return this.cacheMidiMessage(message) || force;
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
