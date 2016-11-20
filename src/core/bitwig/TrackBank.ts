import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Track from './Track';
import ChannelBank from './ChannelBank';
import ClipLauncherScenesOrSlots from './ClipLauncherScenesOrSlots';


class TrackBank extends ChannelBank {
    constructor (target: api.TrackBank) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': Track,
            'getClipLauncherScenes': ClipLauncherScenesOrSlots,
        });
    }
}


export default TrackBank;
