import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import { SimpleMidiMessage } from '../midi/MidiMessage';
import AbstractController from './AbstractController';
import host from '../../host';
import * as api from '../../typings/api';


export default class Control extends AbstractCollectionItem implements SimpleMidiMessage {
    controller: AbstractController;
    midiInPort: number;
    midiOutPort: number;
    status: number;
    data1: number;
    data2: number;

    constructor({ controller, midiInPort = 0, midiOutPort = 0, status, data1 = 0, data2 = 0 }: { controller?: AbstractController, midiInPort?: number, midiOutPort?: number, status: number, data1?: number, data2?: number }) {
        super();

        this.controller = controller;
        this.midiInPort = midiInPort;
        this.midiOutPort = midiOutPort;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
    }
}
