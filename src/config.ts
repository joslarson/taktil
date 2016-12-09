let defaults = {
};

export class Config {
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

let config = new Config();


export default config;
