import scriptState from '../../state';
import AbstractControl from './AbstractControl';
import * as utils from '../../utils';

export default class Knob extends AbstractControl {
    mode: string;
    meter: boolean = false;

    constructor(name, mode = 'SIMPLE') {
        super(name);
        this.mode = mode;  // 'SIMPLE', 'METER'
        if (mode == 'METER') this.meter = true;
        this.state = 0;  // Knob state (0-127)
    }

    setState(state) {
        this.meter = false;
        this.cancelCallback('meter');
        this.memory['meter'] = new utils.IntervalTask(this, function() {
            this.meter = true;
        }, 600).start();

        super.setState(state);
    }

    setHwCtrlState(hwCtrlName, state) {
        var hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
        scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, this.state);
    }

    setMeter(d2) {
        if (!this.meter) return;
        d2 = d2 > 126 ? 126 : d2;
        d2 = d2 < 1 ? 1 : d2;
        for (let hwCtrlName of this.hwCtrlNames) {
            var hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
            // log(hwCtrl.s, hwCtrl.d1, d2);
            scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, d2);
        }
    }

    onMidi(hwCtrlName: string, midi: Midi) {
        this.handleState(midi);
        this.handleChange(midi)
    }

    private handleChange(midi: Midi) {
        // if not implemented, ignore it
        if (!this.eventHandlers['change']) return;
        // handle single change
        this.callCallback('change', midi.d2);
    }

    private handleState(midi: Midi) {
        if (this.state == undefined) return;
        var newD2 = midi.d2;
        var newKnobState = midi.d2;
        this.cancelCallback('meter');
        this.memory['meter'] = new utils.IntervalTask(this, function() {
            this.meter = true;
        }, 600).start();
        if (this.meter) {
            for (let hwCtrlName of this.hwCtrlNames) {
                var hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
                scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, this.state);
            }
            this.meter = false;
            return;
        }
        this.state = newKnobState;

        if (newD2 == 0) newD2 = 1;
        if (newD2 == 127) newD2 = 126;

        for (let hwCtrlName of this.hwCtrlNames) {
            var hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
            scriptState.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, newD2);
        }
    }
}
