import AbstractComponent from './AbstractComponent';
import Control from '../controller/Control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import document from '../../document';


abstract class Range extends AbstractComponent {
    state: number = 0;

    renderControl(control: Control) {
        const { midiOutPort: port, status, data1, data2 } = control;
        document.midiOut.sendMidi({  port, status, data1, data2: this.state });
    }

    onMidi(control: Control, midi: MidiMessage) {
        this.state = midi.data2;
    }
}


export default Range;