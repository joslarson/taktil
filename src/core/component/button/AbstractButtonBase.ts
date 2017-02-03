import session from  '../../../session';
import AbstractComponentBase from '../AbstractComponentBase';
import { TimeoutTask } from '../../../utils';
import MidiControl from '../../midi/MidiControl';
import MidiMessage from '../../midi/MidiMessage';



abstract class AbstractButtonBase extends AbstractComponentBase {
    state: any = false;

    renderMidiControl(midiControl: MidiControl) {
        midiControl.render({ value: this.state ? midiControl.resolution - 1 : 0 });
    }

    protected isPress(value: number) {
        return value > 0;
    }

    protected isRelease(value: number) {
        return value === 0;
    }
}


export default AbstractButtonBase;