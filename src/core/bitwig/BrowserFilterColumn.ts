import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserFilterItemBank from './BrowserFilterItemBank';
import BrowserFilterItem from './BrowserFilterItem';
import BrowserColumn from './BrowserColumn';


class BrowserFilterColumn extends BrowserColumn {
    constructor (target: api.BrowserFilterColumn) {
        super(target);
        this._extendMethodClassMap({
            'getWildcardItem': BrowserFilterItem,
            'createCursorItem': BrowserFilterItem,
            'createItemBank': BrowserFilterItemBank,
        });
    }
}


export default BrowserFilterColumn;
