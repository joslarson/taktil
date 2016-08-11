import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceBank from './DeviceBank';
import BooleanValue from './BooleanValue';


class DeviceChain extends ApiProxy<api.DeviceChain> {
    constructor (principal: api.DeviceChain) {
        super(principal);
        this._extendMethodClassMap({
            'createDeviceBank': DeviceBank,
        });
    }
}


export default DeviceChain;
