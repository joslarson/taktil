import { MidiMessage, SysexMessage, MessagePattern } from '../midi/';
import { AbstractComponent } from '../component'
import { Color } from '../helpers';
import session from '../../session';


export interface AbstractControlBaseState {
    value: number;
    color?: Color;
    [key: string]: any;
}

abstract class AbstractControl<State extends AbstractControlBaseState = AbstractControlBaseState> {
    name: string;
    mode: 'ABSOLUTE' | 'RELATIVE' = 'ABSOLUTE';

    inPort: number = 0;
    outPort: number = 0;
    patterns: MessagePattern[];

    cache: string[] = [];
    cacheOnMidiIn: boolean = true;
    enableMidiOut: boolean = true;

    abstract state: State;

    private _initialState: State;
    private _activeComponent: AbstractComponent | null = null;

    constructor({ port, inPort, outPort, patterns }: {
        port?: number, inPort?: number, outPort?: number,
        patterns: (string | MessagePattern)[],  // patterns for all inPort and outPort MidiMessages
    }) {
        if (!patterns || patterns.length === 0) throw new Error(`Error, Control must specify at least one pattern.`);

        // set object properties
        this.inPort = port !== undefined ? port : (inPort !== undefined ? inPort : this.inPort);
        this.outPort = port !== undefined ? port : (outPort !== undefined ? outPort : this.outPort);
        this.patterns = patterns
            .map(pattern => typeof pattern === 'string' ? new MessagePattern(pattern) : pattern);
    }

    get initialState(): State {
        // if not set by setState, store initialized state value
        if (!this._initialState) this._initialState = JSON.parse(JSON.stringify(this.state));
        return this._initialState;
    }

    setState(partialState: Partial<State>, render = true): void {
        // if not set by initialState getter, store initialized state value
        if (!this.initialState) this._initialState = JSON.parse(JSON.stringify(this.state));

        if (partialState.value) {
            // validate input
            const invalidAbsoluteValue = this.mode === 'ABSOLUTE'
                && (partialState.value > 1 || partialState.value < 0);
            const invalidRelativeValue = this.mode === 'RELATIVE'
                && (partialState.value > 1 || partialState.value < -1);
            if (invalidAbsoluteValue || invalidRelativeValue) throw new Error(`Invalid value "${partialState.value}" for Control "${this.name}" with value range ${this.mode === 'ABSOLUTE' ? 0 : -1} to 1.`);
        }
        // update state
        this.state = { ...this.state as object, ...partialState as object } as State;  // TODO: should be able to remove type casting in typescript 2.4
        // re-render with new state
        if (render) this.render();
    }

    get activeComponent() {
        return this._activeComponent;
    }

    set activeComponent(component: AbstractComponent | null) {
        // component not changing? do nothing
        if (component === this._activeComponent) return;
        this._activeComponent = component;

        // on component change, reset state to default
        this.setState(this.initialState, false);

        // render new control state
        if (component) {
            component.render();
        } else {
            this.render();
        }
    }

    getOutput?(state: State): (MidiMessage | SysexMessage)[];

    abstract getInput(message: MidiMessage | SysexMessage): State;

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
        // update cache with input
        if (this.cacheOnMidiIn) this.cacheMidiMessage(midiMessage);

        if (this.activeComponent) {
            this.activeComponent.onControlInput(this, this.getInput(midiMessage));
        } else {
            // re-render based on current state (messages will only be sent if they are
            // different than what's in the cache)
            this.render();
            console.info(`Control "${this.name}" is not mapped in active view stack.`);
        }
    }

    onSysex(sysexMessage: SysexMessage) {
        if (this.activeComponent) {
            this.activeComponent.onControlInput(this, this.getInput(sysexMessage));
        } else {
            this.render();
            console.info(`Control "${this.name}" is not mapped in active view stack.`);
        }
    }

    preRender?(): void;

    render() {
        // no midi out? no render.
        if (!this.enableMidiOut) return;

        // pre render hook
        if (this.preRender) this.preRender();

        // send messages
        if (this.getOutput) {
            for (let message of this.getOutput(this.state)) {
                if (message instanceof MidiMessage) {
                    // send message to cache, send to midi out if new
                    if (this.cacheMidiMessage(message)){
                        const { port, status, data1, data2 } = message;
                        session.midiOut.sendMidi({ name: this.name, port, status, data1, data2 });
                    }
                } else if (message instanceof SysexMessage) {
                    const { port, data } = message;
                    session.midiOut.sendSysex({ port, data })
                } else {
                    throw new Error('Unrecognized message type.');
                }
            }
        }

        // post render hook
        if (this.postRender) this.postRender();
    }

    postRender?(): void;
}


export default AbstractControl;
