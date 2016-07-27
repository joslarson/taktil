let defaults = {
   'DIM_VALUE': 20,
   'EXTRA_DIM_VALUE': 10,
   'LONG_PRESS_DURATION': 350,
   'DOUBLE_PRESS_DURATION': 450,
   'TRACK_COUNT': 8,
   'SCENE_COUNT': 16,
};

export default class Config {
    constructor() {
        this.extend(defaults);
    }

    extend(obj: {}): Config {
        if (obj == undefined || obj == null) return this;
        for (var nextKey in obj) {
            if (obj.hasOwnProperty(nextKey)) this[nextKey] = obj[nextKey];
        }
        return this;
    }
}
