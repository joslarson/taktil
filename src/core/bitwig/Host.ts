import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Arranger from './Arranger';
import DocumentState from './DocumentState';
import CursorDevice from './CursorDevice';
import Project from './Project';
import Transport from './Transport';
import CursorTrack from './CursorTrack';
import Application from './Application';
import NotificationSettings from './NotificationSettings';
import MidiOut from './MidiOut';
import Clip from './Clip';
import RemoteSocket from './RemoteSocket';
import UserControlBank from './UserControlBank';
import Mixer from './Mixer';
import Preferences from './Preferences';
import Groove from './Groove';
import SceneBank from './SceneBank';
import TrackBank from './TrackBank';
import MidiIn from './MidiIn';
import Track from './Track';


class Host extends ApiProxy<api.Host> {
    constructor (target: api.Host) {
        super(target);
        this._extendMethodClassMap({
            'getMidiInPort': MidiIn,
            'getMidiOutPort': MidiOut,
            'getPreferences': Preferences,
            'getDocumentState': DocumentState,
            'getNotificationSettings': NotificationSettings,
            'getProject': Project,
            'createTransport': Transport,
            'createGroove': Groove,
            'createApplication': Application,
            'createArranger': Arranger,
            'createMixer': Mixer,
            'createTrackBank': TrackBank,
            'createMainTrackBank': TrackBank,
            'createEffectTrackBank': TrackBank,
            'createMasterTrack': Track,
            'createArrangerCursorTrack': CursorTrack,
            'createCursorTrack': CursorTrack,
            'createSceneBank': SceneBank,
            'createEditorCursorDevice': CursorDevice,
            'createCursorClip': Clip,
            'createUserControls': UserControlBank,
            'createRemoteConnection': RemoteSocket,
        });
    }
}


export default Host;
