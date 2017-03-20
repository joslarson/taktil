import 'taktil/env'; // must be first in entry file (sets polyfills + globals)
import { session } from 'taktil';

import store from './store';
import controls from './controls';
import { BaseView, SceneView, PatternView, PadMidiView, NavigateView } from './views';


// define controller script
host.defineController(
    'Taktil Examples',  // vendor
    'Test Project',  // name
    '1.0.0',  // version
    '2e6cf580-327b-409b-b87a-19f18643c43b',  // uuid
    'Joseph Larson'  // author
);

// setup and Discover Midi Controllers
host.defineMidiPorts(1, 1);  // number of midi inputs, outputs
host.addDeviceNameBasedDiscoveryPair(['Maschine Studio Virtual Input'], ['Maschine Studio Virtual Output']);

// init session
session.on('init', () => {
    // 1. init api sourced data
    store.init();

    // 2. set master controls map
    session.controls = controls;

    // 3. add views to session
    session.views = [
        BaseView,
        SceneView,
        PatternView,
        PadMidiView,
        NavigateView,
    ];

    // 4. set initial active view to trigger initial render of Controls
    session.activeView = PatternView;
});
