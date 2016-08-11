import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItemBank from './BrowserItemBank';
import BrowserItem from './BrowserItem';


class CursorBrowserItem extends BrowserItem {
    constructor (principal: api.CursorBrowserItem) {
        super(principal);
        this._extendMethodClassMap({
            'createSiblingsBank': BrowserItemBank,
        });
    }
}


export default CursorBrowserItem;
