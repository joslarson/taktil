import AbstractComponent from './AbstractComponent';
import { MidiMessage } from './../midi';
import { AbstractControl } from '../control';
import logger from './../../logger';


abstract class ToggleButton extends AbstractComponent {
    state = {
        on: false,
        color: undefined
    };

    renderControl(control: AbstractControl) {
        control.render({
            value: this.state.on ? control.resolution - 1 : 0,
            color: this.state.color,
        });
    }

    protected isPress(value: number) {
        return value > 0;
    }

    protected isRelease(value: number) {
        return value === 0;
    }

    onValue(control: AbstractControl, value: number) {
        if (!this.isPress(value)) return;

        if (!this.state.on) {
            this.onToggleOn();
        } else {
            this.onToggleOff();
        }
    }

    onToggleOn() {
        throw 'Not Implemented';
    }

    onToggleOff() {
        throw 'Not Implemented';
    }
}


export default ToggleButton;