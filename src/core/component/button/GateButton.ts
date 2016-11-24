import ManualButton from './ManualButton';
import MidiMessage from '../../midi/MidiMessage';
import Control from '../../controller/Control';


abstract class GateButton extends ManualButton {
    onMidi(control: Control, midi: MidiMessage) {
        if (this.state !== undefined) {
            if (this.isPress(midi)) {
                this.setState(true);
            } else if (this.isRelease(midi)) {
                this.setState(false);
            }
        }
        super.onMidi(control, midi);
    }
}


export default GateButton;