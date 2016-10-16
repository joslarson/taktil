loadAPI(1);  // load bitwig api v1
// import 'bitwig-es-polyfill';
import { guid } from './utils';
import host from './host';


// make global keyword globally available as a pointer to the global scope.
let global = Function('return this')() || (42, eval)('this');
global.global = global.window = global;

// set globals (make sure to add any new globals to the globals.d.ts file)

global.toast = function(msg) {
    host.showPopupNotification(msg);
}

global.log = function(...msgs) {
    host.println(msgs.join(' '));
}

global.guid = guid;
