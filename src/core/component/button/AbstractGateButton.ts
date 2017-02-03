import AbstractManualButton from './AbstractManualButton';
import MidiMessage from '../../midi/MidiMessage';
import MidiControl from '../../midi/MidiControl';


abstract class AbstractGateButton extends AbstractManualButton {
    onValue(midiControl: MidiControl, value: number) {
        if (this.state !== undefined) {
            if (this.isPress(value)) {
                this.setState(true);
            } else if (this.isRelease(value)) {
                this.setState(false);
            }
        }
        super.onValue(midiControl, value);
    }
}


export default AbstractGateButton;