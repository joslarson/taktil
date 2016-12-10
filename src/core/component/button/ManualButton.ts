import document from  '../../../document';
import BaseButton from './BaseButton';
import { TimeoutTask } from '../../../utils';
import Control from '../../controller/Control';
import MidiMessage from '../../midi/MidiMessage';


abstract class ManualButton extends BaseButton {
    DURATION = { LONG: 350, DOUBLE: 450 };

    onMidi(control: Control, midi: MidiMessage) {
        this._handlePress(midi);
        this._handleLongPress(midi);
        this._handleDoublePress(midi);
        this._handleRelease(midi);
        this._handleDoubleRelease(midi);
    }

    onPress() {
        // optionally implemented in child class as override
    }

    onLongPress() {
        // optionally implemented in child class as override
    }

    onDoublePress() {
        // optionally implemented in child class as override
    }

    onRelease() {
        // optionally implemented in child class as override
    }

    onDoubleRelease() {
        // optionally implemented in child class as override
    }

    protected isDoublePress(midi: MidiMessage) {
        return this.memory['doublePress'] && this.isPress(midi);
    }

    protected isDoubleRelease(midi: MidiMessage) {
        return this.memory['doubleRelease'] && this.isRelease(midi);
    }

    private _handlePress(midi: MidiMessage) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this.isPress(midi) || this.memory['doublePress']) return;
        // handle single press
        this.onPress();
    }

    private _handleDoublePress(midi: MidiMessage) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(midi)) return;

        // if is doublePress
        if (this.isDoublePress(midi)) {
            this.onDoublePress();
        } else {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            const task = new TimeoutTask(this, function() {
                delete this.memory['doublePress'];
            }, this.DURATION.DOUBLE).start();
            this.memory['doublePress'] = task;
        }
    }

    private _handleLongPress(midi: MidiMessage) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(midi)) return;

        // if it's a press schedule the callback
        if (this.isPress(midi)) {
            // schedule callback
            this.memory['longPress'] = new TimeoutTask(this, function() {
                this.onLongPress();
            }, this.DURATION.LONG).start();
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) this.cancelTimeoutTask('longPress');
        }
    }

    private _handleRelease(midi: MidiMessage) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(midi) || this.memory['doubleRelease']) return;
        // handle single release
        this.onRelease();
    }

    private _handleDoubleRelease(midi: MidiMessage) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(midi)) return;

        // if is doubleRelease
        if (this.isDoubleRelease(midi)) {
            this.onDoubleRelease();
        } else {
            // setup timeout task to remove self after this.DURATION.DOUBLE
            const task = new TimeoutTask(this, function() {
                delete this.memory['doubleRelease'];
            }, this.DURATION.DOUBLE).start();
            this.memory['doubleRelease'] = task;
        }
    }
}


export default ManualButton;