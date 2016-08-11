import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import AutomatableRangedValue from './AutomatableRangedValue';


class UserControlBank extends ApiProxy<api.UserControlBank> {
    constructor (principal: api.UserControlBank) {
        super(principal);
        this._extendMethodClassMap({
            'getControl': AutomatableRangedValue,
        });
    }
}


export default UserControlBank;
