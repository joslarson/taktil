import { Session } from '../core/session';
import { Logger } from './Logger';
import { DelayedTask } from './DelayedTask';

// setup global env
export const shim = () => {
    const global = Function('return this')() || (42, eval)('this');
    if (!global.host) return;

    // specific env setup for bitwig environment
    // shim Timeout and Interval methods using DelayedTask class
    global.setTimeout = function setTimeout(
        callback: (...args: any[]) => any,
        delay = 0,
        ...params: any[]
    ) {
        return new DelayedTask(callback, delay).start(...params);
    };

    global.clearTimeout = function clearTimeout(timeout: DelayedTask) {
        if (timeout) timeout.cancel();
    };

    global.setInterval = function setInterval(
        callback: (...args: any[]) => any,
        delay = 0,
        ...params: any[]
    ) {
        return new DelayedTask(callback, delay, true).start(...params);
    };

    global.clearInterval = function clearInterval(interval: DelayedTask) {
        if (interval) interval.cancel();
    };

    // shim console with custom logger
    global.console = new Logger();

    // hookup dummy function to unsupported logger methods

    // Console-polyfill. MIT license.
    // https://github.com/paulmillr/console-polyfill
    // Make it safe to do console.log() always.
    const con = global.console;
    let prop;
    let method;

    const dummy = function() {};
    const properties = ['memory'];
    const methods = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'profile',
        'profiles',
        'profileEnd',
        'show',
        'table',
        'time',
        'timeEnd',
        'timeline',
        'timelineEnd',
        'timeStamp',
        'trace',
        'warn',
    ];
    while ((prop = properties.pop())) if (!con[prop]) con[prop] = {};
    while ((method = methods.pop())) if (typeof con[method] !== 'function') con[method] = dummy;
};
