import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BooleanValue from './BooleanValue';


class SourceSelector extends ApiProxy<api.SourceSelector> {
    constructor (target: api.SourceSelector) {
        super(target);
        this._extendMethodClassMap({
            'getHasNoteInputSelected': BooleanValue,
            'getHasAudioInputSelected': BooleanValue,
        });
    }
}


export default SourceSelector;
