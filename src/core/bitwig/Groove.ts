import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import AutomatableRangedValue from './AutomatableRangedValue';


class Groove extends ApiProxy<api.Groove> {
    constructor (principal: api.Groove) {
        super(principal);
        this._extendMethodClassMap({
            'getEnabled': AutomatableRangedValue,
            'getShuffleAmount': AutomatableRangedValue,
            'getShuffleRate': AutomatableRangedValue,
            'getAccentAmount': AutomatableRangedValue,
            'getAccentRate': AutomatableRangedValue,
            'getAccentPhase': AutomatableRangedValue,
        });
    }
}


export default Groove;
