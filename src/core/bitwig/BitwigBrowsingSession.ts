import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class BitwigBrowsingSession extends BrowsingSession {
    constructor (principal: api.BitwigBrowsingSession) {
        super(principal);
        this._extendMethodClassMap({
            'getCreatorFilter': BrowserFilterColumn,
            'getTagsFilter': BrowserFilterColumn,
        });
    }
}


export default BitwigBrowsingSession;
