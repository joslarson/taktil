import AbstractComponentBase from './AbstractComponentBase';
import MidiControl from '../midi/MidiControl';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


abstract class Range extends AbstractComponentBase {
    state: number = 0;

    renderMidiControl(midiControl: MidiControl) {
        const { midiOutPort: port, status, data1, data2 } = midiControl;
        session.midiOut.sendMidi({  port, status, data1, data2: this.state });
    }

    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        this.state = midi.data2;
    }
}


export default Range;