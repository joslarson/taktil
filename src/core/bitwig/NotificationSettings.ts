import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BooleanValue from './BooleanValue';


class NotificationSettings extends ApiProxy<api.NotificationSettings> {
    constructor (target: api.NotificationSettings) {
        super(target);
        this._extendMethodClassMap({
            'getUserNotificationsEnabled': BooleanValue,
        });
    }
}


export default NotificationSettings;
