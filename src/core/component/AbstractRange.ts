import AbstractComponent from './AbstractComponent';
import { AbstractControl } from '../control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


abstract class AbstractRange extends AbstractComponent {
    state: { value: number } = { value: 0 };

    updateControlState(control: AbstractControl) {
        control.setState({ value: this.state.value });
    }

    onControlInput(control: AbstractControl, value: number) {
        this.setState({ ...this.state, value: value })
    }
}


export default AbstractRange;