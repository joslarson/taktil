import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import NoteInput from './NoteInput';


class MidiIn extends ApiProxy<api.MidiIn> {
    constructor (target: api.MidiIn) {
        super(target);
        this._extendMethodClassMap({
            'createNoteInput': NoteInput,
        });
    }
}


export default MidiIn;
