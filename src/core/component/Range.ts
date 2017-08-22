import { Control } from '../control';
import { ControlState } from '../control/Control';
import { Component, ComponentState, ComponentOptions } from './Component';

export type RangeOptions = ComponentOptions;
export interface RangeState extends ComponentState {
    value: number;
}

export abstract class Range<
    Options extends RangeOptions = RangeOptions,
    State extends RangeState = RangeState
> extends Component<Options, State> {
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

    getOutput(): ControlState {
        return { value: this.state.value };
    }

    onInput({ value }: ControlState) {
        // on input, start/restart input countdown timer to create input buffer time
        clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => delete this.memory.input, this.INPUT_DELAY);
    }
}
