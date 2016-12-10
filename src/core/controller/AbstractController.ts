import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import MidiMessage from '../midi/MidiMessage';
import Control from './Control';
import ControlCollection from './ControlCollection';
import host from '../../host';
import document from '../../document';
import logger from '../../logger';
import { MidiIn, MidiOut } from 'bitwig-api-proxy';


abstract class AbstractController {
    static instance: AbstractController;

    name = this.constructor.name;
    abstract controls: { [key: string ]: Control };

    private _controlCollection: ControlCollection = new ControlCollection();

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
            // build unique list of midi-in ports the controller needs to handle
            if (handledMidiInPorts.indexOf(control.midiInPort) === -1) {
                handledMidiInPorts.push(control.midiInPort);
            }
            // add control to control collection
            control.controller = instance;
            instance._controlCollection.add(controlName, control);
        }

        for (let midiInPort of handledMidiInPorts) {
            const midiIn = host.getMidiInPort(midiInPort);
            midiIn.setMidiCallback(instance._getMidiCallback(midiInPort));
        }

        return instance;
    }

    private _getMidiCallback(midiInPort) {
        return (status:number, data1:number, data2:number) => {
            let midi = new MidiMessage({port: midiInPort, status, data1, data2});
            this.onMidi(midi);
        };
    }

    onMidi(midi: MidiMessage) {
        logger.debug(`${this.name}(IN ${String(midi.port)}) => { status: 0x${midi.status.toString(16).toUpperCase()}, data1: ${midi.data1.toString()}, data2: ${midi.data2.toString()} }`);

        let control = this._controlCollection.midiGet(midi.port, midi.status, midi.data1);
        let activeView = document.getActiveView().getInstance();

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
        let control = this._controlCollection.midiGet(midi.port, midi.status, midi.data1);
        control.data2 = midi.data2;
    }

    blankController() {
        // implemented in child classes
        throw 'Not Implemented';
    }
}

export default AbstractController;
