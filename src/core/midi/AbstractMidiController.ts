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
            const { input } = midiControl;
            // name the midiControl instance according to map
            midiControl.name = controlName;
            // build unique list of midi-in ports the midiController needs to handle
            if (handledMidiInPorts.indexOf(input) === -1) handledMidiInPorts.push(input);
        }

        for (let midiInPort of handledMidiInPorts) {
            const midiIn = host.getMidiInPort(midiInPort);
            midiIn.setMidiCallback(instance._getMidiCallback(midiInPort));
        }

        return instance;
    }

    private _getMidiCallback(midiInPort) {
        return (status:number, data1:number, data2:number) => {
            this.onMidi(new MidiMessage({port: midiInPort, status, data1, data2}));
        };
    }

    onMidi(midiMessage: MidiMessage) {
        logger.debug(`${this.name}(IN ${String(midiMessage.port)}) => { status: 0x${midiMessage.status.toString(16).toUpperCase()}, data1: ${midiMessage.data1.toString()}, data2: ${midiMessage.data2.toString()} }`);

        let activeView = session.getActiveView().getInstance();

        if (activeView) {
            activeView.onMidi(midiMessage);
            this.updateMidiControl(midiMessage);
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
