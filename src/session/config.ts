import {Config} from '../core';


// config defaults
let defaults = {
   DIM_VALUE: 20,
   EXTRA_DIM_VALUE: 10,
   LONG_PRESS_DURATION: 350,
   DOUBLE_PRESS_DURATION: 450,
   TRACK_COUNT: 8,
   SCENE_COUNT: 16,
};

// singleton pattern to always get back the same config instance
let config: Config;
(function () {
    if (!config) config = new Config(defaults);
    return config;
})();


export default config;
