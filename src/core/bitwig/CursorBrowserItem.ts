import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserItemBank from './BrowserItemBank';
import BrowserItem from './BrowserItem';


class CursorBrowserItem extends BrowserItem {
    constructor (target: api.CursorBrowserItem) {
        super(target);
        this._extendMethodClassMap({
            'createSiblingsBank': BrowserItemBank,
        });
    }
}


export default CursorBrowserItem;
