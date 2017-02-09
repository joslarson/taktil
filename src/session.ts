import { MidiOutProxy, SimpleMidiMessage, MidiMessage, SysexMessage } from './core/midi';
import { AbstractControl } from 'core/control';
import { AbstractView } from './core/view';
import { AbstractComponent } from 'core/component';
import { midiMessageToHex } from './utils';
import logger from './logger';


export class Session {
    private _controls: { [key: string]: AbstractControl } = {};
    private _registeredControls: AbstractControl[] = [];
    private _views: typeof AbstractView[] = [];
    private _activeView: typeof AbstractView;
    private _activeModes: string[] = [];
    private _eventHandlers: { [key: string]: Function[] } = {};
    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        global.init = () => {
            global.__is_init__ = true;
            // call the session init callbacks
            this._callEventCallbacks('init');
            // setup midi/sysex callbacks per port
            const midiInPorts = this.midiInPorts;
            for (let port = 0; port < midiInPorts.length; port++) {
                midiInPorts[port].setMidiCallback((status: number, data1: number, data2: number) => {
                    this.onMidi(new MidiMessage({port, status, data1, data2}));
                });
                midiInPorts[port].setSysexCallback((data: string) => {
                    this.onSysex(new SysexMessage({ port, data }));
                });
            }
            global.__is_init__ = false;
        };

        global.flush = () => {
            this._callEventCallbacks('flush');
        };

        global.exit = () => {
            // TODO: send exit event to active components
            // call the session exit callbacks
            this._callEventCallbacks('exit');
        };
    }

    // Midi
    //////////////////////////////

    get midiInPorts(): API.MidiIn[] {
        const midiInPorts = [];
        for (let i = 0; true; i++) {
            try {
                midiInPorts[i] = host.getMidiInPort(i);
            } catch (error) {
                break;
            }
        }
        return midiInPorts;
    }

    onMidi(midiMessage: MidiMessage) {
        const control = this.findControl(midiMessage);

        if (control !== undefined) {
            logger.debug(`MIDI IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}${control.name ? ` "${control.name}"` : ''}`);
            control.onMidi(midiMessage);
        } else {
            logger.debug(`MIDI IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}`);
        }
    }

    onSysex(sysex: SysexMessage) {
        logger.debug(`IN ${String(sysex.port)} => ${sysex.data}`);
    }

    // Event Hooks
    //////////////////////////////

    on(eventName: 'init' | 'flush' | 'exit' | 'activateView' | 'activateMode' | 'deactivateMode', callback: (...args: any[]) => any) {
        if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
        this._eventHandlers[eventName].push(callback);
        return this;
    }

    private _callEventCallbacks(eventName: string, ...args) {
        if (this._eventHandlers[eventName] === undefined) return;

        let callbackList = this._eventHandlers[eventName];
        for (let callback of callbackList) {
            callback.apply(this, args);
        }
    }

    // Midi Controls
    //////////////////////////////

    set controls(controls: { [name: string]: AbstractControl }) {
        const controlsArray = [];
        for (let controlName in controls) {
            // set midi control name on object
            controls[controlName].name = controlName;
            // add to midi control array
            controlsArray.push(controls[controlName]);
        }
        this._controls = controls;
    }

    get controls() {
        return { ...this._controls };
    }

    registerControl(control: AbstractControl) {
        if (this._registeredControls.indexOf(control) === -1) this._registeredControls.push(control);
    }

    get registeredControls() {
        return [...this._registeredControls];
    }

    findControl(midiMessage: MidiMessage): AbstractControl | undefined {
        // construct hex representation for patter comparison
        const midiMessageHex = midiMessageToHex(midiMessage);
        // look for a matching registered control
        for (let controlName in this.controls) {
            const control = this.controls[controlName];

            // skip controls with an inPort that does not match the midiMessage port
            if (control.inPort !== midiMessage.port) continue;

            let match = true;
            for (let pattern of control.patterns) {
                for (let i = 0; i < 6; i++) {
                    // if not a match, break early
                    if (pattern[i] !== '?' && pattern[i] !== midiMessageHex[i]) {
                        match = false;
                        break;
                    }
                }
                // if found, return it
                if (match) return control;
            }
        }
        // not found, return undefined
        return undefined;
    }

    renderControls() {
        if (!this.activeView) return;  // can't do anything until we have an active view

        for (let controlName in this.controls) {
            const control = this.controls[controlName];
            this.activeView.getInstance().connectControl(control);
            // connect midi control to corresponding component in view if any
            if (control.activeComponent) {
                control.activeComponent.renderControl(control);
            } else {  // otherwise render default state
                control.renderDefaultState();
            }
        }
    }

    // Views
    //////////////////////////////

    set views(Views: typeof AbstractView[]) {
        if (!global.__is_init__) throw 'Untimely view registration: views can only be registered from within the init callback.';
        for (let View of Views) {
            const instance = View.getInstance();  // getInstance must be called here to instantiate during init
            const views = this.views;

            if (instance.parent && views.indexOf(instance.parent) === -1) throw `Invalid view registration order: Parent view "${instance.parent.name}" must be registered before child view "${View.name}".`;

            if (views.indexOf(View) === -1) this._views = [...views, View];
            instance.onRegister();
        }
    }

    get views() {
        return [...this._views];
    }

    set activeView(View: typeof AbstractView) {
        if (this.views.indexOf(View) === -1) throw new Error(`${View.name} must first be registered before being set as the active view.`);
        this._activeView = View;
        this._callEventCallbacks('activateView', View);
        this.renderControls();
    }

    get activeView(): typeof AbstractView {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    get activeModes() {
        return [...this._activeModes, '__BASE__']
    }

    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode);  // prepend to modes
        this._callEventCallbacks('activateMode', mode);
        this.renderControls(); // call refresh
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this._callEventCallbacks('deactivateMode', mode);
            this.renderControls(); // call refresh
        }
    }
}

let session = new Session();


export default session;
