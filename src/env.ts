// setup environment
import 'bitwig-es-polyfill';
loadAPI(1); // load bitwig api v1


// set globals (make sure to add any new globals to the globals.d.ts file)
declare var host; // made available by `loadAPI(1)`

global.toast = function(msg) {
    host.showPopupNotification(msg);
}

global.log = function(...msgs) {
    host.println(msgs.join(' '));
}
