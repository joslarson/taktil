import {AbstractCollectionItem} from '../../helpers';
import {isCc, isNote} from '../../utils';
import DeviceControl from './DeviceControl';
import DeviceControlCollection from './DeviceControlCollection';

abstract class AbstractDevice extends AbstractCollectionItem {
    deviceCtrls: DeviceControlCollection;
    midiIns: api.MidiIn[];
    midiOuts: api.MidiOut[];
    padNotes;
    padMIDITable;

    constructor(deviceCtrls: DeviceControlCollection) {
        super();
        this.deviceCtrls = deviceCtrls;
    }

    arePressed(...deviceCtrls: DeviceControl[]) {
    	var result = true;
    	for (let deviceCtrl of deviceCtrls) {
    		if (!deviceCtrl.data2) {
    			result = false;
    			break;
    		}
    	}
    	return result;
    }

    getDeviceCtrl(midiIndex: number, midi: Midi): DeviceControl {
        return this.deviceCtrls.midiGet(midiIndex, midi.status, midi.data1);
    }

    updateHwCtrl(midiIndex: number, midi: Midi) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        let deviceCtrl = this.getDeviceCtrl(midiIndex, midi);
        deviceCtrl.data2 = midi.data2;
    }

    blankController() {
        // implemented in child classes
    }
}

export default AbstractDevice;
