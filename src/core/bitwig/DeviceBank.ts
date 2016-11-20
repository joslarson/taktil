import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceChain from './DeviceChain';
import Device from './Device';


class DeviceBank extends ApiProxy<api.DeviceBank> {
    constructor (target: api.DeviceBank) {
        super(target);
        this._extendMethodClassMap({
            'getDeviceChain': DeviceChain,
            'getDevice': Device,
        });
    }
}


export default DeviceBank;
