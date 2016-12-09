import config from  '../../../config';
import document from  '../../../document';
import AbstractComponent from '../AbstractComponent';
import { msgType, TimeoutTask } from '../../../utils';
import Control from '../../controller/Control';
import MidiMessage from '../../midi/MidiMessage';



abstract class BaseButton extends AbstractComponent {
    BRIGHTNESS = { ON: 127, OFF: 0 };

    state: any = false;

    renderControl(control: Control) {
        const { ON, OFF } = this.BRIGHTNESS;
        const { midiOutPort: port, status, data1 } = control;
        document.midiOut.sendMidi({ port, status, data1, data2: this.state ? ON : OFF });
    }

    protected isPress(midi: MidiMessage) {
        return midi.data2 > 0;
    }

    protected isRelease(midi: MidiMessage) {
        return midi.data2 === 0;
    }
}


export default BaseButton;