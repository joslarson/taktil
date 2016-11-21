import config from '../config';
import Collection from '../helpers/Collection';
import { AbstractController, Control } from '../core/controller';
import View from '../core/view/View';
import * as api from '../typings/api';
import host from '../host';


export default class Document {
    controllers: Collection<AbstractController> = new Collection<AbstractController>();
    controls: Control[] = [];
    views: {[name: string]: View} = {};
    activeView: View;
    activeModes: string[];
    private _eventHandlers: { [key: string]: Function[] } = {};

    constructor() {
        global.init = () => {
            // call the document init callbacks
            this._callEventCallbacks('init');
        };

        global.flush = () => {
            this._callEventCallbacks('flush');
        };

        global.exit = () => {
            // blank controllers
            for (let controller of this.controllers.items()) controller.blankController();
            // call the document exit callbacks
            this._callEventCallbacks('exit');
        };
    }

    loadConfig(localConfig: Object) {
        // extend config default with localConfig
        config.extend(localConfig);

        host.defineController(
            config['MAKE'],  // hardware manufacturer / script creator
            config['MODEL'],  // hardware model name / script name
            config['VERSION'],  // version number
            config['GUID'],  // script GUID
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

    registerView(name: string, view: View): void {
        this.views[name] = view;
        // set first view as active
        if (!this.activeView) this.activeView = view;
        // initialize the view (requires that register be called within the global.init function)
        view.init();
    }

    activateView(name: string) {
        this.activeView = this.views[name];
        this.activeView.refresh();
    }

    refreshViews() {

    }

    activateMode(mode: string) {
        const modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.activeModes.unshift(mode);  // prepend to modes
        this.activeView.refresh(); // call refresh on active view
    }

    deactivateMode(mode: string) {
        const modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.activeView.refresh(); // call refresh on active view
    }
}
