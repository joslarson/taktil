import 'typewig/env'; // must be first in entry file (sets polyfills + globals)
import { host, session, logger } from 'typewig';

import store from './store';
import { BaseView } from './views';


// define controller script
host.defineController(
    'Typewig Examples',  // vendor
    'Simple Transport',  // name
    '1.0.0',  // version
    'f7ccec7e-b1cc-11e6-80f5-76304dec7eb7',  // uuid
    'Joseph Larson'  // author
);

// setup and Discover Midi Controllers
host.defineMidiPorts(1, 1);  // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(['VMPK Output'], ['VMPK Input']);

// init session
session.on('init', () => {
    store.init();

    // add views to session
    session.registerView(BaseView);
    // ... register more views here

    // set the active view to trigger initial render of Controls
    session.setActiveView(BaseView);
});
