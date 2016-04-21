import {AbstractCollectionItem, Midi} from '../../helpers';
import AbstractDevice from './AbstractDevice';


export default class DeviceControl extends AbstractCollectionItem {
    device: AbstractDevice;
    midiIndex: number;
    status: number;
    data1: number;
    data2: number;

    constructor(device: AbstractDevice, midiIndex: number, midi: Midi) {
        super();
        this.device = device;
        this.midiIndex = midiIndex;
        this.status = midi.status;
        this.data1 = midi.data1;
        this.data2 = midi.data2;
    }
}
