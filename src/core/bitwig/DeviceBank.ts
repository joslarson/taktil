import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceChain from './DeviceChain';
import Device from './Device';


class DeviceBank extends ApiProxy<api.DeviceBank> {
    constructor (principal: api.DeviceBank) {
        super(principal);
        this._extendMethodClassMap({
            'getDeviceChain': DeviceChain,
            'getDevice': Device,
        });
    }
}


export default DeviceBank;
