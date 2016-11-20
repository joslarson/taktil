import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserResultsItem from './BrowserResultsItem';
import BrowserColumn from './BrowserColumn';
import BrowserResultsItemBank from './BrowserResultsItemBank';


class BrowserResultsColumn extends BrowserColumn {
    constructor (target: api.BrowserResultsColumn) {
        super(target);
        this._extendMethodClassMap({
            'createCursorItem': BrowserResultsItem,
            'createItemBank': BrowserResultsItemBank,
        });
    }
}


export default BrowserResultsColumn;
