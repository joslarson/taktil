import AbstractButtonBase from './AbstractButtonBase';
import { TimeoutTask } from '../../../utils';
import MidiControl from '../../midi/MidiControl';
import MidiMessage from '../../midi/MidiMessage';


interface ManualButton {
    onPress?();
    onLongPress?();
    onDoublePress?();
    onRelease?();
    onDoubleRelease?();
}

abstract class ManualButton extends AbstractButtonBase {
    LONG_ACTION_DURATION = 350;
    DOUBLE_ACTION_DURATION = 450;

    onMidi(midiControl: MidiControl, midiMessage: MidiMessage) {
        if (this.onPress) this._handlePress(midiMessage);
        if (this.onLongPress) this._handleLongPress(midiMessage);
        if (this.onDoublePress) this._handleDoublePress(midiMessage);
        if (this.onRelease) this._handleRelease(midiMessage);
        if (this.onDoubleRelease) this._handleDoubleRelease(midiMessage);
    }

    protected isDoublePress(midiMessage: MidiMessage) {
        return this.memory['doublePress'] && this.isPress(midiMessage);
    }

    protected isDoubleRelease(midiMessage: MidiMessage) {
        return this.memory['doubleRelease'] && this.isRelease(midiMessage);
    }

    private _handlePress(midiMessage: MidiMessage) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this.isPress(midiMessage) || this.memory['doublePress']) return;
        // handle single press
        this.onPress();
    }

    private _handleDoublePress(midiMessage: MidiMessage) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(midiMessage)) return;

        // if is doublePress
        if (this.isDoublePress(midiMessage)) {
            this.onDoublePress();
        } else if (this.DOUBLE_ACTION_DURATION) {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            const task = new TimeoutTask(this, function() {
                delete this.memory['doublePress'];
            }, this.DOUBLE_ACTION_DURATION).start();
            this.memory['doublePress'] = task;
        }
    }

    private _handleLongPress(midiMessage: MidiMessage) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(midiMessage)) return;

        // if it's a press schedule the callback
        if (this.isPress(midiMessage) && this.LONG_ACTION_DURATION) {
            // schedule callback
            this.memory['longPress'] = new TimeoutTask(this, function() {
                this.onLongPress();
            }, this.LONG_ACTION_DURATION).start();
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) this.cancelTimeoutTask('longPress');
        }
    }

    private _handleRelease(midiMessage: MidiMessage) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(midiMessage) || this.memory['doubleRelease']) return;
        // handle single release
        this.onRelease();
    }

    private _handleDoubleRelease(midiMessage: MidiMessage) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(midiMessage)) return;

        // if is doubleRelease
        if (this.isDoubleRelease(midiMessage)) {
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