import config from  '../../config';
import document from  '../../document';
import AbstractComponent from './AbstractComponent';
import { msgType, TimeoutTask } from '../../utils';
import Control from '../controller/Control';
import MidiMessage from '../midi/MidiMessage';


const midiOut = document.midiOut;

enum Brightness {
    ON = 127,
    DIM = config['DIM_VALUE'],
    OFF = 0
}

export type ButtonType = 'GATE'|'TOGGLE'|'PRESS'|'MANUAL';
export type ButtonEvent = 'register'|'toggleOn'|'toggleOff'|'press'|'longPress'|'doublePress'|'release'|'doubleRelease';

export default class Button extends AbstractComponent {
    type: ButtonType;
    isColor: boolean;

    constructor({ name, type = 'GATE', isColor = false }: { name: string, type?: ButtonType, isColor?: boolean }) {
        super(name);
        this.type = type;
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

    renderControl(control: Control) {
        // TODO: remove Maschine specific code (implement sendcolor method)
        if (this.isColor) {
            midiOut.sendMidi({
                port: control.midiOutPort,
                status: msgType(control.status) + 0,
                data1: control.data1,
                data2: this.state.h,
            });
            midiOut.sendMidi({
                port: control.midiOutPort,
                status: msgType(control.status) + 1,
                data1: control.data1,
                data2: this.state.s,
            });
            midiOut.sendMidi({
                port: control.midiOutPort,
                status: msgType(control.status) + 2,
                data1: control.data1,
                data2: this.state.b,
            });
        } else {
            const { ON, OFF } = Brightness;
            midiOut.sendMidi({
                port: control.midiOutPort,
                status: control.status,
                data1: control.data1,
                data2: this.state ? ON : OFF
            });
        }
    }

    on(eventName: ButtonEvent, callback:Function) {
        return super.on(eventName, callback);
    }

    onMidi(control: Control, midi: MidiMessage) {
        if (this.type === 'TOGGLE') {
            this._handleToggle(midi);
        } else {
            this._handleState(midi);
            this._handlePress(midi);
            this._handleLongPress(midi);
            this._handleDoublePress(midi);
            this._handleRelease(midi);
            this._handleDoubleRelease(midi);
        }
    }

    private _isPress(midi: MidiMessage) {
        return midi.data2 > 0;
    }

    private _isDoublePress(midi: MidiMessage) {
        return this.memory['doublePress'] && this._isPress(midi);
    }

    private _isRelease(midi: MidiMessage) {
        return midi.data2 == 0;
    }

    private _isDoubleRelease(midi: MidiMessage) {
        return this.memory['doubleRelease'] && this._isRelease(midi);
    }

    private _handleToggle(midi: MidiMessage) {
        if (!this.eventHandlers['toggleOn'] || !this.eventHandlers['toggleOff']) {
            throw 'Must implement "toggleOn" and "toggleOff" callbacks.';
        }

        if (!this._isPress(midi)) return;

        if (!this.state) {
            this.setState(true);
            this.callCallback('toggleOn');
        } else {
            this.setState(false);
            this.callCallback('toggleOff');
        }
    }

    private _handlePress(midi: MidiMessage) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this._isPress(midi) || !this.eventHandlers['press'] || this.memory['doublePress']) return;
        // handle single press
        this.callCallback('press');
    }

    private _handleDoublePress(midi: MidiMessage) {
        // if it's not a press or not implemented, ignore it
        if (!this._isPress(midi) || !this.eventHandlers['doublePress']) return;

        // if is doublePress
        if (this._isDoublePress(midi)) {
            this.callCallback('doublePress');
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
        if (this._isDoublePress(midi) || !this.eventHandlers['longPress']) return;

        // if it's a press schedule the callback
        if (this._isPress(midi)) {
            // schedule callback
            this.memory['longPress'] = new TimeoutTask(this, function() {
                this.callCallback('longPress');
            }, config['LONG_PRESS_DURATION']).start();
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) this.cancelCallback('longPress');
        }
    }

    private _handleRelease(midi: MidiMessage) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this._isRelease(midi) || !this.eventHandlers['release'] || this.memory['doubleRelease']) return;
        // handle single release
        this.callCallback('release');
    }

    private _handleDoubleRelease(midi: MidiMessage) {
        // if it's not a release or not implemented, ignore it
        if (!this._isRelease(midi) || !this.eventHandlers['doubleRelease']) return;

        // if is doubleRelease
        if (this._isDoubleRelease(midi)) {
            this.callCallback('doubleRelease');
        } else {
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
            var task = new TimeoutTask(this, function() {
                delete this.memory['doubleRelease'];
            }, config['DOUBLE_PRESS_DURATION']).start();
            this.memory['doubleRelease'] = task;
        }
    }

    private _handleState(midi: MidiMessage) {
        if (this.state == undefined) return;

        if (this._isPress(midi) && (this.type == 'GATE' || this.type == 'PRESS')) {
            this.setState(true);
        } else if (this._isRelease(midi) && this.type == 'GATE') {
            this.setState(false);
        }
    }
}
