import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class MusicBrowsingSession extends BrowsingSession {
    constructor (principal: api.MusicBrowsingSession) {
        super(principal);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default MusicBrowsingSession;
