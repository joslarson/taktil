import { default as AbstractControl, AbstractControlBaseState } from './AbstractControl';
import { SysexMessage } from '../midi';


export type SysexControlBaseState = AbstractControlBaseState;

class SysexControl<
    State extends SysexControlBaseState = SysexControlBaseState
> extends AbstractControl<State> {
    state = { value: 0 } as State;

    getInput(message: SysexMessage): State {
        return { ...this.state as object, value: 1 } as State;  // TODO: should be able to remove type casting in typescript 2.4
    }
}

export default SysexControl;
