import taktil from 'taktil';

import { controls } from './controls';
import { views } from './views';

// 1. set bitwig api version
host.loadAPI({{ apiVersion }});

// 2. define controller script
host.defineController(
    '{{ vendor }}', // vendor
    '{{ name }}', // name
    '{{ version }}', // version
    '{{ uuid }}', // uuid
    '{{ author }}' // author
);

// 3. setup and discover midi controllers
host.defineMidiPorts(1, 1); // number of midi inputs, outputs
// host.addDeviceNameBasedDiscoveryPair(['Input Name'], ['Output Name']);

// 4. register controls to the session
taktil.registerControls(controls);

// 5. register views to the session
taktil.registerViews(views);

// 6. on init, activate view to trigger initial render
taktil.on('init', () => taktil.activateView('BASE'));
