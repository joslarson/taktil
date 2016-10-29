import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Midi from '../../helpers/Midi';
import { isCc, isNote } from '../../utils';
import Template from './Template';
import Control from './Control';
import ControlCollection from './ControlCollection';
import host from '../../host';
import document from '../../document';
import * as api from '../../typings/api';


abstract class AbstractController extends AbstractCollectionItem {
    controls: ControlCollection = new ControlCollection();
    padMIDITable;

    constructor(controllerTemplate: Template) {
        super();
        for (let ioMidiPair of controllerTemplate) {
            let midiInIndex = ioMidiPair['midiInIndex'];
            let midiOutIndex = ioMidiPair['midiOutIndex'];

            let midiIn = host.getMidiInPort(midiInIndex);
            midiIn.setMidiCallback(this.getMidiCallback(midiInIndex));
            if (ioMidiPair['noteInput']) {
                let noteInput: api.NoteInput = midiIn.createNoteInput(ioMidiPair['noteInput']);
                // noteInput.setShouldConsumeEvents(false);
                if (ioMidiPair['shouldConsumeEvents'] !== undefined) {
                    noteInput.setShouldConsumeEvents(ioMidiPair['shouldConsumeEvents']);
                }
                // TODO: figure out where to store pointer to note input for modifying shouldConsumeEvents
            }

            for (let controlName in ioMidiPair['controls']) {
                let control = new Control(this, midiInIndex, midiOutIndex, ioMidiPair['controls'][controlName]);
                this.controls.add(controlName, control);
            }
        }
    }

    private getMidiCallback(midiInIndex) {
        return (status:number, data1:number, data2:number) => {
            let midi = {status, data1, data2};
            this.onMidi(midiInIndex, midi);
        };
    }

    onMidi(midiInIndex:number, midi:Midi) {
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        log(`[${this.getName()}_${String(midiInIndex)}] status: 0x${midi.status.toString(16).toUpperCase()}, data1: ${midi.data1.toString()}, data2: ${midi.data2.toString()}`);

        let control = this.controls.midiGet(midiInIndex, midi.status, midi.data1);
 
        if (control === undefined) {
            toast('Control not defined in controller template.');
            return;
        }

        document.views.active.onMidi(control, midi);

        this.updateControl(midiInIndex, midi);
    }

    onSysex (midiInIndex:number, data) {
    }

    arePressed(...controls: Control[]) {
        for (let control of controls) {
            if (!control.data2) {
                return false;
            }
        }
        return true;
    }

    updateControl(midiInIndex: number, midi: Midi) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        let control = this.controls.midiGet(midiInIndex, midi.status, midi.data1);
        control.data2 = midi.data2;
    }

    blankController() {
        // implemented in child classes
        throw 'Not Implemented';
    }

    // TODO: store color conversion and hardware color update in controller (possibly provide mixins for different manufacturers in contrib)
}

export default AbstractController;
