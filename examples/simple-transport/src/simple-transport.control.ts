import 'taktil/env'; // must be first in entry file (sets polyfills + globals)
import { host, session, logger } from 'taktil';

import apiStore from './apistore';
import { BaseView } from './views';
import midiControls from './midicontrols';


// define controller script
host.defineController(
    'taktil Examples',  // vendor
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
    // 1. init api sourced data
    apiStore.init();

    // 2. set master midiControls list on session
    session.setMidiControls(midiControls);

    // 3. add views to session
    session.registerView(BaseView);
    // ... register more views here

    // 4. set the active view to trigger initial render of midi controls
    session.setActiveView(BaseView);
});
