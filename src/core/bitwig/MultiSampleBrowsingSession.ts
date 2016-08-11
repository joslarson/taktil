import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class MultiSampleBrowsingSession extends BrowsingSession {
    constructor (principal: api.MultiSampleBrowsingSession) {
        super(principal);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default MultiSampleBrowsingSession;
