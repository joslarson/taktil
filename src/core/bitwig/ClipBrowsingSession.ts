import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class ClipBrowsingSession extends BrowsingSession {
    constructor (principal: api.ClipBrowsingSession) {
        super(principal);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default ClipBrowsingSession;
