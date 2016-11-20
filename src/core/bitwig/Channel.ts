import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceChain from './DeviceChain';
import AutomatableRangedValue from './AutomatableRangedValue';
import Value from './Value';
import BooleanValue from './BooleanValue';
import SoloValue from './SoloValue';


class Channel extends DeviceChain {
    constructor (target: api.Channel) {
        super(target);
        this._extendMethodClassMap({
            'getVolume': AutomatableRangedValue,
            'getPan': AutomatableRangedValue,
            'getMute': Value,
            'getSolo': SoloValue,
            'getSend': AutomatableRangedValue,
        });
    }
}


export default Channel;
