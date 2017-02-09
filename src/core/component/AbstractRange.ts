import AbstractComponent from './AbstractComponent';
import { AbstractControl } from '../control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


abstract class Range extends AbstractComponent {
    state: { value: number } = { value: 0 };

    renderControl(control: AbstractControl) {
        control.render({ value: this.state.value });
    }

    onValue(control: AbstractControl, value: number) {
        this.setState({ ...this.state, value: value })
    }
}


export default Range;