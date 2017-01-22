import AbstractButtonBase from './AbstractButtonBase';
import MidiMessage from '../../midi/MidiMessage';
import MidiControl from '../../midi/MidiControl';
import logger from '../../../logger';


abstract class ToggleButton extends AbstractButtonBase {
    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        if (!this.isPress(midi)) return;

        if (!this.state) {
            this.setState(true);
            this.onToggleOn();
        } else {
            this.setState(false);
            this.onToggleOff();
        }
    }

    onToggleOn() {
        throw 'Not Implemented';
    }

    onToggleOff() {
        throw 'Not Implemented';
    }
}


export default ToggleButton;