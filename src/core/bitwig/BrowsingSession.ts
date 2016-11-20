import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import CursorBrowserFilterColumn from './CursorBrowserFilterColumn';
import BrowserResultsColumn from './BrowserResultsColumn';
import CursorBrowserResultItem from './CursorBrowserResultItem';
import BrowserResultsItem from './BrowserResultsItem';
import BrowserFilterColumnBank from './BrowserFilterColumnBank';


class BrowsingSession extends ApiProxy<api.BrowsingSession> {
    constructor (target: api.BrowsingSession) {
        super(target);
        this._extendMethodClassMap({
            'getResults': BrowserResultsColumn,
            'getCursorResult': CursorBrowserResultItem,
            'getSettledResult': BrowserResultsItem,
            'getCursorFilter': CursorBrowserFilterColumn,
            'createFilterBank': BrowserFilterColumnBank,
        });
    }
}


export default BrowsingSession;
