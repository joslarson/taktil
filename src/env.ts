// setup environment
import 'bitwig-es-polyfill';
import logger from './logger';

loadAPI(1); // load bitwig api v1


// set globals (make sure to add any new globals to the globals.d.ts file)
declare var host; // made available by `loadAPI(1)`

global.toast = function (msg) {
    host.showPopupNotification(msg);
}

global.log = function (...msgs) {
    host.println(msgs.join(' '));
}

global.logger = logger;


// object.assign polyfill

if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            // We must check against these specific cases.
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}

// allows us to provide better error messages and to catch errors early to prevent full on crashing
// when code that is only allowed to run inside init is place outside.
global.__is_init__ = false;