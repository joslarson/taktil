import { Control } from '../control';
import { ControlState } from '../control/Control';
import { Component, ComponentState, ComponentParams } from './Component';

export type RangeParams = ComponentParams;
export interface RangeState extends ComponentState {
    value: number;
}

export abstract class Range<
    Params extends RangeParams = RangeParams,
    State extends RangeState = RangeState
> extends Component<Params, State> {
    INPUT_DELAY = 350;

    state: State = { value: 0 } as State;
    memory: { [key: string]: any } = {};

    render() {
        // if there is active input, delay the render until after the input timer runs out
        clearInterval(this.memory.update);
        this.memory.update = setInterval(() => {
            super.render();
        }, this.memory.input ? this.INPUT_DELAY : 0);
    }

    getControlOutput(): ControlState {
        return { value: this.state.value };
    }

    onControlInput({ value }: ControlState) {
        // on input, start/restart input countdown timer to create input buffer time
        clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => delete this.memory.input, this.INPUT_DELAY);
    }
}
