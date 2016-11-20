import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Action from './Action';


class ActionCategory extends ApiProxy<api.ActionCategory> {
    constructor (target: api.ActionCategory) {
        super(target);
        this._extendMethodClassMap({
            'getActions': Action,
        });
    }
}


export default ActionCategory;
