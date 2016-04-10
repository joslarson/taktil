import settings from '../../settings';
import CachedTrack from './CachedTrack';
import CachedScene from './CachedScene';
import CachedClip from './CachedClip';
import {rgb2hsb} from '../../utils';

export default class Bitwig {
    application: api.Application = host.createApplication();
    project: api.Project = host.getProject();
    transport: api.Transport = host.createTransport();
    trackBank: api.TrackBank;
    sceneBank: api.SceneBank = host.createSceneBank(settings.SCENE_COUNT);
    master: api.MasterTrack = host.createMasterTrack(0);

    cache = {
        layout: <string> 'ARRANGE',
        transportIsPlaying: <boolean> false,
        tempo: <number> 120,
        click: <boolean> false,
        preRoll: <string> 'one_bar',
        overdub: <boolean> false,
        loop: <boolean> false,
        trackCount: 0,
        trackBankPage: {
            index: <number> 0,
            trackCount: <number> 0,
            selectedTrackIndex: <number> null,
            tracks: <CachedTrack[]> [],
            scenes: <CachedScene[]> []
        }
    }

    constructor() {
        var that = this;

        // trackBank setup
        this.trackBank = this.project
            .getShownTopLevelTrackGroup()
            .createMainTrackBank(settings.TRACK_COUNT, 0, settings.SCENE_COUNT, true);

        // tempo observer
        this.transport.getTempo().addRawValueObserver(function(tempo) {
            that.cache.tempo = tempo;
        });

        // transport play state observer
        this.transport.addIsPlayingObserver(function(isPlaying) {
            that.cache.transportIsPlaying = isPlaying;
        });

        // metronome state observer
        this.transport.addClickObserver(function(isOn) {
            that.cache.click = isOn;
        });

        this.transport.addPreRollObserver(function(state) {
            that.cache.preRoll = state;
        });

        // overdub state observer
        this.transport.addOverdubObserver(function(isActive) {
            that.cache.overdub = isActive;
        });

        // loop state observer
        this.transport.addIsLoopActiveObserver(function(isActive) {
            that.cache.loop = isActive;
        });

        // layout observer
        this.application.addPanelLayoutObserver(function(layout) {
            that.cache.layout = layout;
        }, 1000);

        // trackBank scrolll= position observer
        this.trackBank.addChannelScrollPositionObserver(function(position) {
            that.cache.trackBankPage.index = position / settings.TRACK_COUNT;
            that.setBankPageTrackCount();
            that.resetTrackExistsFlags();
        }, 0);

        // channel count observer
        this.trackBank.addChannelCountObserver(function(count) {
            that.cache.trackCount = count;
            that.setBankPageTrackCount();
            that.resetTrackExistsFlags();
        });

        for (var i = 0; i < settings.SCENE_COUNT; i++) {
            this.cache.trackBankPage.scenes[i] = new CachedScene();
        }

        for (var i = 0; i < settings.TRACK_COUNT; i++) {
            // init track list
            if (that.cache.trackBankPage.tracks[i] === undefined) {
                that.cache.trackBankPage.tracks[i] = new CachedTrack();
            }

            (function() { // enclosure
                const trackIndex = i;
                var track = that.cache.trackBankPage.tracks[trackIndex];
                var trackClipSlots = that.trackBank
                    .getChannel(trackIndex).getClipLauncherSlots();

                that.trackBank.getChannel(trackIndex).addColorObserver(function(r, g, b) {
                    var hsb: HSB = rgb2hsb(r, g, b);
                    that.cache.trackBankPage.tracks[trackIndex].hsb = hsb;
                });

                that.trackBank.getChannel(trackIndex)
                    .addTrackTypeObserver(25, 'Unassigned', function(type) {
                        track.type = type; // Unassigned, Instrument, Audio, or Hybrid
                    });

                that.trackBank.getChannel(trackIndex).addIsGroupObserver(function(isGroup) {
                    track.isGroup = isGroup;
                });

                that.trackBank.getChannel(trackIndex).addIsSelectedInMixerObserver(
                    function(isSelected) {
                        // if no track is selected, set selectedTrackIndex to null
                        if (isSelected) {
                            that.cache.trackBankPage.tracks[trackIndex].isSelected = true;
                            that.cache.trackBankPage.selectedTrackIndex = trackIndex;
                        } else {
                            var page = that.cache.trackBankPage;
                            if (trackIndex == page.selectedTrackIndex) page.selectedTrackIndex = null;
                            track.isSelected = false;
                        }
                    }
                );

                trackClipSlots.addHasContentObserver(function(index, hasContent) {
                    var scene = that.cache.trackBankPage.scenes[index];
                    // println(trackIndex + ':' + index + ' ' + hasContent);
                    // adds clips to tracks and scenes upon init
                    if (track.clips[index] == undefined) track.clips[index] = new CachedClip();
                    if (scene.clips[trackIndex] == undefined) scene.clips[trackIndex] = track.clips[index];

                    track.clips[index].hasContent = hasContent;
                    that.cache.trackBankPage.scenes[index].setHasContent();
                });

                trackClipSlots.addIsQueuedObserver(function(index, isQueued) {
                    var scene = that.cache.trackBankPage.scenes[index];

                    if (isQueued) {
                        track.queuedClipIndex = index;
                        track.clips[index].isQueued = true;
                        that.cache.trackBankPage.scenes[index].setIsQueued();
                    } else {
                        if (track.queuedClipIndex == index) track.queuedClipIndex = null;
                        track.clips[index].isQueued = false;
                        that.cache.trackBankPage.scenes[index].isQueued = false;
                    }

                });

                trackClipSlots.addIsPlayingObserver(function(index, isPlaying) {

                    if (isPlaying) {
                        track.playingClipIndex = index;
                        track.clips[index].isPlaying = true;
                    } else {
                        if (track.playingClipIndex == index) track.playingClipIndex = null;
                        track.clips[index].isPlaying = false;
                    }

                    var scene = that.cache.trackBankPage.scenes[index];
                    that.cache.trackBankPage.scenes[index].setIsPlaying();
                });

                trackClipSlots.addIsRecordingObserver(function(index, isRecording) {
                    if (isRecording) {
                        track.recordingClipIndex = index;
                        track.clips[index].isRecording = true;
                    } else {
                        if (track.recordingClipIndex == index) track.recordingClipIndex = null;
                        track.clips[index].isRecording = false;
                    }
                });

                trackClipSlots.addIsRecordingQueuedObserver(function(index, isRecordingQueued) {
                    if (isRecordingQueued) {
                        track.recordingQueuedClipIndex = index;
                        track.clips[index].isRecordingQueued = true;
                    } else {
                        if (track.recordingQueuedClipIndex == index) track.recordingQueuedClipIndex = null;
                        track.clips[index].isRecordingQueued = false;
                    }
                });

                trackClipSlots.addIsSelectedObserver(function(index, isSelected) {
                    if (isSelected) {
                        track.selectedClipIndex = index;
                        track.clips[index].isSelected = true;
                    } else {
                        if (track.selectedClipIndex == index) track.selectedClipIndex = null;
                        track.clips[index].isSelected = false;
                    }
                });

                trackClipSlots.addColorObserver(function(index, r, g, b) {
                    var hsb = rgb2hsb(r, g, b);
                    // set clip color
                    track.clips[index].hsb = hsb;
                });
            })();
        }
    }

    trackIndexExistsOnPage(index) {
        var trackCount = this.cache.trackBankPage.trackCount;
        return trackCount > 0 && index <= (trackCount - 1);
    }

    setBankPageTrackCount() {
        var highestTrackSlot = (this.cache.trackBankPage.index + 1) * settings.TRACK_COUNT;
        var moreSlotsThanTracks = this.cache.trackCount < highestTrackSlot;
        this.cache.trackBankPage.trackCount = moreSlotsThanTracks ? this.cache.trackCount % settings.TRACK_COUNT : settings.TRACK_COUNT;
    };

    resetTrackExistsFlags() {
        for (var i = 0; i < settings.TRACK_COUNT; i++) {
            this.cache.trackBankPage.tracks[i].exists = this.trackIndexExistsOnPage(i);
        };
    }
}
