import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Midi from '../../helpers/Midi';
import AbstractController from './AbstractController';
import host from '../../host';
import * as api from '../../typings/api';

export default class Control extends AbstractCollectionItem {
    controller: AbstractController;
    midiInIndex: number;
    midiOutIndex: number;
    midiIn: api.MidiIn;
    midiOut: api.MidiOut;
    status: number;
    data1: number;
    data2: number;

    constructor(controller: AbstractController, midiInIndex: number, midiOutIndex: number, midi: Midi) {
        super();
        this.controller = controller;
        this.midiInIndex = midiInIndex;
        this.midiOutIndex = midiOutIndex;
        this.midiIn = host.getMidiInPort(midiInIndex);
        this.midiOut = host.getMidiOutPort(midiOutIndex);
        this.status = midi.status;
        this.data1 = midi.data1;
        this.data2 = midi.data2;
    }
}
