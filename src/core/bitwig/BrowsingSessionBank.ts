import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import GenericBrowsingSession from './GenericBrowsingSession';


class BrowsingSessionBank extends ApiProxy<api.BrowsingSessionBank> {
    constructor (principal: api.BrowsingSessionBank) {
        super(principal);
        this._extendMethodClassMap({
            'getSession': GenericBrowsingSession,
        });
    }
}


export default BrowsingSessionBank;
