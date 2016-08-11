import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import ActionCategory from './ActionCategory';
import Action from './Action';


class Application extends ApiProxy<api.Application> {
    constructor (principal: api.Application) {
        super(principal);
        this._extendMethodClassMap({
            'getActions': Action,
            'getAction': Action,
            'getActionCategories': ActionCategory,
            'getActionCategory': ActionCategory,
        });
    }
}


export default Application;
