import { SimpleMidiMessage } from '../midi/MidiMessage';
import * as api from '../../typings/api';


interface Template {
    midiInIndex?: number;
    midiOutIndex?: number;
    noteInput?: string[];
    shouldConsumeEvents?: boolean;
    controls?;
}

export default Template;
