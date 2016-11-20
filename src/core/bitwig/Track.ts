import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import ClipLauncherSlots from './ClipLauncherSlots';
import EnumValue from './EnumValue';
import Channel from './Channel';
import TrackBank from './TrackBank';
import SourceSelector from './SourceSelector';
import BooleanValue from './BooleanValue';
import CursorDevice from './CursorDevice';


class Track extends Channel {
    constructor (target: api.Track) {
        super(target);
        this._extendMethodClassMap({
            'getClipLauncherSlots': ClipLauncherSlots,
            'getArm': BooleanValue,
            'getMonitor': BooleanValue,
            'getAutoMonitor': BooleanValue,
            'getCrossFadeMode': EnumValue,
            'getIsMatrixStopped': BooleanValue,
            'getIsMatrixQueuedForStop': BooleanValue,
            'getSourceSelector': SourceSelector,
            'getCanHoldNoteData': BooleanValue,
            'getCanHoldAudioData': BooleanValue,
            'createCursorDevice': CursorDevice,
            'createTrackBank': TrackBank,
            'createMainTrackBank': TrackBank,
            'createEffectTrackBank': TrackBank,
            'createMasterTrack': Track,
            'createSiblingsTrackBank': TrackBank,
        });
    }
}


export default Track;
