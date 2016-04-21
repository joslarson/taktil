import {config} from '../../session';
import CachedClip from './CachedClip';
import {HSB} from '../../helpers';


export default class CachedTrack {
    clips: CachedClip[];
    type: string;
    isGroup: boolean;
    exists: boolean;
    isActive: boolean;
    isSoloed: boolean;
    isMuted: boolean;
    isSelected: boolean;
    hsb: HSB;

    playingClipIndex: number;
    queuedClipIndex: number;
    recordingClipIndex: number;
    recordingQueuedClipIndex: number;
    selectedClipIndex: number;

    constructor() {
        this.type = 'Unassigned';
        this.isGroup = true;
        this.exists = false;
        this.isActive = true;
        this.isSoloed = false;
        this.isMuted = false;
        this.isSelected = false;

        this.hsb = { h: 0, s: 0, b: 0 };

        this.clips = [];
        this.playingClipIndex = null;
        this.queuedClipIndex = null;
        this.recordingClipIndex = null;
        this.recordingQueuedClipIndex = null;
        this.selectedClipIndex = null;
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
}
