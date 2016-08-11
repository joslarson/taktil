import config from '../../config';
import CachedTrack from './CachedTrack';
import CachedScene from './CachedScene';
import CachedClip from './CachedClip';
import {rgb2hsb} from '../../utils';
import HSB from '../../helpers/HSB';
import session from '../../session';
import * as api from '../../typings/api';

export default class Bitwig {
    application: api.Application = session.host.createApplication();
    project: api.Project = session.host.getProject();
    transport: api.Transport = session.host.createTransport();
    cursorTrack: api.CursorTrack = session.host.createArrangerCursorTrack(0, config['SCENE_COUNT']);
    trackBank: api.TrackBank;
    sceneBank: api.SceneBank = session.host.createSceneBank(config['SCENE_COUNT']);
    master: api.MasterTrack = session.host.createMasterTrack(0);

    cache = {
        layout: <string> 'ARRANGE',
        transportIsPlaying: <boolean> false,
        tempo: <number> 120,
        click: <boolean> false,
        preRoll: <string> 'one_bar',
        overdub: <boolean> false,
        loop: <boolean> false,
        trackCount: 0,
        cursorTrack: {
            index: <number> 0,
            track: <CachedTrack> new CachedTrack(this.cursorTrack),
        },
        trackBankPage: {
            index: <number> 0,
            trackCount: <number> 0,
            selectedTrackIndex: <number> null,
            tracks: <CachedTrack[]> [],
            scenes: <CachedScene[]> []
        }
    }

    constructor() {
        let that = this;

        this.cursorTrack.addPositionObserver(position => {
            this.cache.cursorTrack.index = position;
        });

        // trackBank setup
        this.trackBank = this.project
            .getShownTopLevelTrackGroup()
            .createMainTrackBank(config['TRACK_COUNT'], 0, config['SCENE_COUNT'], true);

        // tempo observer
        this.transport.getTempo().addRawValueObserver((tempo) => {
            this.cache.tempo = tempo;
        });

        // transport play state observer
        this.transport.addIsPlayingObserver((isPlaying) => {
            this.cache.transportIsPlaying = isPlaying;
        });

        // metronome state observer
        this.transport.addClickObserver((isOn) => {
            this.cache.click = isOn;
        });

        this.transport.addPreRollObserver((state) => {
            this.cache.preRoll = state;
        });

        // overdub state observer
        this.transport.addOverdubObserver((isActive) => {
            this.cache.overdub = isActive;
        });

        // loop state observer
        this.transport.addIsLoopActiveObserver((isActive) => {
            this.cache.loop = isActive;
        });

        // layout observer
        this.application.addPanelLayoutObserver((layout) => {
            this.cache.layout = layout;
        }, 1000);

        // trackBank scrolll= position observer
        this.trackBank.addChannelScrollPositionObserver((position) => {
            this.cache.trackBankPage.index = position / config['TRACK_COUNT'];
            this.setBankPageTrackCount();
            this.resetTrackExistsFlags();
        }, 0);

        // channel count observer
        this.trackBank.addChannelCountObserver((count) => {
            this.cache.trackCount = count;
            this.setBankPageTrackCount();
            this.resetTrackExistsFlags();
        });

        for (let i = 0; i < config['SCENE_COUNT']; i++) {
            this.cache.trackBankPage.scenes[i] = new CachedScene();
        }

        for (let i=0; i < config['TRACK_COUNT']; i++) {
            let track = this.trackBank.getChannel(i);
            // init track list
            if (this.cache.trackBankPage.tracks[i] === undefined) {
                this.cache.trackBankPage.tracks[i] = new CachedTrack(track);
            }

            (() => { // enclosure
                const trackIndex = i;
                let cachedTrack = this.cache.trackBankPage.tracks[trackIndex];
                this._addTrackEventObservers(trackIndex, track, cachedTrack);
            })();
        }
    }

    private _addTrackEventObservers(trackIndex: number, track: api.Track, cachedTrack: CachedTrack) {
        let trackClipSlots = track.getClipLauncherSlots();

        track.addColorObserver((r, g, b) => {
            let hsb: HSB = rgb2hsb(r, g, b);
            cachedTrack.hsb = hsb;
        });

        track.addTrackTypeObserver(25, 'Unassigned', (type) => {
            cachedTrack.type = type; // Unassigned, Instrument, Audio, or Hybrid
        });

        track.addIsGroupObserver((isGroup) => {
            cachedTrack.isGroup = isGroup;
        });

        track.addIsSelectedInMixerObserver(isSelected => {
            // if no track is selected, set selectedTrackIndex to null
            if (isSelected) {
                cachedTrack.isSelected = true;
                this.cache.trackBankPage.selectedTrackIndex = trackIndex;
            } else {
                let page = this.cache.trackBankPage;
                if (trackIndex == page.selectedTrackIndex) page.selectedTrackIndex = null;
                cachedTrack.isSelected = false;
            }
        });

        trackClipSlots.addHasContentObserver((index, hasContent) => {
            let scene = this.cache.trackBankPage.scenes[index];
            // println(trackIndex + ':' + index + ' ' + hasContent);
            // adds clips to tracks and scenes upon init
            if (cachedTrack.clips[index] == undefined) cachedTrack.clips[index] = new CachedClip();
            if (scene.clips[trackIndex] == undefined) scene.clips[trackIndex] = cachedTrack.clips[index];

            cachedTrack.clips[index].hasContent = hasContent;
            this.cache.trackBankPage.scenes[index].setHasContent();
        });

        trackClipSlots.addIsPlaybackQueuedObserver((index, isQueued) => {
            let scene = this.cache.trackBankPage.scenes[index];

            if (isQueued) {
                cachedTrack.queuedClipIndex = index;
                cachedTrack.clips[index].isQueued = true;
                this.cache.trackBankPage.scenes[index].setIsQueued();
            } else {
                if (cachedTrack.queuedClipIndex == index) cachedTrack.queuedClipIndex = null;
                cachedTrack.clips[index].isQueued = false;
                this.cache.trackBankPage.scenes[index].isQueued = false;
            }
        });

        trackClipSlots.addIsPlayingObserver((index, isPlaying) => {
            if (isPlaying) {
                cachedTrack.playingClipIndex = index;
                cachedTrack.clips[index].isPlaying = true;
            } else {
                if (cachedTrack.playingClipIndex == index) cachedTrack.playingClipIndex = null;
                cachedTrack.clips[index].isPlaying = false;
            }

            let scene = this.cache.trackBankPage.scenes[index];
            this.cache.trackBankPage.scenes[index].setIsPlaying();
        });

        trackClipSlots.addIsRecordingObserver((index, isRecording) => {
            if (isRecording) {
                cachedTrack.recordingClipIndex = index;
                cachedTrack.clips[index].isRecording = true;
            } else {
                if (cachedTrack.recordingClipIndex == index) cachedTrack.recordingClipIndex = null;
                cachedTrack.clips[index].isRecording = false;
            }
        });

        trackClipSlots.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            if (isRecordingQueued) {
                cachedTrack.recordingQueuedClipIndex = index;
                cachedTrack.clips[index].isRecordingQueued = true;
            } else {
                if (cachedTrack.recordingQueuedClipIndex == index) cachedTrack.recordingQueuedClipIndex = null;
                cachedTrack.clips[index].isRecordingQueued = false;
            }
        });

        trackClipSlots.addIsSelectedObserver((index, isSelected) => {
            if (isSelected) {
                cachedTrack.selectedClipIndex = index;
                cachedTrack.clips[index].isSelected = true;
            } else {
                if (cachedTrack.selectedClipIndex == index) cachedTrack.selectedClipIndex = null;
                cachedTrack.clips[index].isSelected = false;
            }
        });

        trackClipSlots.addColorObserver((index, r, g, b) => {
            let hsb = rgb2hsb(r, g, b);
            // set clip color
            cachedTrack.clips[index].hsb = hsb;
        });
    }

    trackIndexExistsOnPage(index) {
        let trackCount = this.cache.trackBankPage.trackCount;
        return trackCount > 0 && index <= (trackCount - 1);
    }

    setBankPageTrackCount() {
        let highestTrackSlot = (this.cache.trackBankPage.index + 1) * config['TRACK_COUNT'];
        let moreSlotsThanTracks = this.cache.trackCount < highestTrackSlot;
        this.cache.trackBankPage.trackCount = moreSlotsThanTracks ? this.cache.trackCount % config['TRACK_COUNT'] : config['TRACK_COUNT'];
    };

    resetTrackExistsFlags() {
        for (let i=0; i < config['TRACK_COUNT']; i++) {
            this.cache.trackBankPage.tracks[i].exists = this.trackIndexExistsOnPage(i);
        };
    }
}
