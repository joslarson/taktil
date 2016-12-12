import { SimpleMidiMessage } from '../midi/MidiMessage';
import AbstractController from './AbstractController';
import host from '../../host';


export default class Control implements SimpleMidiMessage {
    id: string;
    name: string;
    controller: AbstractController;
    midiInPort: number;
    midiOutPort: number;
    status: number;
    data1: number;
    data2: number;

    constructor({ controller, midiInPort = 0, midiOutPort = 0, status, data1 = 0, data2 = 0 }: { controller?: AbstractController, midiInPort?: number, midiOutPort?: number, status: number, data1?: number, data2?: number }) {
        this.id = `${midiInPort}+${midiOutPort}:${status}:${data1}:${data2}`;
        this.controller = controller;
        this.midiInPort = midiInPort;
        this.midiOutPort = midiOutPort;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
    }
}
