import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import { SimpleMidiMessage } from '../midi/MidiMessage';
import AbstractController from './AbstractController';
import host from '../../host';
import * as api from '../../typings/api';


export default class Control extends AbstractCollectionItem {
    controller: AbstractController;
    midiInPort: number;
    midiOutPort: number;
    status: number;
    data1: number;
    data2: number;

    constructor(controller: AbstractController, midiInIndex: number, midiOutIndex: number, midi: SimpleMidiMessage) {
        super();
        this.controller = controller;
        this.midiInPort = midiInIndex;
        this.midiOutPort = midiOutIndex;
        this.status = midi.status;
        this.data1 = midi.data1;
        this.data2 = midi.data2;
    }
}
