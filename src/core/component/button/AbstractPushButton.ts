import AbstractManualButton from './AbstractManualButton';
import MidiMessage from '../../midi/MidiMessage';
import MidiControl from '../../midi/MidiControl';


abstract class PushButton extends AbstractManualButton {
    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        if (this.state !== undefined) {
            if (this.isPress(midi)) {
                this.setState(true);
            }
        }
        super.onMidi(midiControl, midi);
    }
}


export default PushButton;