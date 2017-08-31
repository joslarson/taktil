import { session } from '../../taktil';
import { MidiMessage, SysexMessage, MessagePattern } from '../midi/';
import { Component } from '../component';
import { Color } from '../helpers';

export interface ControlState {
    value: number;
    color?: Color;
    [key: string]: any;
}

/**
 * Abstract class defining the the base functionality from which all
 * other controls must extend.
 */
export abstract class Control<State extends ControlState = ControlState> {
    name: string;
    patterns: MessagePattern[];

    cache: string[] = [];
    enableMidiOut: boolean = true;
    cacheOnMidiIn: boolean = true;

    minValue = 0;
    maxValue = 127;
    get valueRange() {
        return this.maxValue - this.minValue;
    }

    abstract state: State;

    private _defaultState: State;
    private _activeComponent: Component | null = null;

    constructor(...patterns: (string | MessagePattern)[]) {
        if (!patterns || patterns.length === 0)
            throw new Error(`Error, Control must specify at least one pattern.`);
        // set object properties
        this.patterns = patterns.map(
            pattern => (typeof pattern === 'string' ? new MessagePattern(pattern) : pattern)
        );
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
                        .name}" with value range ${this.minValue} to ${this.maxValue}.`
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

    abstract getControlInput(message: MidiMessage | SysexMessage): State;

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
                .name}".`
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
            console.info(`Control "${this.name}" is not mapped in active view stack.`);
        }
    }

    getMidiOutput?(state: State): (MidiMessage | SysexMessage)[];

    // render

    controlWillRender?(messages: (MidiMessage | SysexMessage)[]): void;

    render(force = false): boolean {
        // no midi out? no render.
        if (!this.enableMidiOut || !this.getMidiOutput) return false;

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
                session.midiOut.sendMidi({
                    port,
                    status,
                    data1,
                    data2,
                    urgent,
                    name: this.name,
                });
            } else {
                // send sysex message
                const { port, data } = message;
                session.midiOut.sendSysex({ port, data });
            }
        }

        // call post render hook
        if (this.controlDidRender) this.controlDidRender();
        return true;
    }

    controlDidRender?(): void;
}
