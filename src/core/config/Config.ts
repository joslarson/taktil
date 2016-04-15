export default class Config {
    constructor(defaults: {}) {
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
