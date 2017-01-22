import 'typewig/env'; // must be first in entry file (sets polyfills + globals)
import { host, session, logger } from 'typewig';

import apiStore from './apistore';
import midiControls from './midicontrols';
import { BaseView, OtherView, OtherView2, OtherView3 } from './views';


// define controller script
host.defineController(
    'Typewig Examples',  // vendor
    'Test Project',  // name
    '1.0.0',  // version
    '2e6cf580-327b-409b-b87a-19f18643c43b',  // uuid
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
    session.registerView(OtherView);
    session.registerView(OtherView2);
    session.registerView(OtherView3);
    // ... register more views here

    // 4. set the active view to trigger initial render of MidiControls
    session.setActiveView(BaseView);
});
