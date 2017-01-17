import { MidiControl, MidiOutProxy, MidiMessage, Sysex } from './core/midi';
import AbstractView from './core/view/AbstractView';
import { AbstractComponentBase } from 'core/component';
import * as api from 'bitwig-api-proxy';
import logger from './logger';
import host from './host';


export class Session {
    private _components: AbstractComponentBase[];
    private _views: typeof AbstractView[] = [];
    private _activeView: typeof AbstractView;
    private _activeModes: string[] = [];
    private _eventHandlers: { [key: string]: Function[] } = {};

    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        global.init = () => {
            global.__is_init__ = true;
            // setup midi/sysex callbacks per port
            const midiInPorts = this.getMidiInPorts();
            for (let port; port < midiInPorts.length; port++) {
                midiInPorts[port].setMidiCallback((status: number, data1: number, data2: number) => {
                    this.onMidi(new MidiMessage({port, status, data1, data2}));
                });
                midiInPorts[port].setSysexCallback((message: string) => {
                    this.onSysex(new Sysex({ port, message }));
                });
            }
            // call the session init callbacks
            this._callEventCallbacks('init');
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
        logger.debug(`(IN ${String(midiMessage.port)}) => ${midiMessage.status.toString(16).toUpperCase()}${midiMessage.data1.toString(16).toUpperCase()}${midiMessage.data2.toString(16).toUpperCase()}`);
        const activeView = this.getActiveView().getInstance();
        if (activeView) activeView.onMidi(midiMessage);
    }

    onSysex(sysex: Sysex) {
        logger.debug(`(IN ${String(sysex.port)}) => ${sysex.message}`);
        const activeView = this.getActiveView().getInstance();
        if (activeView) activeView.onSysex(sysex);
    }

    on(eventName: string, callback: Function) {
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

    render() {
        const activeView = this.getActiveView();
        if (!activeView) return;  // can't do anything until we have an active view
        for (let component of this._components) {
            activeView.getInstance().renderComponent(component);
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
        this.render();
    }

    getActiveView(): typeof AbstractView {
        return this._activeView;
    }

    // View Modes
    //////////////////////////////

    getActiveModes() {
        return [...this._activeModes, '__BASE__']
    }

    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode);  // prepend to modes
        this.render(); // call refresh
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this.render(); // call refresh
        }
    }
}

let session = new Session();


export default session;
