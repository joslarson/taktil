// setup environment
import Logger from './core/Logger';


loadAPI(2); // load bitwig api v2

// set globals (make sure to add any new globals to the globals.d.ts file)
global.toast = (message: string) => {
    host.showPopupNotification(message);
}

// connect logger as global console
global.console = new Logger();

// hookup dummy function to unsupported logger methods

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
if (!global.console) global.console = {};
var con = global.console;
var prop, method;
var dummy = function() {};
var properties = ['memory'];
var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group',
    'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profiles',
    'profileEnd', 'show', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp',
    'trace', 'warn',
];
while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;


// allows us to provide better error messages and to catch errors early
// when code that is only allowed to run inside init is place outside.
global.__is_init__ = false;


class DelayedTask {
    callback: Function;
    delay: number;
    repeat: boolean;
    cancelled = false;

    constructor (callback: (...args: any[]) => any, delay = 0, repeat = false) {
        this.callback = callback;
        this.delay = delay;
        this.repeat = repeat;
    }

    start(...args: any[]) {
        host.scheduleTask(() => {
            if (!this.cancelled) {
                this.callback.call(args);
                if (this.repeat) this.start(...args);
            }
        }, this.delay);
        return this;
    }

    cancel() {
        this.cancelled = true;
        return this;
    }
}

global.setTimeout = function setTimeout(callback: (...args: any[]) => any, delay = 0, ...params: any[]) {
    return new DelayedTask(callback, delay).start(...params);
}

global.clearTimeout = function clearTimeout(timeout: DelayedTask) {
    timeout.cancel();
}

global.setInterval = function setInterval(callback: (...args: any[]) => any, delay = 0, ...params: any[]) {
    return new DelayedTask(callback, delay, true).start(...params);
}

global.clearInterval = function clearInterval(interval: DelayedTask) {
    interval.cancel();
}