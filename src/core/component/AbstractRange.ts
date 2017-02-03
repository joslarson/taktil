import AbstractComponentBase from './AbstractComponentBase';
import MidiControl from '../midi/MidiControl';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


abstract class Range extends AbstractComponentBase {
    state: number = 0;

    renderMidiControl(midiControl: MidiControl) {
        midiControl.render({ value: this.state });
    }

    onValue(midiControl: MidiControl, value: number) {
        this.state = value;
    }
}


export default Range;