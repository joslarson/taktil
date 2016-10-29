import AbstractComponent from './AbstractComponent';
import Control from '../controller/Control';
import * as utils from '../../utils';
import Midi from '../../helpers/Midi';


export default class Knob extends AbstractComponent {
    mode: string;
    meter: boolean = false;

    constructor(name:string, mode='SIMPLE') {
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

    setControlState(control: Control, state) {
        control.midiOut
            .sendMidi(control.status, control.data1, this.state);
    }

    setMeter(data2) {
        if (!this.meter) return;
        data2 = data2 > 126 ? 126 : data2;
        data2 = data2 < 1 ? 1 : data2;
        for (let control of this.controls) {
            control.midiOut
                .sendMidi(control.status, control.data1, data2);
        }
    }

    onMidi(control: Control, midi: Midi) {
        this.handleState(control, midi);
        this.handleChange(midi);
    }

    private handleChange(midi: Midi) {
        // if not implemented, ignore it
        if (!this.eventHandlers['change']) return;
        // handle single change
        this.callCallback('change', midi.data2);
    }

    private handleState(controller, midi: Midi) {
        if (this.state == undefined) return;
        let newData2 = midi.data2;
        let newKnobState = midi.data2;

        this.cancelCallback('meter');
        this.memory['meter'] = new utils.IntervalTask(this, function() {
            this.meter = true;
        }, 600).start();

        if (this.meter) {
            for (let control of this.controls) {
                control.midiOut
                    .sendMidi(control.status, control.data1, this.state);
            }
            this.meter = false;
            return;
        }

        this.state = newKnobState;

        if (newData2 == 0) newData2 = 1;
        if (newData2 == 127) newData2 = 126;

        for (let control of this.controls) {
            control.midiOut
                .sendMidi(control.status, control.data1, newData2);
        }
    }
}
