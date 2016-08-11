import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import AutomatableRangedValue from './AutomatableRangedValue';
import ModulationSource from './ModulationSource';


class Macro extends ApiProxy<api.Macro> {
    constructor (principal: api.Macro) {
        super(principal);
        this._extendMethodClassMap({
            'getAmount': AutomatableRangedValue,
            'getModulationSource': ModulationSource,
        });
    }
}


export default Macro;
