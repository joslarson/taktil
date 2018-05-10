import { ControlState } from '../control';
import { Component, ComponentParams, ComponentState } from './Component';

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
        // if there is active input, don't call render
        if (!this.memory.input) super.render();
    }

    getControlOutput(): Partial<ControlState> {
        return { value: this.state.value };
    }

    onControlInput(input: ControlState) {
        // on input, start/restart input countdown timer to create input buffer time
        clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => delete this.memory.input, this.INPUT_DELAY);
    }
}
