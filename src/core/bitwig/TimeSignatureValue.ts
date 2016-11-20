import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Value from './Value';
import IntegerValue from './IntegerValue';


class TimeSignatureValue extends Value {
    constructor (target: api.TimeSignatureValue) {
        super(target);
        this._extendMethodClassMap({
            'getNumerator': IntegerValue,
            'getDenominator': IntegerValue,
            'getTicks': IntegerValue,
        });
    }
}


export default TimeSignatureValue;
