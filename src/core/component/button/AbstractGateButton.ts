import AbstractManualButton from './AbstractManualButton';
import MidiMessage from '../../midi/MidiMessage';
import MidiControl from '../../midi/MidiControl';


abstract class AbstractGateButton extends AbstractManualButton {
    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        if (this.state !== undefined) {
            if (this.isPress(midi)) {
                this.setState(true);
            } else if (this.isRelease(midi)) {
                this.setState(false);
            }
        }
        super.onMidi(midiControl, midi);
    }
}


export default AbstractGateButton;