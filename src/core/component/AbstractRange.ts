import { default as AbstractComponent, ObjectLiteral } from './AbstractComponent';
import { AbstractControl } from '../control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import session from '../../session';


export interface AbstractRangeState {
    value: number;
};

abstract class AbstractRange<Props extends ObjectLiteral = ObjectLiteral, State extends AbstractRangeState = AbstractRangeState> extends AbstractComponent<Props, State> {
    INPUT_DELAY = 350;

    memory: { [key: string]: any } = {};

    getInitialState() {
        return { value: 0 } as State;
    }

    render() {
        if (this.memory.update) clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            super.render();
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    getControlOutput(control: AbstractControl): object {
        return { value: this.state.value };
    }

    onControlInput(control: AbstractControl, { value }: { value: number }) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.input;
        }, this.INPUT_DELAY);
    }
}


export default AbstractRange;
