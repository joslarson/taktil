import {config, bitwig} from '../../session';


export default class CachedClip {
    hasContent: boolean = false;
    isQueued: boolean = false;
    isPlaying: boolean = false;
    isRecordingQueued: boolean = false;
    isRecording: boolean = false;
    isSelected: boolean = false;
    hsb: HSB = { h: 0, s: 0, b: 0 };

    getColor() {
        var hsb = this.hsb;
        var track = bitwig.cache.trackBankPage.tracks[bitwig.cache.trackBankPage.selectedTrackIndex];

        if (this.isQueued || this.isPlaying || this.isRecordingQueued || this.isRecording) {
            hsb = { h: hsb.h ? hsb.h : track.hsb.h, s: hsb.s ? hsb.s : track.hsb.s, b: 127 };
        } else if (this.hasContent) {
            hsb = { h: hsb.h, s: hsb.s, b: config['DIM_VALUE'] };
        } else {
            hsb = { h: hsb.h, s: hsb.s, b: 0 };
        }
        return hsb;
    }
}
