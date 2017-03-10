import AbstractComponent from './AbstractComponent';
import { AbstractControl, SimpleControl } from '../control';


interface AbstractButton {
    onPress?();
    onLongPress?();
    onDoublePress?();
    onRelease?();
    onDoubleRelease?();
}

abstract class AbstractButton extends AbstractComponent {
    LONG_PRESS_DELAY = 350;
    DOUBLE_PRESS_DELAY = 350;

    state: { on?: boolean, color?: { r: number, g: number, b: number } } = { on: false };
    memory: { [key: string]: any } = {};

    updateControlState(control: SimpleControl, overrides: Object = {}) {
        const { on, color } = this.state;
        control.setState({
            value: on ? control.resolution - 1 : 0,
            ...(color === undefined ? {} : { color }),
            ...overrides
        });
    }

    onControlInput(control: SimpleControl, controlInput) {
        if (this.onPress) this._handlePress(controlInput.value);
        if (this.onLongPress) this._handleLongPress(controlInput.value);
        if (this.onDoublePress) this._handleDoublePress(controlInput.value);
        if (this.onRelease) this._handleRelease(controlInput.value);
        if (this.onDoubleRelease) this._handleDoubleRelease(controlInput.value);
    }

    protected _isPress(value: number) {
        return value > 0;
    }

    protected _isRelease(value: number) {
        return value === 0;
    }

    protected _isDoublePress(value: number) {
        return this.memory['doublePress'] && this._isPress(value);
    }

    protected _isDoubleRelease(value: number) {
        return this.memory['doubleRelease'] && this._isRelease(value);
    }

    private _handlePress(value: number) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this._isPress(value) || this.memory['doublePress']) return;
        // handle single press
        this.onPress();
    }

    private _handleDoublePress(value: number) {
        // if it's not a press or not implemented, ignore it
        if (!this._isPress(value)) return;

        // if is doublePress
        if (this._isDoublePress(value)) {
            this.onDoublePress();
        } else {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            this.memory['doublePress'] = setTimeout(() => {
                delete this.memory['doublePress'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }

    private _handleLongPress(value: number) {
        // if it's a doublePress or is not implemented, ignore it
        if (this._isDoublePress(value)) return;

        // if it's a press schedule the callback
        if (this._isPress(value)) {
            // schedule callback
            this.memory['longPress'] = setTimeout(() => {
                this.onLongPress();
            }, this.LONG_PRESS_DELAY);
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) {
                clearTimeout(this.memory['longPress']);
                delete this.memory['longPress'];
            };
        }
    }

    private _handleRelease(value: number) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this._isRelease(value) || this.memory['doubleRelease']) return;
        // handle single release
        this.onRelease();
    }

    private _handleDoubleRelease(value: number) {
        // if it's not a release or not implemented, ignore it
        if (!this._isRelease(value)) return;

        // if is doubleRelease
        if (this._isDoubleRelease(value)) {
            this.onDoubleRelease();
        } else {
            // setup timeout task to remove self after this.DOUBLE_PRESS_DELAY
            this.memory['doubleRelease'] = setTimeout(() => {
                delete this.memory['doubleRelease'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }
}


export default AbstractButton;