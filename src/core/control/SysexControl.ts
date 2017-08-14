import { Control, ControlState } from './Control';
import { SysexMessage } from '../midi';

export type SysexControlState = ControlState;

export class SysexControl<State extends SysexControlState = SysexControlState> extends Control<
    State
> {
    state = { value: 0 } as State;

    getInput(message: SysexMessage): State {
        return { ...this.state as object, value: this.maxValue } as State; // TODO: should be able to remove type casting in future typescript release
    }
}
