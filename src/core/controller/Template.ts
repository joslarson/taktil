import { SimpleMidiMessage } from '../midi/MidiMessage';
import * as api from '../../typings/api';


interface Template {
    midiInIndex?: number;
    midiOutIndex?: number;
    noteInput?: string[];
    shouldConsumeEvents?: boolean;
    controls?: { [CONTROL_NAME: string]: { status: number, data1: number, data2: number } };
}


export default Template;
