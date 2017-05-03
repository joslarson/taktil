import { default as AbstractControl, AbstractControlState } from './AbstractControl';
import { MidiMessage, SysexMessage } from '../midi';


class SysexControl<State extends AbstractControlState = AbstractControlState> extends AbstractControl<State> {
    getInitialState() {
        return { value: 0 } as State;
    }

    getInput(message: SysexMessage): State {
        return { ...this.state as object, value: 1 } as State;  // TODO: should be able to remove type casting in typescript 2.4
    }
}

export default SysexControl;
