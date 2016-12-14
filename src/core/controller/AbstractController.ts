import MidiMessage from '../midi/MidiMessage';
import Control from './Control';
import host from '../../host';
import session from '../../session';
import logger from '../../logger';
import { MidiIn, MidiOut } from 'bitwig-api-proxy';


abstract class AbstractController {
    static instance: AbstractController;

    name = this.constructor.name;
    abstract controls: { [key: string ]: Control };
    private _controlMidiMap: { [key: number]: { [key: number]: { [key: number]: Control } } } = {};

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have its own singleton)
        const Controller = this as any as { new (): AbstractController, instance: AbstractController };
        let instance = Controller.instance;

        if (instance instanceof Controller) return instance;

        if (!__is_init__) throw "Controller objects can only be instantiated during the init phase.";

        instance = new Controller();
        Controller.instance = instance;

        const handledMidiInPorts = [];
        for (let controlName in instance.controls) {
            const control: Control = instance.controls[controlName];
            const { midiInPort, status, data1, data2 } = control;
            // name the control instance according to map
            control.name = controlName;
            // build unique list of midi-in ports the controller needs to handle
            if (handledMidiInPorts.indexOf(midiInPort) === -1) {
                handledMidiInPorts.push(midiInPort);
            }
            // add control to control collection
            control.controller = instance;
            // add to _controlMidiMap
            instance._addControlToMidiMap(control);
        }

        for (let midiInPort of handledMidiInPorts) {
            const midiIn = host.getMidiInPort(midiInPort);
            midiIn.setMidiCallback(instance._getMidiCallback(midiInPort));
        }

        return instance;
    }

    private _addControlToMidiMap(control: Control) {
        // cache reverse lookup midi values in this._midiMap
        if (this._controlMidiMap[`${control.midiInPort}`] == undefined) {
            this._controlMidiMap[`${control.midiInPort}`] = {};
        }
        if (this._controlMidiMap[`${control.midiInPort}`][control.status] == undefined) {
            this._controlMidiMap[`${control.midiInPort}`][control.status] = {};
        }
        this._controlMidiMap[`${control.midiInPort}`][control.status][control.data1] = control;
    }

    midiGetControl(midiInIndex: number, status: number, data1: number) {
        try {
            return this._controlMidiMap[midiInIndex][status][data1];
        } catch (e) {
            return undefined;
        }
    }

    private _getMidiCallback(midiInPort) {
        return (status:number, data1:number, data2:number) => {
            let midi = new MidiMessage({port: midiInPort, status, data1, data2});
            this.onMidi(midi);
        };
    }

    onMidi(midi: MidiMessage) {
        logger.debug(`${this.name}(IN ${String(midi.port)}) => { status: 0x${midi.status.toString(16).toUpperCase()}, data1: ${midi.data1.toString()}, data2: ${midi.data2.toString()} }`);

        let control = this.midiGetControl(midi.port, midi.status, midi.data1);
        let activeView = session.getActiveView().getInstance();

        if (control === undefined) {
            toast('Control not defined in controller template.');
            return;
        }

        if (activeView) {
            activeView.onMidi(control, midi);
            this.updateControl(midi);
        }
    }

    onSysex (midiInPort:number, data) {
    }

    updateControl(midi: MidiMessage) {
        let control = this.midiGetControl(midi.port, midi.status, midi.data1);
        control.data2 = midi.data2;
    }

    blankController() {
        for (let controlName in this.controls) {
            const control = this.controls[controlName];
            const { midiOutPort: port, status, data1 } = control, data2 = 0;
            session.midiOut.sendMidi({ port, status, data1, data2 });
        }
    }
}

export default AbstractController;
