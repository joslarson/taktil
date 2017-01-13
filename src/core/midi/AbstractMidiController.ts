import MidiMessage from '../midi/MidiMessage';
import MidiControl from './MidiControl';
import host from '../../host';
import session from '../../session';
import logger from '../../logger';
import { MidiIn, MidiOut } from 'bitwig-api-proxy';


abstract class AbstractMidiController {
    static instance: AbstractMidiController;

    name = this.constructor.name;
    abstract midiControls: { [key: string ]: MidiControl };
    private _controlMidiMap: { [key: number]: { [key: number]: { [key: number]: MidiControl } } } = {};

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have its own singleton)
        const MidiController = this as any as { new (): AbstractMidiController, instance: AbstractMidiController };
        let instance = MidiController.instance;

        if (instance instanceof MidiController) return instance;

        if (!__is_init__) throw "MidiController objects can only be instantiated during the init phase.";

        instance = new MidiController();
        MidiController.instance = instance;

        const handledMidiInPorts = [];
        for (let controlName in instance.midiControls) {
            const midiControl: MidiControl = instance.midiControls[controlName];
            const { midiInPort, status, data1, data2 } = midiControl;
            // name the midiControl instance according to map
            midiControl.name = controlName;
            // build unique list of midi-in ports the midiController needs to handle
            if (handledMidiInPorts.indexOf(midiInPort) === -1) {
                handledMidiInPorts.push(midiInPort);
            }
            // add midiControl to midiControl collection
            midiControl.midiController = instance;
            // add to _controlMidiMap
            instance._addMidiControlToMidiMap(midiControl);
        }

        for (let midiInPort of handledMidiInPorts) {
            const midiIn = host.getMidiInPort(midiInPort);
            midiIn.setMidiCallback(instance._getMidiCallback(midiInPort));
        }

        return instance;
    }

    private _addMidiControlToMidiMap(midiControl: MidiControl) {
        // cache reverse lookup midi values in this._midiMap
        if (this._controlMidiMap[`${midiControl.midiInPort}`] == undefined) {
            this._controlMidiMap[`${midiControl.midiInPort}`] = {};
        }
        if (this._controlMidiMap[`${midiControl.midiInPort}`][midiControl.status] == undefined) {
            this._controlMidiMap[`${midiControl.midiInPort}`][midiControl.status] = {};
        }
        this._controlMidiMap[`${midiControl.midiInPort}`][midiControl.status][midiControl.data1] = midiControl;
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

        let midiControl = this.midiGetControl(midi.port, midi.status, midi.data1);
        let activeView = session.getActiveView().getInstance();

        if (midiControl === undefined) {
            toast('MidiControl not defined in midiController template.');
            return;
        }

        if (activeView) {
            activeView.onMidi(midiControl, midi);
            this.updateMidiControl(midi);
        }
    }

    onSysex (midiInPort:number, data) {
    }

    updateMidiControl(midi: MidiMessage) {
        let midiControl = this.midiGetControl(midi.port, midi.status, midi.data1);
        midiControl.data2 = midi.data2;
    }

    blankMidiController() {
        for (let controlName in this.midiControls) {
            const midiControl = this.midiControls[controlName];
            const { midiOutPort: port, status, data1 } = midiControl, data2 = 0;
            session.midiOut.sendMidi({ port, status, data1, data2 });
        }
    }
}

export default AbstractMidiController;
