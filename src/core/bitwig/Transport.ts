import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BeatTime from './BeatTime';
import AutomatableRangedValue from './AutomatableRangedValue';
import TimeSignatureValue from './TimeSignatureValue';


class Transport extends ApiProxy<api.Transport> {
    constructor (principal: api.Transport) {
        super(principal);
        this._extendMethodClassMap({
            'getTempo': AutomatableRangedValue,
            'getPosition': BeatTime,
            'getInPosition': BeatTime,
            'getOutPosition': BeatTime,
            'getCrossfade': AutomatableRangedValue,
            'getTimeSignature': TimeSignatureValue,
            'getClipLauncherPostRecordingTimeOffset': BeatTime,
        });
    }
}


export default Transport;
