import { SimpleMidiMessage, default as MidiMessage } from '../midi/MidiMessage';
import AbstractMidiController from './AbstractMidiController';
import host from '../../host';


export default class MidiControl implements SimpleMidiMessage {
    id: string;
    name: string;
    midiController: AbstractMidiController;
    midiInPort: number;
    midiOutPort: number;
    status: number;
    data1: number;
    data2: number;

    constructor({ midiController, midiInPort = 0, midiOutPort = 0, status, data1 = 0, data2 = 0 }: { midiController?: AbstractMidiController, midiInPort?: number, midiOutPort?: number, status: number, data1?: number, data2?: number }) {
        this.id = `${midiInPort}+${midiOutPort}:${status}:${data1}:${data2}`;
        this.midiController = midiController;
        this.midiInPort = midiInPort;
        this.midiOutPort = midiOutPort;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
    }
}


class NewMidiControl {
    name: string;
    midiController: AbstractMidiController;
    midiInPort: number;
    midiOutPort: number;

    constructor(
        messageFilter: string | ((midiMessage: MidiMessage) => boolean) |  RegExp,
        { midiController, midiInPort = 0, midiOutPort = 0 }:
            { midiController?: AbstractMidiController, midiInPort?: number, midiOutPort?: number }
    ) {
        if (typeof messageFilter === 'string') {
            
        }
        this.midiController = midiController;
        this.midiInPort = midiInPort;
        this.midiOutPort = midiOutPort;
    }
}