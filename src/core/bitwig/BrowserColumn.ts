import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItemBank from './BrowserItemBank';
import BrowserItem from './BrowserItem';


class BrowserColumn extends ApiProxy<api.BrowserColumn> {
    constructor (target: api.BrowserColumn) {
        super(target);
        this._extendMethodClassMap({
            'createCursorItem': BrowserItem,
            'createItemBank': BrowserItemBank,
        });
    }
}


export default BrowserColumn;