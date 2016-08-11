import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserFilterItemBank from './BrowserFilterItemBank';
import BrowserFilterItem from './BrowserFilterItem';
import BrowserColumn from './BrowserColumn';


class BrowserFilterColumn extends BrowserColumn {
    constructor (principal: api.BrowserFilterColumn) {
        super(principal);
        this._extendMethodClassMap({
            'getWildcardItem': BrowserFilterItem,
            'createCursorItem': BrowserFilterItem,
            'createItemBank': BrowserFilterItemBank,
        });
    }
}


export default BrowserFilterColumn;
