import config from  '../../config';
import AbstractComponent from './AbstractComponent';
import { msgType, IntervalTask } from '../../utils';
import Control from '../controller/Control';
import Midi from '../../helpers/Midi';


enum Brightness {
    ON = 127,
    DIM = config['DIM_VALUE'],
    OFF = 0
}

export type ButtonMode = 'GATE'|'TOGGLE'|'PRESS'|'MANUAL';
export type ButtonEvent = 'register'|'toggleOn'|'toggleOff'|'press'|'longPress'|'doublePress'|'release'|'doubleRelease';

export default class Button extends AbstractComponent {
    mode: ButtonMode;
    isColor: boolean;

    constructor(name: string, mode: ButtonMode = 'GATE', isColor = false) {
        super(name);
        this.mode = mode;
        this.isColor = isColor;
        this.state = this.isColor ? { h: 0, s: 0, b: Brightness.ON } : false;
    }

    setState(state) {
        if (this.isColor) {
            const { ON, OFF } = Brightness;
            state = typeof state === 'boolean' ? { 
                h: this.state.h, s: this.state.s, b: state ? ON : OFF,
            } : state;
        }
        super.setState(state);
    }

    setControlState(control: Control, state) {
        let midiOut = control.midiOut;
        if (this.isColor) {
            midiOut.sendMidi(msgType(control.status) + 0, control.data1, this.state.h);
            midiOut.sendMidi(msgType(control.status) + 1, control.data1, this.state.s);
            midiOut.sendMidi(msgType(control.status) + 2, control.data1, state.b);
        } else {
            const { ON, OFF } = Brightness;
            midiOut.sendMidi(control.status, control.data1, state ? ON : OFF);
        }
    }

    on(eventName: ButtonEvent, callback:Function) {
        return super.on(eventName, callback);
    }

    onMidi(control: Control, midi: Midi) {
        if (this.mode === 'TOGGLE') {
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

    private isPress(midi: Midi) {
        return midi.data2 > 0;
    }

    private isDoublePress(midi: Midi) {
        return this.memory['doublePress'] && this.isPress(midi);
    }

    private isRelease(midi: Midi) {
        return midi.data2 == 0;
    }

    private isDoubleRelease(midi: Midi) {
        return this.memory['doubleRelease'] && this.isRelease(midi);
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
