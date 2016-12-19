import { AbstractController, Control } from './core/controller';
import AbstractView from './core/view/AbstractView';
import host from './host';
import MidiOutProxy from './core/midi/MidiOutProxy';


export class Session {
    private _views: typeof AbstractView[] = [];
    private _activeView: typeof AbstractView;
    private _activeModes: string[] = [];
    private _controllers: typeof AbstractController[] = [];
    private _registeredControls: Control[] = [];
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
            // blank controllers
            for (let Controller of this._controllers) {
                Controller.getInstance().blankController();
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

    // Controllers
    //////////////////////////////

    registerController(Controller: typeof AbstractController) {
        if (!global.__is_init__) throw 'Untimely controller registration: controllers can only be registered from within the init callback.';
        Controller.getInstance(); // getInstance must be called here to instantiate during init

        const controllers = this.getControllers();
        if (controllers.indexOf(Controller) === -1) this._controllers = [...controllers, Controller];
    }

    getControllers() {
        return this._controllers;
    }

    // Controls
    //////////////////////////////

    registerControl(control: Control) {
        if (this._registeredControls.indexOf(control) === -1) this._registeredControls.push(control);
    }

    getRegisteredControls() {
        return [...this._registeredControls];
    }

    renderControls() {
        if (!this.getActiveView()) return;  // can't do anything until we have an active view

        for (let control of this.getRegisteredControls()) {
            this.getActiveView().getInstance().renderControl(control);
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
        this.renderControls();
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
        this.renderControls(); // call refresh
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this.renderControls(); // call refresh
        }
    }
}

let session = new Session();


export default session;