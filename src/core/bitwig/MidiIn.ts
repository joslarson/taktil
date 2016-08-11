import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import NoteInput from './NoteInput';


class MidiIn extends ApiProxy<api.MidiIn> {
    constructor (principal: api.MidiIn) {
        super(principal);
        this._extendMethodClassMap({
            'createNoteInput': NoteInput,
        });
    }
}


export default MidiIn;
