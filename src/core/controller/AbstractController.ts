import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import MidiMessage from '../midi/MidiMessage';
import { isCc, isNote } from '../../utils';
import Template from './Template';
import Control from './Control';
import ControlCollection from './ControlCollection';
import host from '../../host';
import document from '../../document';
import * as api from '../../typings/api';
import logger from '../../logger';


abstract class AbstractController {
    private _controlCollection: ControlCollection = new ControlCollection();
    controls;
    padMIDITable;

    constructor(template: Template, controls) {
        if (!__is_init__) throw "Controller objects can only be instantiated during the init phase.";
        const templates = [template];
        this.controls = controls;
        for (let template of templates) {
            const midiInIndex = template.midiInIndex;
            const midiOutIndex = template.midiOutIndex;

            const midiIn = host.getMidiInPort(midiInIndex);
            midiIn.setMidiCallback(this._getMidiCallback(midiInIndex));

            if (template.noteInput) {
                const noteInput = midiIn.createNoteInput(template.noteInput[0], ...template.noteInput.slice(1));
                // noteInput.setShouldConsumeEvents(false);
                if (template.shouldConsumeEvents !== undefined) {
                    noteInput.setShouldConsumeEvents(template.shouldConsumeEvents);
                }
                // TODO: figure out where to store pointer to note input for modifying shouldConsumeEvents
            }

        }
        for (let controlName in this.controls) {
            const control: Control = this.controls[controlName];
            control.controller = this;
            this._controlCollection.add(controlName, control);
        }
    }

    getName() {
        const controllers = document.controllers;
        for (let controllerName in controllers) {
            if (controllers[controllerName] === this) return controllerName;
        }
        throw 'Unable to find registration name for controller';
    }

    private _getMidiCallback(midiInIndex) {
        return (status:number, data1:number, data2:number) => {
            let midi = new MidiMessage({port: midiInIndex, status, data1, data2});
            this.onMidi(midi);
        };
    }

    onMidi(midi: MidiMessage) {
        if (!isCc(midi.status) && !isNote(midi.status)) return;  // TODO: what else do we need to allow through here?
        logger.debug(`${this.getName()}(IN ${String(midi.port)}) => { status: 0x${midi.status.toString(16).toUpperCase()}, data1: ${midi.data1.toString()}, data2: ${midi.data2.toString()} }`);

        let control = this._controlCollection.midiGet(midi.port, midi.status, midi.data1);
        let activeView = document.getActiveView();

        if (control === undefined) {
            toast('Control not defined in controller template.');
            return;
        }

        if (activeView) {
            activeView.onMidi(control, midi);
            this.updateControl(midi);
        }
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

    // TODO: what does this do for us?
    updateControl(midi: MidiMessage) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.status) && !isNote(midi.status)) return;
        let control = this._controlCollection.midiGet(midi.port, midi.status, midi.data1);
        control.data2 = midi.data2;
    }

    blankController() {
        // implemented in child classes
        throw 'Not Implemented';
    }
}

export default AbstractController;
