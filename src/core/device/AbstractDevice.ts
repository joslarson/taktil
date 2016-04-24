import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Midi from '../../helpers/Midi';
import {isCc, isNote} from '../../utils';
import DeviceTemplate from './DeviceTemplate';
import DeviceControl from './DeviceControl';
import DeviceControlCollection from './DeviceControlCollection';
import session from '../../session';


abstract class AbstractDevice extends AbstractCollectionItem {
    deviceCtrls: DeviceControlCollection = new DeviceControlCollection();
    midiIns: api.MidiIn[];
    midiOuts: api.MidiOut[];
    padMIDITable;

    constructor (deviceTemplate: DeviceTemplate, midiIns: api.MidiIn[]|api.MidiIn, midiOuts: api.MidiOut[]|api.MidiOut) {
        super();
        this.midiIns = midiIns instanceof Array ? <api.MidiIn[]>midiIns : [<api.MidiIn>midiIns];
        this.midiOuts = midiOuts instanceof Array ? <api.MidiOut[]>midiOuts : [<api.MidiOut>midiOuts];

        if (deviceTemplate.length != this.midiIns.length) throw 'Number of inputs in template does not match defined number of device midi inputs';

        for (let midiIndex = 0; midiIndex < deviceTemplate.length; midiIndex++) {
            this.midiIns[midiIndex].setMidiCallback(this.getMidiCallback(midiIndex));

            for (let deviceCtrlName in deviceTemplate[midiIndex]) {
                let deviceCtrl = new DeviceControl(this, midiIndex, deviceTemplate[midiIndex][deviceCtrlName])
                this.deviceCtrls.add(deviceCtrlName, deviceCtrl);
            }
        }
    }

    private getMidiCallback (midiIndex) {
        return (status:number, data1:number, data2:number) => {
            let midi = {status, data1, data2};
            this.onMidi(midiIndex, midi);
        };
    }

    onMidi (midiIndex:number, midi:Midi) {
        log(`${this.name() + String(midiIndex)}(${midi.status.toString(16)}, ${midi.data1.toString()}, ${midi.data2.toString()})`);
        if (!isCc(midi.status) && !isNote(midi.status)) return;

        let deviceCtrl = this.deviceCtrls.midiGet(midiIndex, midi.status, midi.data1);

        session.views.active.onMidi(deviceCtrl, midi);

        this.updateDeviceCtrl(midiIndex, midi);
    }

    onSysex (midiIndex:number, data) {
    }

    arePressed(...deviceCtrls: DeviceControl[]) {
    	for (let deviceCtrl of deviceCtrls) {
    		if (!deviceCtrl.data2) {
    			return false;
    		}
    	}
    	return true;
    }

    updateDeviceCtrl (midiIndex: number, midi: Midi) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        let deviceCtrl = this.deviceCtrls.midiGet(midiIndex, midi.status, midi.data1);
        deviceCtrl.data2 = midi.data2;
    }

    blankController () {
        // implemented in child classes
    }
}

export default AbstractDevice;
