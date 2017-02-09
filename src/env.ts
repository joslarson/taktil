// setup environment
import 'bitwig-es-polyfill/polyfill/console';
import 'bitwig-es-polyfill/polyfill/timer';
import logger from './logger';

loadAPI(2); // load bitwig api v1


// set globals (make sure to add any new globals to the globals.d.ts file)
declare const host; // made available by `loadAPI(1)`

global.toast = message => {
    host.showPopupNotification(message);
}

global.log = (...messages) => {
    host.println(messages.join(' '));
}

global.logger = logger;

// allows us to provide better error messages and to catch errors early
// when code that is only allowed to run inside init is place outside.
global.__is_init__ = false;