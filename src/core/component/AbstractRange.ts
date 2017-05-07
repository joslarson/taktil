import AbstractComponent from './AbstractComponent';
import { AbstractControl } from '../control';
import { AbstractControlBaseState } from '../control/AbstractControl';
import { AbstractComponentBaseState, AbstractComponentBaseProps } from './AbstractComponent';


export type AbstractRangeBaseProps = AbstractComponentBaseProps;
export interface AbstractRangeBaseState extends AbstractComponentBaseState {
    value: number;
};

export default abstract class AbstractRange<
    Props extends AbstractRangeBaseProps = AbstractRangeBaseProps,
    State extends AbstractRangeBaseState = AbstractRangeBaseState
> extends AbstractComponent<Props, State> {
    state: State = { value: 0 } as State;
    memory: { [key: string]: any } = {};

    INPUT_DELAY = 350;

    render() {
        if (this.memory.update) clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            super.render();
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    getOutput(control: AbstractControl): AbstractControlBaseState {
        return { value: this.state.value };
    }

    onInput(control: AbstractControl, { value }: AbstractControlBaseState) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.input;
        }, this.INPUT_DELAY);
    }
}
