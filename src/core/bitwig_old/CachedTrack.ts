import config from '../../config';
import CachedClip from './CachedClip';
import HSB from '../../helpers/HSB';
import * as api from '../../typings/api';
import session from '../../session';
import {rgb2hsb} from '../../utils';

export default class CachedTrack {
    track: api.Track;
    index: number = 0;
    type: string = 'Unassigned';
    isGroup: boolean = false;
    exists: boolean = false;
    isActive: boolean = true;
    isSoloed: boolean = false;
    isMuted: boolean = false;
    isSelected: boolean = false;

    hsb: HSB = { h: 0, s: 0, b: 0 };

    clips: CachedClip[] = [];
    playingClipIndex: number = null;
    queuedClipIndex: number = null;
    recordingClipIndex: number = null;
    recordingQueuedClipIndex: number = null;
    selectedClipIndex: number = null;

    constructor (track: api.Track) {
        this.track = track;
        // this._addTrackEventObservers();
    }

    getColor() {
        var hsb: HSB = this.hsb;

        if (this.isSelected) {
            hsb = { h: hsb.h, s: hsb.s, b: 127 };
        } else if (this.exists) {
            hsb = { h: hsb.h, s: hsb.s, b: config['DIM_VALUE'] };
        } else {
            hsb = { h: hsb.h, s: hsb.s, b: 0 };
        }
        // println('(' + hsb.h + ', ' + hsb.s + ', ' + hsb.b + ')');
        return hsb;
    }

    private _addTrackEventObservers() {
        let trackClipSlots = this.track.getClipLauncherSlots();

        this.track.addPositionObserver(position => {
            this.index = position;
        });

        this.track.addColorObserver((r, g, b) => {
            let hsb: HSB = rgb2hsb(r, g, b);
            this.hsb = hsb;
        });

        this.track.addTrackTypeObserver(25, 'Unassigned', (type) => {
            this.type = type; // Unassigned, Instrument, Audio, or Hybrid
        });

        this.track.addIsGroupObserver((isGroup) => {
            this.isGroup = isGroup;
        });

        // this.track.addIsSelectedInMixerObserver(isSelected => {
        //     // if no track is selected, set selectedTrackIndex to null
        //     if (isSelected) {
        //         this.isSelected = true;
        //         session.bitwig.cache.trackBankPage.selectedTrackIndex = trackIndex;
        //     } else {
        //         let page = session.bitwig.cache.trackBankPage;
        //         if (trackIndex == page.selectedTrackIndex) page.selectedTrackIndex = null;
        //         this.isSelected = false;
        //     }
        // });

        // trackClipSlots.addHasContentObserver((index, hasContent) => {
        //     let scene = session.bitwig.cache.trackBankPage.scenes[index];
        //     // println(trackIndex + ':' + index + ' ' + hasContent);
        //     // adds clips to tracks and scenes upon init
        //     if (this.clips[index] == undefined) this.clips[index] = new CachedClip();
        //     if (scene.clips[trackIndex] == undefined) scene.clips[trackIndex] = this.clips[index];
        //
        //     this.clips[index].hasContent = hasContent;
        //     session.bitwig.cache.trackBankPage.scenes[index].setHasContent();
        // });

        trackClipSlots.addIsPlaybackQueuedObserver((index, isQueued) => {
            let scene = session.bitwig.cache.trackBankPage.scenes[index];

            if (isQueued) {
                this.queuedClipIndex = index;
                this.clips[index].isQueued = true;
                session.bitwig.cache.trackBankPage.scenes[index].setIsQueued();
            } else {
                if (this.queuedClipIndex == index) this.queuedClipIndex = null;
                this.clips[index].isQueued = false;
                session.bitwig.cache.trackBankPage.scenes[index].isQueued = false;
            }
        });

        trackClipSlots.addIsPlayingObserver((index, isPlaying) => {
            if (isPlaying) {
                this.playingClipIndex = index;
                this.clips[index].isPlaying = true;
            } else {
                if (this.playingClipIndex == index) this.playingClipIndex = null;
                this.clips[index].isPlaying = false;
            }

            let scene = session.bitwig.cache.trackBankPage.scenes[index];
            session.bitwig.cache.trackBankPage.scenes[index].setIsPlaying();
        });

        trackClipSlots.addIsRecordingObserver((index, isRecording) => {
            if (isRecording) {
                this.recordingClipIndex = index;
                this.clips[index].isRecording = true;
            } else {
                if (this.recordingClipIndex == index) this.recordingClipIndex = null;
                this.clips[index].isRecording = false;
            }
        });

        trackClipSlots.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            if (isRecordingQueued) {
                this.recordingQueuedClipIndex = index;
                this.clips[index].isRecordingQueued = true;
            } else {
                if (this.recordingQueuedClipIndex == index) this.recordingQueuedClipIndex = null;
                this.clips[index].isRecordingQueued = false;
            }
        });

        trackClipSlots.addIsSelectedObserver((index, isSelected) => {
            if (isSelected) {
                this.selectedClipIndex = index;
                this.clips[index].isSelected = true;
            } else {
                if (this.selectedClipIndex == index) this.selectedClipIndex = null;
                this.clips[index].isSelected = false;
            }
        });

        trackClipSlots.addColorObserver((index, r, g, b) => {
            let hsb = rgb2hsb(r, g, b);
            // set clip color
            this.clips[index].hsb = hsb;
        });
    }
}
