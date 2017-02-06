import { MidiControl, MidiOutProxy, SimpleMidiMessage, MidiMessage, SysexMessage } from './core/midi';
import AbstractView from './core/view/AbstractView';
import { AbstractComponentBase } from 'core/component';
import * as api from 'bitwig-api-proxy';
import { midiMessageToHex } from './utils';
import logger from './logger';
import host from './host';


export class Session {
    private _midiControls: MidiControl[] = [];
    private _registeredMidiControls: MidiControl[] = [];
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
            const midiInPorts = this.getMidiInPorts();
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

    getMidiInPorts(): api.MidiIn[] {
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
        const midiControl = this.findMidiControl(midiMessage);

        if (midiControl !== undefined) {
            logger.debug(`MIDI IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}${midiControl.name ? ` "${midiControl.name}"` : ''}`);
            midiControl.onMidi(midiMessage);
        } else {
            logger.debug(`MIDI IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}`);
        }
    }

    onSysex(sysex: SysexMessage) {
        logger.debug(`IN ${String(sysex.port)} => ${sysex.data}`);
    }

    // Event Hooks
    //////////////////////////////

    on(eventName: 'init' | 'flush' | 'exit' | 'setActiveView' | 'activateMode' | 'deactivateMode', callback: (...args: any[]) => any) {
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

    setMidiControls(midiControls: { [name: string]: MidiControl }) {
        const midiControlsArray = [];
        for (let midiControlName in midiControls) {
            // set midi control name on object
            midiControls[midiControlName].name = midiControlName;
            // add to midi control array
            midiControlsArray.push(midiControls[midiControlName]);
        }
        this._midiControls = midiControlsArray;
    }

    getMidiControls() {
        return [...this._midiControls];
    }

    registerMidiControl(midiControl: MidiControl) {
        if (this._registeredMidiControls.indexOf(midiControl) === -1) this._registeredMidiControls.push(midiControl);
    }

    getRegisteredMidiControls() {
        return [...this._registeredMidiControls];
    }

    findMidiControl(midiMessage: MidiMessage): MidiControl | undefined {
        // construct hex representation for patter comparison
        const midiMessageHex = midiMessageToHex(midiMessage);
        // look for a matching registered midiControl
        for (let midiControl of this.getMidiControls()) {
            // skip midiControls with an inPort that does not match the midiMessage port
            if (midiControl.inPort !== midiMessage.port) continue;

            let match = true;
            for (let pattern of midiControl.patterns) {
                for (let i = 0; i < 6; i++) {
                    // if not a match, break early
                    if (pattern[i] !== '?' && pattern[i] !== midiMessageHex[i]) {
                        match = false;
                        break;
                    }
                }
                // if found, return it
                if (match) return midiControl;
            }
        }
        // not found, return undefined
        return undefined;
    }

    renderMidiControls() {
        if (!this.getActiveView()) return;  // can't do anything until we have an active view

        for (let midiControl of this.getMidiControls()) {
            this.getActiveView().getInstance().connectMidiControl(midiControl);
            // connect midi control to corresponding component in view if any
            if (midiControl.activeComponent) {
                midiControl.activeComponent.renderMidiControl(midiControl);
            } else {  // otherwise render default state
                midiControl.renderDefaultState();
            }
        }
    }

    // Views
    //////////////////////////////

    registerView(View: typeof AbstractView): void {
        if (!global.__is_init__) throw 'Untimely view registration: views can only be registered from within the init callback.';
        const instance = View.getInstance();  // getInstance must be called here to instantiate during init
        const views = this.getViews();

        if (instance.parent && views.indexOf(instance.parent) === -1) throw `Invalid view registration order: Parent view "${instance.parent.name}" must be registered before child view "${View.name}".`;

        if (views.indexOf(View) === -1) this._views = [...views, View];
        instance.onRegister();
    }

    getViews() {
        return [...this._views];
    }

    setActiveView(View: typeof AbstractView) {
        if (this.getViews().indexOf(View) === -1) throw new Error(`${View.name} must first be registered before being set as the active view.`);
        this._activeView = View;
        this._callEventCallbacks('setActiveView', View);
        this.renderMidiControls();
    }

    getActiveView(): typeof AbstractView {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    getActiveModes() {
        return [...this._activeModes, '__BASE__']
    }

    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode);  // prepend to modes
        this._callEventCallbacks('activateMode', mode);
        this.renderMidiControls(); // call refresh
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this._callEventCallbacks('deactivateMode', mode);
            this.renderMidiControls(); // call refresh
        }
    }
}

let session = new Session();


export default session;
