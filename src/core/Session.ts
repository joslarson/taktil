import config from '../config';
import Bitwig from '../core/bitwig/Bitwig';
import Collection from '../helpers/Collection';
import AbstractDevice from '../core/device/AbstractDevice';
import ViewCollection from '../core/view/ViewCollection';


export default class Session {
    bitwig: Bitwig;
    devices: Collection<AbstractDevice> = new Collection<AbstractDevice>();
    views: ViewCollection = new ViewCollection();
    eventHandlers: { [key: string]: Function[] } = {};

    constructor () {
        global.init = () => {
            // create bitwig instance inside global init
            this.bitwig = new Bitwig();

            // call the session init callbacks
            this.callEventCallbacks('init');
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

        host.defineController(
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
