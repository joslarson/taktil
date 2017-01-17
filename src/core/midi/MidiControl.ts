import { SimpleMidiMessage, default as MidiMessage } from '../midi/MidiMessage';
import AbstractMidiController from './AbstractMidiController';
import host from '../../host';


// export default class MidiControl implements SimpleMidiMessage {
//     id: string;
//     name: string;
//     midiController: AbstractMidiController;
//     midiInPort: number;
//     midiOutPort: number;
//     status: number;
//     data1: number;
//     data2: number;

//     constructor({ midiController, midiInPort = 0, midiOutPort = 0, status, data1 = 0, data2 = 0 }: { midiController?: AbstractMidiController, midiInPort?: number, midiOutPort?: number, status: number, data1?: number, data2?: number }) {
//         this.id = `${midiInPort}+${midiOutPort}:${status}:${data1}:${data2}`;
//         this.midiController = midiController;
//         this.midiInPort = midiInPort;
//         this.midiOutPort = midiOutPort;
//         this.status = status;
//         this.data1 = data1;
//         this.data2 = data2;
//     }
// }


export default class MidiControl {
    name: string;
    pattern: string[];
    input: number;
    output: number;

    constructor(pattern: string | string[], io?: { input?: number, output?: number}) {
        this.pattern = pattern instanceof Array ? pattern : [pattern];
        this.input = io.input !== undefined ? io.input : 0;
        this.output = io.output !== undefined ? io.output : 0;
        // verify pattern strings are valid
        for (let s of this.pattern) {
            if (!/[A-F0-9\?]{6}/.test(s)) throw new Error(`Invalid midi pattern: "${s}"`);
        }
    }
}
