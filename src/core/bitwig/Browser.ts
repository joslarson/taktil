import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import MultiSampleBrowsingSession from './MultiSampleBrowsingSession';
import CursorBrowsingSession from './CursorBrowsingSession';
import ClipBrowsingSession from './ClipBrowsingSession';
import PresetBrowsingSession from './PresetBrowsingSession';
import BrowsingSessionBank from './BrowsingSessionBank';
import MusicBrowsingSession from './MusicBrowsingSession';
import BrowsingSession from './BrowsingSession';
import BooleanValue from './BooleanValue';
import SampleBrowsingSession from './SampleBrowsingSession';
import DeviceBrowsingSession from './DeviceBrowsingSession';


class Browser extends ApiProxy<api.Browser> {
    constructor (principal: api.Browser) {
        super(principal);
        this._extendMethodClassMap({
            'createSessionBank': BrowsingSessionBank,
            'createCursorSession': CursorBrowsingSession,
            'getDeviceSession': DeviceBrowsingSession,
            'getPresetSession': PresetBrowsingSession,
            'getSampleSession': SampleBrowsingSession,
            'getMultiSampleSession': MultiSampleBrowsingSession,
            'getClipSession': ClipBrowsingSession,
            'getMusicSession': MusicBrowsingSession,
        });
    }
}


export default Browser;
