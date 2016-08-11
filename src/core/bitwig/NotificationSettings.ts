import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BooleanValue from './BooleanValue';


class NotificationSettings extends ApiProxy<api.NotificationSettings> {
    constructor (principal: api.NotificationSettings) {
        super(principal);
        this._extendMethodClassMap({
            'getUserNotificationsEnabled': BooleanValue,
        });
    }
}


export default NotificationSettings;
