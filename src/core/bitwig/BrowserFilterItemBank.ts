import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItemBank from './BrowserItemBank';
import BrowserFilterItem from './BrowserFilterItem';


class BrowserFilterItemBank extends BrowserItemBank {
    constructor (principal: api.BrowserFilterItemBank) {
        super(principal);
        this._extendMethodClassMap({
            'getItem': BrowserFilterItem,
        });
    }
}


export default BrowserFilterItemBank;
