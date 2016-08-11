import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Action from './Action';


class ActionCategory extends ApiProxy<api.ActionCategory> {
    constructor (principal: api.ActionCategory) {
        super(principal);
        this._extendMethodClassMap({
            'getActions': Action,
        });
    }
}


export default ActionCategory;
