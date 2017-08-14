import { Control } from '../control';
import { ControlState } from '../control/Control';
import { Component, ComponentState, ComponentProps } from './Component';

export type RangeProps = ComponentProps;
export interface RangeState extends ComponentState {
    value: number;
}

export abstract class Range<
    Props extends RangeProps = RangeProps,
    State extends RangeState = RangeState
> extends Component<Props, State> {
    INPUT_DELAY = 350;

    state: State = { value: 0 } as State;
    memory: { [key: string]: any } = {};

    render() {
        if (this.memory.update) clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            super.render();
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    getOutput({ minValue, maxValue }: Control): ControlState {
        return { value: Math.round(this.state.value * (maxValue - minValue) + minValue) };
    }

    onInput(control: Control, { value }: ControlState) {
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.input;
        }, this.INPUT_DELAY);
    }
}
