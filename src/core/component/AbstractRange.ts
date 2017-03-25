import AbstractComponent from './AbstractComponent';
import { AbstractControl } from '../control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


abstract class AbstractRange<Options extends { [key: string]: any }> extends AbstractComponent<Options> {
    INPUT_DELAY = 100;

    state: { value: number } = { value: 0 };
    memory: { [key: string]: any } = {};

    updateControlState(control: AbstractControl) {
        if (this.memory.update) clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            control.setState({ value: this.state.value });
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    onControlInput(control: AbstractControl, { value }) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.input;
        }, this.INPUT_DELAY);

        this.setState({ value });
    }
}


export default AbstractRange;
