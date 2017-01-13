import { AbstractMidiController, MidiControl } from './core/midi';
import AbstractView from './core/view/AbstractView';
import host from './host';
import MidiOutProxy from './core/midi/MidiOutProxy';


export class Session {
    private _views: typeof AbstractView[] = [];
    private _activeView: typeof AbstractView;
    private _activeModes: string[] = [];
    private _midiControllers: typeof AbstractMidiController[] = [];
    private _registeredMidiControls: MidiControl[] = [];
    private _eventHandlers: { [key: string]: Function[] } = {};

    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        global.init = () => {
            global.__is_init__ = true;
            // call the session init callbacks
            this._callEventCallbacks('init');
            global.__is_init__ = false;
        };

        global.flush = () => {
            this._callEventCallbacks('flush');
        };

        global.exit = () => {
            // blank midiControllers
            for (let MidiController of this._midiControllers) {
                MidiController.getInstance().blankMidiController();
            }
            // call the session exit callbacks
            this._callEventCallbacks('exit');
        };
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

    // MidiControllers
    //////////////////////////////

    registerMidiController(MidiController: typeof AbstractMidiController) {
        if (!global.__is_init__) throw 'Untimely midiController registration: midiControllers can only be registered from within the init callback.';
        MidiController.getInstance(); // getInstance must be called here to instantiate during init

        const midiControllers = this.getControllers();
        if (midiControllers.indexOf(MidiController) === -1) this._midiControllers = [...midiControllers, MidiController];
    }

    getControllers() {
        return this._midiControllers;
    }

    // Controls
    //////////////////////////////

    registerControl(midiControl: MidiControl) {
        if (this._registeredMidiControls.indexOf(midiControl) === -1) this._registeredMidiControls.push(midiControl);
    }

    getRegisteredControls() {
        return [...this._registeredMidiControls];
    }

    renderMidiControls() {
        if (!this.getActiveView()) return;  // can't do anything until we have an active view

        for (let midiControl of this.getRegisteredControls()) {
            this.getActiveView().getInstance().renderMidiControl(midiControl);
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
        if (this.getViews().indexOf(View) === -1) throw `${View.name} mus first be registered before being set as the active view.`
        this._activeView = View;
        this.renderMidiControls();
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
        if (mode === '__BASE__') throw 'Mode name "__BASE__" is reserved.';
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode);  // prepend to modes
        this.renderMidiControls(); // call refresh
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this.renderMidiControls(); // call refresh
        }
    }
}

let session = new Session();


export default session;
