declare var global;
declare var loadAPI;
declare var load;
declare var host: api.Host;

declare function toast(msg: string);
declare function log(...msg);
declare function dump(obj);

interface Midi {
    status: number;
    data1: number;
    data2: number;
}

interface HSB {
    h: number;
    s: number;
    b: number;
}
