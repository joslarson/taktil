import BaseButton from './BaseButton';
import MidiMessage from '../../midi/MidiMessage';
import Control from '../../controller/Control';
import logger from '../../../logger';


abstract class ToggleButton extends BaseButton {
    onMidi(control: Control, midi: MidiMessage) {
        if (!this.isPress(midi)) return;

        if (!this.state) {
            this.setState(true);
            this.onToggleOn();
            logger.debug(`Event: ${this.name} toggleOn`);
        } else {
            this.setState(false);
            this.onToggleOff();
            logger.debug(`Event: ${this.name} toggleOff`);
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