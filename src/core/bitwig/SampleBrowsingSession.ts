import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class SampleBrowsingSession extends BrowsingSession {
    constructor (target: api.SampleBrowsingSession) {
        super(target);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default SampleBrowsingSession;
