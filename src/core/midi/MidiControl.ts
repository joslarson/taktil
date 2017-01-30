import { SimpleMidiMessage, default as MidiMessage } from '../midi/MidiMessage';
import host from '../../host';
import session from '../../session';


// export default class MidiControl {
//     name: string;
//     input: number;
//     output: number;
//     status: number;
//     data1: number;
//     data2: number;
//     msb: string;
//     lsb: string;
//     patterns: string[];
//     onReset: number | ((midiControl: MidiControl) => void);

//     constructor(filter: string | {
//         input?: number, output?: number,
//         patterns?: string[],
//         status?: number, data1?: number, data2?: number,
//         msb?: string, lsb?: string
//     }, onReset: number | ((midiControl: MidiControl) => void) = 0) {
//         // set defaults
//         let options = {
//             input: 0, output: 0,
//             patterns: [],
//             status: undefined, data1: undefined, data2: undefined,
//             msb: undefined, lsb: undefined,
//         };

//         // override defaults with provided constructor data
//         if (typeof filter === 'string') {
//             options = { ...options, patterns: [filter] };
//         } else {
//             options = {
//                 ...options, ...filter,
//                 // add msb and lb patterns to pattern list
//                 patterns: [
//                     ...(filter.patterns || []),
//                     ...(options.msb ? [options.msb] : []),
//                     ...(options.lsb ? [options.lsb] : []),
//                 ],
//             };
//         }

//         // verify pattern strings are valid
//         for (let pattern of options.patterns) {
//             if (this.patternIsValid(pattern)) throw new Error(`Invalid midi pattern: "${pattern}"`);
//         }

//         // if there is only one pattern set status, data1, and/or data2 that can be pulled from it
//         if (options.patterns.length === 1) {
//             options = {
//                 ...options,
//                 ...this._getMidiFromPattern(options.patterns[0])
//             };
//         }

//         // when no pattern is set, create a pattern from the provided data
//         if (options.patterns.length === 0 && (options.status || options.data1 || options.data2)) {
//             const { status, data1, data2 } = options;
//             options = {
//                 ...options,
//                 patterns: [this._getPatternFromMidi({ status, data1, data2 })],
//             };
//         }

//         // set object properties
//         this.input = options.input;
//         this.output = options.output;
//         this.status = options.status;
//         this.data1 = options.data1;
//         this.data2 = options.data2;
//         this.msb = options.msb;
//         this.lsb = options.lsb;
//         this.patterns = options.patterns;
//         this.onReset = onReset;
//     }

//     private _getMidiFromPattern(pattern: string) {
//         const status = pattern.slice(0, 2);
//         const data1 = pattern.slice(2, 4);
//         const data2 = pattern.slice(4, 6);

//         return {
//             status: status.indexOf('?') === -1 ? parseInt(status, 16): undefined,
//             data1: data1.indexOf('?') === -1 ? parseInt(data1, 16): undefined,
//             data2: data2.indexOf('?') === -1 ? parseInt(data2, 16): undefined,
//         }
//     }

//     private _getPatternFromMidi({ status = undefined, data1 = undefined, data2 = undefined }: SimpleMidiMessage) {
//         let result = '';
//         for (let midiByte of [status, data1, data2]) {
//             if (midiByte === undefined) {
//                 result = `${result}??`
//             } else {
//                 let hexByteString = midiByte.toString(16).toUpperCase();
//                 if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
//                 result = `${result}${hexByteString}`;
//             }
//         }
//         return result;
//     }

//     reset() {
//         if (typeof this.onReset === 'number') {
//             if (this.status && this.data1) this.render({ data2: this.onReset });
//         } else {
//             this.onReset(this);
//         }
//     }

//     render({ status = this.status, data1 = this.data1, data2, urgent = false }: { status?: number, data1?: number, data2: number, urgent?: boolean }) {
//         session.midiOut.sendMidi({ name: this.name, status, data1, data2, urgent, cacheKey: this.getCacheKey() });
//     }

//     getCacheKey() {
//         const {output: port, status, data1, data2 } = this;
//         return status && data1 ? `${port}:${status}:${data1}` : undefined;
//     }

//     patternIsValid(pattern: string) {
//         return !/[a-fA-F0-9\?]{6}/.test(pattern);
//     }
// }


function getPatternFromMidi({ status = undefined, data1 = undefined, data2 = undefined }: SimpleMidiMessage) {
    let result = '';
    for (let midiByte of [status, data1, data2]) {
        if (midiByte === undefined) {
            result = `${result}??`
        } else {
            let hexByteString = midiByte.toString(16).toUpperCase();
            if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
            result = `${result}${hexByteString}`;
        }
    }
    return result;
}

function getMidiFromPattern(pattern: string) {
    const status = pattern.slice(0, 2);
    const data1 = pattern.slice(2, 4);
    const data2 = pattern.slice(4, 6);

    return {
        status: status.indexOf('?') === -1 ? parseInt(status, 16): undefined,
        data1: data1.indexOf('?') === -1 ? parseInt(data1, 16): undefined,
        data2: data2.indexOf('?') === -1 ? parseInt(data2, 16): undefined,
    }
}

function patternIsValid(pattern: string) {
    return !/[a-fA-F0-9\?]{6}/.test(pattern);
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}

export default class MidiControl {
    name: string;
    inPort: number;
    outPort: number;
    patterns: string[];

    status: number;
    data1: number;
    data2: number;

    defaultColor: Color;

    cacheOnMidiIn: boolean;
    enableMidiOut: boolean;
    cache: string[] = [];



    constructor({
        port, inPort = 0, outPort = 0,
        patterns,
        status, data1, data2,
        defaultColor,
        cacheOnMidiIn = true, enableMidiOut = true,
    }: {
        port?: number, inPort?: number, outPort?: number,
        patterns: string[],
        status?: number, data1?: number, data2?: number,
        defaultColor?: Color,
        cacheOnMidiIn?: boolean, enableMidiOut?: boolean,
    }) {
        // verify pattern strings are valid
        for (let pattern of patterns) {
            if (patternIsValid(pattern)) throw new Error(`Invalid midi pattern: "${pattern}"`);
        }

        // if there is only one pattern set status, data1, and/or data2 that can be pulled from it
        if (patterns.length === 1) {
            // { status, data1, data2 } = getMidiFromPattern(patterns[0]);
            const midiMessage = getMidiFromPattern(patterns[0]);
            status = midiMessage.status;
            data1 = midiMessage.data1;
            data2 = midiMessage.data2;
        }

        // when no pattern is set, create a pattern from the provided data
        if (patterns.length === 0 && (status || data1 || data2)) {
            patterns = [getPatternFromMidi({ status, data1, data2 })];
        }

        // set object properties
        this.inPort = port !== undefined ?  port : inPort;
        this.outPort = port !== undefined ?  port : outPort;
        this.patterns = patterns;

        this.status = status;
        this.data1 = data1;
        this.data2 = data2;

        this.defaultColor = defaultColor;

        this.cacheOnMidiIn = cacheOnMidiIn;
        this.enableMidiOut = enableMidiOut;
    }

    renderDisabled() {
        if (this.status && this.data1) this.render({ value: 0 });
    }

    render({ value, color, urgent = false }: { value: boolean | number, color?: Color, urgent?: boolean }) {
        if (this.enableMidiOut) {
            // convert value to data2
            let data2: number;
            if (typeof value === 'boolean') {
                data2 = value ? 127 : 0;
            } else if (isInt(value) && value <= 127 && value >= 0) {
                data2 = value;
            } else if (isFloat(value) && value <= 1 && value >= 0) {
                data2 = parseInt(String(value * 127), 10);
            } else {
                throw new Error(`Invalid MidiControl value "${value}"`);
            }
            session.midiOut.sendMidi({
                name: this.name, status: this.status, data1: this.data1, data2, urgent,
            });
        }
    }
}