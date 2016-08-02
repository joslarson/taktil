loadAPI(1);  // load bitwig api v1
// import 'bitwig-es-polyfill';
import {guid} from './utils';
import session from './session';


// set globals (make sure to add any new globals to the globals.d.ts file)
(function() {
    // make global keyword globally available as a pointer to the global scope.
    let globalTemp = Function('return this')() || (42, eval)('this');
    globalTemp.global = globalTemp;

    global.toast = function (msg) {
        session.host.showPopupNotification(msg);
    }

    global.log = function (...msgs) {
        session.host.println(msgs.join(' '));
    }

    global.guid = guid;
})();
