import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceLayer from './DeviceLayer';
import ChannelBank from './ChannelBank';


class DeviceLayerBank extends ChannelBank {
    constructor (target: api.DeviceLayerBank) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': DeviceLayer,
        });
    }
}


export default DeviceLayerBank;
