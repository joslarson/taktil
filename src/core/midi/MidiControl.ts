import { SimpleMidiMessage, default as MidiMessage } from '../midi/MidiMessage';
import host from '../../host';


export default class MidiControl {
    name: string;
    input: number;
    output: number;
    status: number;
    data1: number;
    data2: number;
    msb: number;
    lsb: number;
    patterns: string[];

    constructor(filter: string | {
        input?: number, output?: number,
        patterns?: string[],
        status?: number, data1?: number, data2?: number,
        msb?: number, lsb?: number
    }) {
        let options = { input: 0, output: 0, patterns: [] };
        if (typeof filter === 'string') {
            options = { ...options, patterns: [filter], ...this.getMidiFromPattern(filter) };
        } else {
            options = {
                ...options, ...filter,
                ...(filter.patterns.length === 1 ?
                    this.getMidiFromPattern(filter.patterns[0]) : {}),
            };
        }

        this.patterns = patterns.map(pattern => pattern.toUpperCase());
        this.input = io.input !== undefined ? io.input : 0;
        this.output = io.output !== undefined ? io.output : 0;
        // verify pattern strings are valid
        for (let pattern of this.patterns) {
            if (!/[a-fA-F0-9\?]{6}/.test(pattern)) throw new Error(`Invalid midi pattern: "${pattern}"`);
        }
    }

    getMidiFromPattern(pattern: string) {
        const status = pattern.slice(0, 2);
        const data1 = pattern.slice(2, 4);
        const data2 = pattern.slice(4, 6);

        return {
            status: status.indexOf('?') === -1 ? parseInt(status, 16): undefined,
            data1: data1.indexOf('?') === -1 ? parseInt(data1, 16): undefined,
            data2: data2.indexOf('?') === -1 ? parseInt(data2, 16): undefined,
        }
    }
}
