import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import ActionCategory from './ActionCategory';


class Action extends ApiProxy<api.Action> {
    constructor (principal: api.Action) {
        super(principal);
        this._extendMethodClassMap({
            'getCategory': ActionCategory,
        });
    }
}


export default Action;
