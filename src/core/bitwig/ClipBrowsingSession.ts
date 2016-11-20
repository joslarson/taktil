import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class ClipBrowsingSession extends BrowsingSession {
    constructor (target: api.ClipBrowsingSession) {
        super(target);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default ClipBrowsingSession;
