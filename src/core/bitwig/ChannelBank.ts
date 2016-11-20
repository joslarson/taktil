import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Channel from './Channel';


class ChannelBank extends ApiProxy<api.ChannelBank> {
    constructor (target: api.ChannelBank) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': Channel,
        });
    }
}


export default ChannelBank;
