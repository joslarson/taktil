declare var global;
declare var loadAPI;
declare var load;
declare var host: api.Host;

declare function toast(msg: string);
declare function log(...msg);

interface Midi {
    s: number;
    d1: number;
    d2: number;
}

interface HardwareCtrl {
    s: number;
    d1: number;
    d2: number;
}

interface HSB {
    h: number;
    s: number;
    b: number;
}

interface HardwareCtrls {
    [key: string]: HardwareCtrl
}

interface ReverseHardwareCtrlsMap {
    [key: number]: {
        [key: number]: string;
    }
}
