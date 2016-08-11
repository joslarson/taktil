import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import RangedValue from './RangedValue';
import BeatTime from './BeatTime';
import BooleanValue from './BooleanValue';


class Clip extends ApiProxy<api.Clip> {
    constructor (principal: api.Clip) {
        super(principal);
        this._extendMethodClassMap({
            'getShuffle': BooleanValue,
            'getAccent': RangedValue,
            'getPlayStart': BeatTime,
            'getPlayStop': BeatTime,
            'getLoopStart': BeatTime,
            'getLoopLength': BeatTime,
        });
    }
}


export default Clip;
