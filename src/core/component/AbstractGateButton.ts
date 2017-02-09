import AbstractManualButton from './AbstractManualButton';
import { MidiMessage } from '../midi';
import { AbstractControl } from '../control';


abstract class AbstractGateButton extends AbstractManualButton {
    onValue(control: AbstractControl, value: number) {
        if (this.isPress(value)) {
            this.setState({ ...this.state, on: true });
        } else if (this.isRelease(value)) {
            this.setState({ ...this.state, on: false });
        }
        super.onValue(control, value);
    }
}


export default AbstractGateButton;