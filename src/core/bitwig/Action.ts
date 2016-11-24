import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import ActionCategory from './ActionCategory';


class Action extends ApiProxy<api.Action> {
    constructor (target: api.Action) {
        super(target);
        this._extendMethodClassMap({
            'getCategory': ActionCategory,
        });
    }
}

interface Action extends ApiProxy<api.Action>, api.Action {};

declare const action: Action;


export default Action;