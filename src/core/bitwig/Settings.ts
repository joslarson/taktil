import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import RangedValue from './RangedValue';
import Signal from './Signal';
import EnumValue from './EnumValue';
import StringValue from './StringValue';


class Settings extends ApiProxy<api.Settings> {
    constructor (principal: api.Settings) {
        super(principal);
        this._extendMethodClassMap({
            'getSignalSetting': Signal,
            'getNumberSetting': RangedValue,
            'getEnumSetting': EnumValue,
            'getStringSetting': StringValue,
        });
    }
}


export default Settings;
