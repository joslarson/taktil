import 'typewig/env'; // must be first in entry file (sets polyfills + globals)
import { host, document } from 'typewig';

import store from './store';
import TransportController from './controllers/TransportController';
import BaseView from './views/BaseView';


// define controller script
host.defineController(
    'Typewig Examples',  // vendor
    'Simple Transport',  // name
    '1.0.0',  // version
    'f7ccec7e-b1cc-11e6-80f5-76304dec7eb7',  // uuid
    'Joseph Larson',  // author
);

// setup and Discover Midi Controllers
host.defineMidiPorts(1, 1);  // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(['VMPK Output'], ['VMPK Input']);

// init document
document.on('init', () => {
    store.init(); // TODO: clean this up, this shouldn't need to be here

    // add controllers to document before registering views
    document.registerController(TransportController);

    // add views to document
    document.registerView(BaseView);
    // ... register more views here

    // set the active view to trigger initial render of Controls
    document.setActiveView(BaseView);
});
