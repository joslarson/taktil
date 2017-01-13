import session from  '../../../session';
import AbstractComponentBase from '../AbstractComponentBase';
import { TimeoutTask } from '../../../utils';
import MidiControl from '../../midi/MidiControl';
import MidiMessage from '../../midi/MidiMessage';



abstract class AbstractButtonBase extends AbstractComponentBase {
    state: any = false;

    renderMidiControl(midiControl: MidiControl) {
        const { midiOutPort: port, status, data1 } = midiControl;
        session.midiOut.sendMidi({ port, status, data1, data2: this.state ? 127 : 0 });
    }

    protected isPress(midi: MidiMessage) {
        return midi.data2 > 0;
    }

    protected isRelease(midi: MidiMessage) {
        return midi.data2 === 0;
    }
}


export default AbstractButtonBase;