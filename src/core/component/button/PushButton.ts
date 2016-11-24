import ManualButton from './ManualButton';
import MidiMessage from '../../midi/MidiMessage';
import Control from '../../controller/Control';


abstract class PushButton extends ManualButton {
    onMidi(control: Control, midi: MidiMessage) {
        if (this.state !== undefined) {
            if (this.isPress(midi)) {
                this.setState(true);
            }
        }
        super.onMidi(control, midi);
    }
}


export default PushButton;