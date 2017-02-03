import AbstractButtonBase from './AbstractButtonBase';
import MidiMessage from '../../midi/MidiMessage';
import MidiControl from '../../midi/MidiControl';
import logger from '../../../logger';


abstract class ToggleButton extends AbstractButtonBase {
    onValue(midiControl: MidiControl, value: number) {
        if (!this.isPress(value)) return;

        if (!this.state) {
            this.setState(midiControl.resolution - 1);
            this.onToggleOn();
        } else {
            this.setState(0);
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