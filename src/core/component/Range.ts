import { Control } from '../control';
import { ControlBaseState } from '../control/Control';
import Component, { ComponentBaseState, ComponentBaseProps } from './Component';

export type RangeBaseProps = ComponentBaseProps;
export interface RangeBaseState extends ComponentBaseState {
    value: number;
}

export default abstract class Range<
    Props extends RangeBaseProps = RangeBaseProps,
    State extends RangeBaseState = RangeBaseState
> extends Component<Props, State> {
    state: State = { value: 0 } as State;
    memory: { [key: string]: any } = {};

    INPUT_DELAY = 350;

    render() {
        if (this.memory.update) clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            super.render();
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    getOutput(control: Control): ControlBaseState {
        return { value: this.state.value };
    }

    onInput(control: Control, { value }: ControlBaseState) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.input;
        }, this.INPUT_DELAY);
    }
}
