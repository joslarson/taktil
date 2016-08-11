import config from '../config';
import Collection from '../helpers/Collection';
import AbstractDevice from '../core/device/AbstractDevice';
import ViewCollection from '../core/view/ViewCollection';
import * as api from '../typings/api';
import Host from './bitwig/Host';


export default class Session {
    host: api.Host = new Host(global.host) as any as api.Host;
    devices: Collection<AbstractDevice> = new Collection<AbstractDevice>();
    views: ViewCollection = new ViewCollection();
    eventHandlers: { [key: string]: Function[] } = {};

    constructor () {
        global.init = () => {
            // call the session init callbacks
            this.callEventCallbacks('init');
        };

        global.flush = () => {
            this.callEventCallbacks('flush');
        };

        global.exit = () => {
            // blank controllers
            for (let device of this.devices.items()) device.blankController();
            // call the session exit callbacks
            this.callEventCallbacks('exit');
        };
    }

    loadConfig (localConfig: Object) {
        // extend config default with localConfig
        config.extend(localConfig);

        this.host.defineController(
            config['MAKE'],  // hardware manufacturer / script creator
            config['MODEL'],  // hardware model name / script name
            config['VERSION'],  // version number
            config['GUID'],  // script GUID
            config['AUTHOR']  // author
        );
    }

    on (eventName: string, callback: Function) {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];

        this.eventHandlers[eventName].push(callback);
        return this;
    }

    callEventCallbacks (eventName: string, ...args) {
        if (this.eventHandlers[eventName] === undefined) return;

        let callbackList = this.eventHandlers[eventName];
        for (let callback of callbackList) {
            callback.apply(this, args);
        }
    }
}
