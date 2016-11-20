import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class DeviceBrowsingSession extends BrowsingSession {
    constructor (target: api.DeviceBrowsingSession) {
        super(target);
        this._extendMethodClassMap({
            'getCategoryFilter': BrowserFilterColumn,
            'getDeviceTypeFilter': BrowserFilterColumn,
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


export default DeviceBrowsingSession;
