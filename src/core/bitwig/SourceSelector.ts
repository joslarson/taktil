import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BooleanValue from './BooleanValue';


class SourceSelector extends ApiProxy<api.SourceSelector> {
    constructor (principal: api.SourceSelector) {
        super(principal);
        this._extendMethodClassMap({
            'getHasNoteInputSelected': BooleanValue,
            'getHasAudioInputSelected': BooleanValue,
        });
    }
}


export default SourceSelector;
