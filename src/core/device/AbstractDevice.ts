import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Midi from '../../helpers/Midi';
import {isCc, isNote} from '../../utils';
import DeviceTemplate from './DeviceTemplate';
import DeviceControl from './DeviceControl';
import DeviceControlCollection from './DeviceControlCollection';
import session from '../../session';
import * as api from '../../typings/api';


abstract class AbstractDevice extends AbstractCollectionItem {
    deviceCtrls: DeviceControlCollection = new DeviceControlCollection();
    padMIDITable;

    constructor (deviceTemplate: DeviceTemplate) {
        super();
        for (let ioMidiPair of deviceTemplate) {
            let midiInIndex = ioMidiPair['midiInIndex'];
            let midiOutIndex = ioMidiPair['midiOutIndex'];

            let midiIn = session.host.getMidiInPort(midiInIndex);
            midiIn.setMidiCallback(this.getMidiCallback(midiInIndex));
            if (ioMidiPair['noteInput']) {
                let noteInput: api.NoteInput = midiIn.createNoteInput(ioMidiPair['noteInput']);
                // noteInput.setShouldConsumeEvents(false);
                if (ioMidiPair['shouldConsumeEvents'] !== undefined) {
                    noteInput.setShouldConsumeEvents(ioMidiPair['shouldConsumeEvents']);
                }
                // TODO: figure out where to store pointer to note input fo modifying shouldConsumeEvents
            }


            for (let deviceCtrlName in ioMidiPair['controls']) {
                let deviceCtrl = new DeviceControl(this, midiInIndex, midiOutIndex, ioMidiPair['controls'][deviceCtrlName]);
                this.deviceCtrls.add(deviceCtrlName, deviceCtrl);
            }
        }
    }

    private getMidiCallback (midiInIndex) {
        return (status:number, data1:number, data2:number) => {
            let midi = {status, data1, data2};
            this.onMidi(midiInIndex, midi);
        };
    }

    onMidi (midiInIndex:number, midi:Midi) {
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        log(`${this.name()}:${String(midiInIndex)}(${midi.status.toString(16)}, ${midi.data1.toString()}, ${midi.data2.toString()})`);

        let deviceCtrl = this.deviceCtrls.midiGet(midiInIndex, midi.status, midi.data1);

        session.views.active.onMidi(deviceCtrl, midi);

        this.updateDeviceCtrl(midiInIndex, midi);
    }

    onSysex (midiInIndex:number, data) {
    }

    arePressed(...deviceCtrls: DeviceControl[]) {
    	for (let deviceCtrl of deviceCtrls) {
    		if (!deviceCtrl.data2) {
    			return false;
    		}
    	}
    	return true;
    }

    updateDeviceCtrl (midiInIndex: number, midi: Midi) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        let deviceCtrl = this.deviceCtrls.midiGet(midiInIndex, midi.status, midi.data1);
        deviceCtrl.data2 = midi.data2;
    }

    blankController () {
        // implemented in child classes
    }

    // TODO: store color conversion and hardware color update in device (possibly provide mixins for different manufacturers in contrib)
}

export default AbstractDevice;
