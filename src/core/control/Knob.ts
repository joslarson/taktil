import AbstractControl from './AbstractControl';
import DeviceControl from '../device/DeviceControl';
import * as utils from '../../utils';
import Midi from '../../helpers/Midi';


export default class Knob extends AbstractControl {
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

    setDeviceCtrlState(deviceCtrl: DeviceControl, state) {
        let midiIndex = deviceCtrl.midiIndex;
        deviceCtrl.device.midiOuts[midiIndex]
            .sendMidi(deviceCtrl.status, deviceCtrl.data1, this.state);
    }

    setMeter(data2) {
        if (!this.meter) return;
        data2 = data2 > 126 ? 126 : data2;
        data2 = data2 < 1 ? 1 : data2;
        for (let deviceCtrl of this.deviceCtrls) {
            let midiIndex = deviceCtrl.midiIndex;
            deviceCtrl.device.midiOuts[midiIndex]
                .sendMidi(deviceCtrl.status, deviceCtrl.data1, data2);
        }
    }

    onMidi(deviceCtrl: DeviceControl, midi: Midi) {
        this.handleState(deviceCtrl, midi);
        this.handleChange(midi);
    }

    private handleChange(midi: Midi) {
        // if not implemented, ignore it
        if (!this.eventHandlers['change']) return;
        // handle single change
        this.callCallback('change', midi.data2);
    }

    private handleState(device, midi: Midi) {
        if (this.state == undefined) return;
        let newData2 = midi.data2;
        let newKnobState = midi.data2;

        this.cancelCallback('meter');
        this.memory['meter'] = new utils.IntervalTask(this, function() {
            this.meter = true;
        }, 600).start();

        if (this.meter) {
            for (let deviceCtrl of this.deviceCtrls) {
                let midiIndex = deviceCtrl.midiIndex;
                deviceCtrl.device.midiOuts[midiIndex]
                    .sendMidi(deviceCtrl.status, deviceCtrl.data1, this.state);
            }
            this.meter = false;
            return;
        }

        this.state = newKnobState;

        if (newData2 == 0) newData2 = 1;
        if (newData2 == 127) newData2 = 126;

        for (let deviceCtrl of this.deviceCtrls) {
            let midiIndex = deviceCtrl.midiIndex;
            deviceCtrl.device.midiOuts[midiIndex]
                .sendMidi(deviceCtrl.status, deviceCtrl.data1, newData2);
        }
    }
}
