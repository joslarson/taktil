import {config} from  '../../session';
import AbstractControl from './AbstractControl';
import {msgType, IntervalTask} from '../../utils';


enum Brightness {
    ON = 127,
    DIM = config['DIM_VALUE'],
    OFF = 0
}

// enum Mode {
//     GATE,
//     TOGGLE,
//     PRESS,
//     MANUAL
// }

export default class Button extends AbstractControl {
    mode: string;
    isColor: boolean;

    constructor(mode='GATE', isColor=false) {
        super();
        this.mode = mode;  // 'GATE', 'TOGGLE', 'PRESS', 'MANUAL'
        this.isColor = isColor;
        if (this.isColor) {
            this.state = { h: 0, s: 0, b: Brightness.ON };
        } else {
            this.state = <boolean> false;
        }
    }

    setState(state) {
        if (this.isColor) {
            state = state === true ? {h: this.state.h, s: this.state.s, b: Brightness.ON} : state;
            state = state === false ? {h: this.state.h, s: this.state.s, b: Brightness.OFF} : state;
        }
        super.setState(state);
    }

    setHwCtrlState(hwCtrlName, state) {
        let hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
        if (this.isColor) {
            scriptState.midiOut.sendMidi(msgType(hwCtrl.s) + 0, hwCtrl.d1, this.state.h);
            scriptState.midiOut.sendMidi(msgType(hwCtrl.s) + 1, hwCtrl.d1, this.state.s);
            scriptState.midiOut.sendMidi(msgType(hwCtrl.s) + 2, hwCtrl.d1, state.b);
        } else {
            if (state) {
                scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, 127);
            } else {
                scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, 0);
            }
        }
    }

    onMidi(hwCtrlName: string, midi: Midi) {
        if (this.mode == 'TOGGLE') {
            this.handleToggle(midi);
        } else {
            this.handleState(midi);
            this.handlePress(midi);
            this.handleLongPress(midi);
            this.handleDoublePress(midi);
            this.handleRelease(midi);
            this.handleDoubleRelease(midi);
        }
    }

    private isPress(midi) {
        return midi.d2 > 0;
    }

    private isDoublePress(midi) {
        return this.isPress(midi) && this.memory['doublePress'];
    }

    private isRelease(midi) {
        return midi.d2 == 0;
    }

    private isDoubleRelease(midi) {
        return this.isRelease(midi) && this.memory['doubleRelease'];
    }

    private handleToggle(midi: Midi) {
        if (!this.eventHandlers['toggleOn'] || !this.eventHandlers['toggleOff']) {
            throw 'Must implement "toggleOn" and "toggleOff" callbacks.';
        }
        if (!this.isPress(midi)) return;

        if (!this.state) {
            this.setState(true);
            this.callCallback('toggleOn');
        } else {
            this.setState(false);
            this.callCallback('toggleOff');
        }
    }

    private handlePress(midi: Midi) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this.isPress(midi) || !this.eventHandlers['press'] || this.memory['doublePress']) return;
        // handle single press
        this.callCallback('press');
    }

    private handleDoublePress(midi: Midi) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(midi) || !this.eventHandlers['doublePress']) return;

        // if is doublePress
        if (this.isDoublePress(midi)) {
            this.callCallback('doublePress');
        } else {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            var task = new IntervalTask(this, function() {
                delete this.memory['doublePress'];
            }, config['DOUBLE_PRESS_DURATION']).start();
            this.memory['doublePress'] = task;
        }
    }

    private handleLongPress(midi: Midi) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(midi) || !this.eventHandlers['longPress']) return;

        // if it's a press schedule the callback
        if (this.isPress(midi)) {
            // schedule callback
            this.memory['longPress'] = new IntervalTask(this, function() {
                this.callCallback('longPress');
            }, config['LONG_PRESS_DURATION']).start();
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) this.cancelCallback('longPress');
        }
    }

    private handleRelease(midi: Midi) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(midi) || !this.eventHandlers['release'] || this.memory['doubleRelease']) return;
        // handle single release
        this.callCallback('release');
    }

    private handleDoubleRelease(midi: Midi) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(midi) || !this.eventHandlers['doubleRelease']) return;

        // if is doubleRelease
        if (this.isDoubleRelease(midi)) {
            this.callCallback('doubleRelease');
        } else {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            var task = new IntervalTask(this, function() {
                delete this.memory['doubleRelease'];
            }, config['DOUBLE_PRESS_DURATION']).start();
            this.memory['doubleRelease'] = task;
        }
    }

    private handleState(midi: Midi) {
        if (this.state == undefined) return;

        if (this.isPress(midi) && (this.mode == 'GATE' || this.mode == 'PRESS')) {
            this.setState(true);
        } else if (this.isRelease(midi) && this.mode == 'GATE') {
            this.setState(false);
        }
    }
}
