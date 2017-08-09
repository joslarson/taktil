import Control, { ControlBaseState } from './Control';
import { SysexMessage } from '../midi';

export type SysexControlBaseState = ControlBaseState;

export default class SysexControl<
    State extends SysexControlBaseState = SysexControlBaseState
> extends Control<State> {
    state = { value: 0 } as State;

    getInput(message: SysexMessage): State {
        return { ...this.state as object, value: 1 } as State; // TODO: should be able to remove type casting in future typescript release
    }
}
