import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItemBank from './BrowserItemBank';
import BrowserResultsItem from './BrowserResultsItem';


class BrowserResultsItemBank extends BrowserItemBank {
    constructor (principal: api.BrowserResultsItemBank) {
        super(principal);
        this._extendMethodClassMap({
            'getItem': BrowserResultsItem,
        });
    }
}


export default BrowserResultsItemBank;
