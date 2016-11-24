import config from  '../../../config';
import document from  '../../../document';
import BaseButton from './BaseButton';
import { msgType, TimeoutTask } from '../../../utils';
import Control from '../../controller/Control';
import MidiMessage from '../../midi/MidiMessage';


enum Brightness {
    ON = 127,
    DIM = config['DIM_VALUE'],
    OFF = 0
}


abstract class ManualButton extends BaseButton {
    state: any = false;

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

    protected isPress(midi: MidiMessage) {
        return midi.data2 > 0;
    }

    protected isDoublePress(midi: MidiMessage) {
        return this.memory['doublePress'] && this.isPress(midi);
    }

    protected isRelease(midi: MidiMessage) {
        return midi.data2 === 0;
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
            var task = new TimeoutTask(this, function() {
                delete this.memory['doublePress'];
            }, config['DOUBLE_PRESS_DURATION']).start();
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
            }, config['LONG_PRESS_DURATION']).start();
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
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            var task = new TimeoutTask(this, function() {
                delete this.memory['doubleRelease'];
            }, config['DOUBLE_PRESS_DURATION']).start();
            this.memory['doubleRelease'] = task;
        }
    }
}


export default ManualButton;