import AbstractComponent from './AbstractComponent';
import { TimeoutTask } from './../../utils';
import { AbstractControl } from '../control';


interface ManualButton {
    onPress?();
    onLongPress?();
    onDoublePress?();
    onRelease?();
    onDoubleRelease?();
}

abstract class ManualButton extends AbstractComponent {
    LONG_ACTION_DURATION = 350;
    DOUBLE_ACTION_DURATION = 450;

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

    onValue(control: AbstractControl, value: number) {
        if (this.onPress) this._handlePress(value);
        if (this.onLongPress) this._handleLongPress(value);
        if (this.onDoublePress) this._handleDoublePress(value);
        if (this.onRelease) this._handleRelease(value);
        if (this.onDoubleRelease) this._handleDoubleRelease(value);
    }

    protected isPress(value: number) {
        return value > 0;
    }

    protected isRelease(value: number) {
        return value === 0;
    }

    protected isDoublePress(value: number) {
        return this.memory['doublePress'] && this.isPress(value);
    }

    protected isDoubleRelease(value: number) {
        return this.memory['doubleRelease'] && this.isRelease(value);
    }

    private _handlePress(value: number) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this.isPress(value) || this.memory['doublePress']) return;
        // handle single press
        this.onPress();
    }

    private _handleDoublePress(value: number) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(value)) return;

        // if is doublePress
        if (this.isDoublePress(value)) {
            this.onDoublePress();
        } else if (this.DOUBLE_ACTION_DURATION) {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            const task = new TimeoutTask(this, function() {
                delete this.memory['doublePress'];
            }, this.DOUBLE_ACTION_DURATION).start();
            this.memory['doublePress'] = task;
        }
    }

    private _handleLongPress(value: number) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(value)) return;

        // if it's a press schedule the callback
        if (this.isPress(value) && this.LONG_ACTION_DURATION) {
            // schedule callback
            this.memory['longPress'] = new TimeoutTask(this, function() {
                this.onLongPress();
            }, this.LONG_ACTION_DURATION).start();
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) this.cancelTimeoutTask('longPress');
        }
    }

    private _handleRelease(value: number) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(value) || this.memory['doubleRelease']) return;
        // handle single release
        this.onRelease();
    }

    private _handleDoubleRelease(value: number) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(value)) return;

        // if is doubleRelease
        if (this.isDoubleRelease(value)) {
            this.onDoubleRelease();
        } else {
            // setup timeout task to remove self after this.DOUBLE_DURATION
            const task = new TimeoutTask(this, function() {
                delete this.memory['doubleRelease'];
            }, this.DOUBLE_ACTION_DURATION).start();
            this.memory['doubleRelease'] = task;
        }
    }
}


export default ManualButton;