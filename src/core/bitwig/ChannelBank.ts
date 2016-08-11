import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Channel from './Channel';


class ChannelBank extends ApiProxy<api.ChannelBank> {
    constructor (principal: api.ChannelBank) {
        super(principal);
        this._extendMethodClassMap({
            'getChannel': Channel,
        });
    }
}


export default ChannelBank;
