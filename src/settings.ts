let defaults = {
   DIM_VALUE: 20,
   EXTRA_DIM_VALUE: 10,
   LONG_PRESS_DURATION: 350,
   DOUBLE_PRESS_DURATION: 450,
   TRACK_COUNT: 8,
   SCENE_COUNT: 16,
};

let settings;

(function () {
    if (!settings) settings = defaults;
    return settings;
})();

export default settings;
