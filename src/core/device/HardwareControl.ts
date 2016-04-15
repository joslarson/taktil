import {AbstractCollectionItem} from '../../helpers';
import AbstractDevice from './AbstractDevice';


export default class HardwareControl extends AbstractCollectionItem {
    device: AbstractDevice;
    midiIn: api.MidiIn;
    midiOut: api.MidiOut;
    status: number;
    data1: number;
    data2: number;

    constructor(device: AbstractDevice, midiInOutIndex: number, status: number, data1: number, data2: number) {
        super();
        this.device = device;
        this.midiIn = device.midiIns[midiInOutIndex];
        this.midiOut = device.midiOuts[midiInOutIndex];
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
    }
}
