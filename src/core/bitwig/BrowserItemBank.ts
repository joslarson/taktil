import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItem from './BrowserItem';


class BrowserItemBank extends ApiProxy<api.BrowserItemBank> {
    constructor (principal: api.BrowserItemBank) {
        super(principal);
        this._extendMethodClassMap({
            'getItem': BrowserItem,
        });
    }
}


export default BrowserItemBank;
