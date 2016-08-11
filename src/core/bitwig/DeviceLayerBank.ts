import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceLayer from './DeviceLayer';
import ChannelBank from './ChannelBank';


class DeviceLayerBank extends ChannelBank {
    constructor (principal: api.DeviceLayerBank) {
        super(principal);
        this._extendMethodClassMap({
            'getChannel': DeviceLayer,
        });
    }
}


export default DeviceLayerBank;
