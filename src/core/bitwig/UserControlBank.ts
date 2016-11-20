import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import AutomatableRangedValue from './AutomatableRangedValue';


class UserControlBank extends ApiProxy<api.UserControlBank> {
    constructor (target: api.UserControlBank) {
        super(target);
        this._extendMethodClassMap({
            'getControl': AutomatableRangedValue,
        });
    }
}


export default UserControlBank;
