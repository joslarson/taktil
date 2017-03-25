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
    mode: 'ABSOLUTE' | 'RELATIVE' = 'ABSOLUTE';
    minValue: number = 0;
    maxValue: number = 127;
    state: { value: number, color: Color, [others: string]: any} = { value: 0, color: { r: 0, g: 0, b: 0 } };
    protected _defaultState: { value: number, color: Color, [others: string]: any };

    inPort: number = 0;
    outPort: number = 0;
    patterns: MidiPattern[];

    cache: string[] = [];
    cacheOnMidiIn: boolean = true;
    enableMidiOut: boolean = true;

    protected _activeComponent: AbstractComponent<any> = null;

    constructor({ port, inPort, outPort, patterns }: {
        port?: number, inPort?: number, outPort?: number, patterns: (string | MidiPattern)[],  // patterns for all inPort and outPort MidiMessages
    }) {
        if (!patterns || patterns.length === 0) throw new Error(`Error, Control must specify at least one pattern.`);

        // set object properties
        this.inPort = port !== undefined ?  port : (inPort !== undefined ? inPort : this.inPort);
        this.outPort = port !== undefined ?  port : (outPort !== undefined ? outPort : this.outPort);
        this.patterns = patterns.map(pattern => typeof pattern === 'string' ? new MidiPattern(pattern) : pattern);
    }

    get defaultState() {
        if (!this._defaultState) this._defaultState = { ...this.state };
        return this._defaultState;
    }

    get activeComponent() {
        return this._activeComponent;
    }

    set activeComponent(component: AbstractComponent<any>) {
        // component not changing? do nothing
        if (component === this._activeComponent) return;
        this._activeComponent = component;

        // on component change, reset state to default
        this.state = this.defaultState;

        // render new control state
        if (component) {
            component.updateControlState(this);
        } else {
            this.render();
        }
    }

    abstract getRenderMessages(): (MidiMessage | SysexMessage)[];

    abstract getInputState(message: MidiMessage | SysexMessage): { value: number, color: Color, [others: string]: any };

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
            this.activeComponent.onControlInput(this, this.getInputState(midiMessage));
        } else {
            // re-render based on current state (messages will only be sent if they are different than what's in the cache)
            this.render();
            console.info(`Control "${this.name}" is not mapped in active view stack.`);
        }
    }

    setState(state: { value?: number, color?: Color, [others: string]: any }) {
        // validate input
        if (state.value !== undefined && (state.value < this.minValue || state.value > this.maxValue)) throw new Error(`Invalid value "${state.value}" for Control "${this.name}" with value range ${this.minValue} to ${this.maxValue}.`);
        // update state
        this.state = { ...this.state, ...state };
        // re-render
        this.render();
    }

    preRender() {
        // ... optionally implemented in child class
    }

    render() {
        // no midi out? no render.
        if (!this.enableMidiOut) return;

        // pre render hook
        this.preRender();

        // send messages
        for (let message of this.getRenderMessages()) {
            if (message instanceof MidiMessage) {
                // send message to cache, send to midi out if new
                if (this.cacheMidiMessage(message)){
                    const { port, status, data1, data2 } = message;
                    session.midiOut.sendMidi({ name: this.name, status, data1, data2 });
                }
            } else if (message instanceof SysexMessage) {
                const { port, data } = message;
                session.midiOut.sendSysex({ port, data })
            } else {
                throw new Error('Unrecognized message type.');
            }
        }

        // post render hook
        this.postRender();
    }

    postRender() {
        // ... optionally implemented in child class
    }
}


export default AbstractControl;
