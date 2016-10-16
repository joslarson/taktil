import config from '../config';
import Collection from '../helpers/Collection';
import AbstractDevice from '../core/device/AbstractDevice';
import ViewCollection from '../core/view/ViewCollection';
import * as api from '../typings/api';
import host from '../host';


export default class Session {
    devices: Collection<AbstractDevice> = new Collection<AbstractDevice>();
    views: ViewCollection = new ViewCollection();
    store: Object;
    private _eventHandlers: { [key: string]: Function[] } = {};

    constructor() {
        global.init = () => {
            // call the session init callbacks
            this._callEventCallbacks('init');
        };

        global.flush = () => {
            this._callEventCallbacks('flush');
        };

        global.exit = () => {
            // blank controllers
            for (let device of this.devices.items()) device.blankController();
            // call the session exit callbacks
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
}
