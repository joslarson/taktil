import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import ActionCategory from './ActionCategory';


export default class Action extends ApiProxy<api.Action> {
    constructor (target: api.Action) {
        super(target);
        this._extendMethodClassMap({
            'getCategory': ActionCategory,
        });
    }
}
