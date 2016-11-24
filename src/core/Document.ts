import config from '../config';
import { AbstractController, Control } from '../core/controller';
import View from '../core/view/View';
import * as api from '../typings/api';
import host from '../host';
import MidiOutProxy from './midi/MidiOutProxy';
import logger from '../logger';


export default class Document {
    controllers: { [name: string]: AbstractController } = {};
    controls: Control[] = [];

    private _views: {[name: string]: View} = {};
    private _activeModes: string[] = [];
    private _activeView: View;

    private _eventHandlers: { [key: string]: Function[] } = {};

    midiOut: MidiOutProxy = new MidiOutProxy(this);


    constructor() {
        global.init = () => {
            global.__is_init__ = true;
            // call the document init callbacks
            this._callEventCallbacks('init');
            global.__is_init__ = false;
        };

        global.flush = () => {
            // logger.debug('flush start...');
            this._callEventCallbacks('flush');
            // logger.debug('flush end.');
        };

        global.exit = () => {
            // blank controllers
            for (let controllerName in this.controllers) {
                this.controllers[controllerName].blankController();
            }
            // call the document exit callbacks
            this._callEventCallbacks('exit');
        };
    }

    loadConfig(localConfig: Object) {
        // extend config default with localConfig
        config.extend(localConfig);

        host.defineController(
            config['VENDOR'],  // hardware manufacturer / script creator
            config['NAME'],  // hardware model name / script name
            config['VERSION'],  // version number
            config['UUID'],  // script UUID
            config['AUTHOR']  // author
        );
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

    registerController(name: string, controller: AbstractController) {
        this.controllers[name] = controller;
    }

    // Controls
    //////////////////////////////

    renderControls() {
        if (!this._activeView) return;  // can't do anything until we have an active view
        for (let control of this.controls) {
            this._activeView.renderControl(control);
        }
    }

    // Views
    //////////////////////////////

    getViews(): { [name: string]: View } {
        return Object.assign({}, this._views);
    }

    registerView(name: string, view: View): void {
        this._views[name] = view;
    }

    getActiveView() {
        return this._activeView;
    }

    setActiveView(name: string) {
        this._activeView = this._views[name];
        this.renderControls();
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
