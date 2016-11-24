import config from  '../../../config';
import document from  '../../../document';
import AbstractComponent from './AbstractComponent';
import { msgType, TimeoutTask } from '../../../utils';
import Control from '../../controller/Control';
import MidiMessage from '../../midi/MidiMessage';


enum Brightness {
    ON = 127,
    DIM = config['DIM_VALUE'],
    OFF = 0
}


abstract class BaseButton extends AbstractComponent {
    state: any = false;

    renderControl(control: Control) {
        const { ON, OFF } = Brightness;
        document.midiOut.sendMidi({
            port: control.midiOutPort,
            status: control.status,
            data1: control.data1,
            data2: this.state ? ON : OFF
        });
    }

    protected isPress(midi: MidiMessage) {
        return midi.data2 > 0;
    }

    protected isRelease(midi: MidiMessage) {
        return midi.data2 === 0;
    }
}


export default BaseButton;