import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import GenericBrowsingSession from './GenericBrowsingSession';


class BrowsingSessionBank extends ApiProxy<api.BrowsingSessionBank> {
    constructor (target: api.BrowsingSessionBank) {
        super(target);
        this._extendMethodClassMap({
            'getSession': GenericBrowsingSession,
        });
    }
}


export default BrowsingSessionBank;
