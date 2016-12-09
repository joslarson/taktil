import AbstractComponent from './AbstractComponent';
import Control from '../controller/Control';
import * as utils from '../../utils';
import MidiMessage from '../midi/MidiMessage';
import document from '../../document';


export default class Knob extends AbstractComponent {
    // mode: string;
    // meter: boolean = false;

    // constructor(name:string, mode='SIMPLE') {
    //     super(name);
    //     this.mode = mode;  // 'SIMPLE', 'METER'
    //     if (mode == 'METER') this.meter = true;
    //     this.state = 0;  // Knob state (0-127)
    // }

    // setState(state) {
    //     this.meter = false;
    //     this.cancelCallback('meter');
    //     this.memory['meter'] = new utils.TimeoutTask(this, function() {
    //         this.meter = true;
    //     }, 600).start();

    //     super.setState(state);
    // }

    // renderControl(control: Control) {
    //     document.midiOut.sendMidi({
    //         port: control.midiOutPort,
    //         status: control.status,
    //         data1: control.data1,
    //         data2: this.state,
    //     });
    // }

    // setMeter(data2) {
    //     if (!this.meter) return;
    //     data2 = data2 > 126 ? 126 : data2;
    //     data2 = data2 < 1 ? 1 : data2;
    //     for (let control of this.controls) {
    //         document.midiOut.sendMidi({
    //             port: control.midiOutPort,
    //             status: control.status,
    //             data1: control.data1,
    //             data2,
    //         });
    //     }
    // }

    // onMidi(control: Control, midi: MidiMessage) {
    //     this._handleState(control, midi);
    //     this._handleChange(midi);
    // }

    // private _handleChange(midi: MidiMessage) {
    //     // if not implemented, ignore it
    //     if (!this.eventHandlers['change']) return;
    //     // handle single change
    //     this.callCallback('change', midi.data2);
    // }

    // private _handleState(controller, midi: MidiMessage) {
    //     if (this.state == undefined) return;
    //     let newData2 = midi.data2;
    //     let newKnobState = midi.data2;

    //     this.cancelCallback('meter');
    //     this.memory['meter'] = new utils.TimeoutTask(this, function() {
    //         this.meter = true;
    //     }, 600).start();

    //     if (this.meter) {
    //         for (let control of this.controls) {
    //             document.midiOut.sendMidi({
    //                 port: control.midiOutPort,
    //                 status: control.status,
    //                 data1: control.data1,
    //                 data2: this.state,
    //             });
    //         }
    //         this.meter = false;
    //         return;
    //     }

    //     this.state = newKnobState;

    //     if (newData2 == 0) newData2 = 1;
    //     if (newData2 == 127) newData2 = 126;

    //     for (let control of this.controls) {
    //         document.midiOut.sendMidi({
    //             port: control.midiOutPort,
    //             status: control.status,
    //             data1: control.data1,
    //             data2: newData2,
    //         });
    //     }
    // }
}
