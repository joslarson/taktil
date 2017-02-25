import bitwig from 'apistore';


export function rgb2hsb({ r, g, b }: { r: number, g: number, b: number }) {
    var result: { h: number, s: number, b: number } = { h: undefined, s: undefined, b: undefined };

    var minVal = Math.min(r, g, b);
    var maxVal = Math.max(r, g, b);
    var delta = maxVal - minVal;

    result.b = maxVal;

    if (delta == 0) {
        result.h = 0;
        result.s = 0;
    } else {
        result.s = delta / maxVal;
        var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
        var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
        var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

        if (r == maxVal) { result.h = del_B - del_G; }
        else if (g == maxVal) { result.h = (1 / 3) + del_R - del_B; }
        else if (b == maxVal) { result.h = (2 / 3) + del_G - del_R; }

        if (result.h < 0) { result.h += 1; }
        if (result.h > 1) { result.h -= 1; }
    }

    result.h = Math.round(result.h * 360);
    result.s = Math.round(result.s * 1);
    result.b = Math.round(result.b * 1);

    result.h = Math.floor(result.h * 127.0 / 360.0);
    result.s = Math.floor ((1 - Math.pow (1 - result.s, 2)) * 127.0);
    // result.s = Math.floor(result.s * 127.0);
    result.b = Math.floor(result.b * 127.0);
 
    return result;
}

export function rgb2hsv ({ r, g, b }: { r: number, g: number, b: number }) {
    let rr, gg, bb,
        h, s, v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }

        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }

    return {
        // h: Math.round(h * 127),
        h: getOffsetHue(Math.round(h * 127), 0),
        s: Math.round(s * 127),
        v: Math.round(v * 127)
    };
}


function getOffsetHue(hue, offset) {
    offset = offset > 127 ? offset % 127 : (offset < -127 ? offset % -127 : offset);
    if (offset >= 0) {
        return hue + offset <= 127 ? hue + offset : hue + offset - 127;
    } else {
        return hue + offset >= 0   ? hue + offset : hue + offset + 127;
    }
}

export class SyncedInterval {
    static minBpm = 20;
    static maxBpm = 666;

    callback: Function;
    beats: number;
    cancelled = false;
    target: number = null;
    codeLag = 35;
    even = false;

    constructor (callback, beats) {
        this.callback = callback;
        this.beats = beats;
    }

    start() {
        const startTime = new Date().getTime();
        const position = bitwig.transport ? bitwig.transport.getPosition().get() : 1;
        const isPlaying = bitwig.transport ? bitwig.transport.isPlaying().get() : false;
        
        const bpm = (bitwig.transport ?
                     bitwig.transport.tempo().get() * (
                         SyncedInterval.maxBpm - SyncedInterval.minBpm
                     ) + SyncedInterval.minBpm
                     : 120);
        const beatLength = 60000 / bpm;

        let delay = this.beats * beatLength - this.codeLag;

        if (this.target === null && isPlaying) {
            const remainder = position % this.beats;
            const beatsUntilNextMark = this.beats - remainder;
            this.target = position + beatsUntilNextMark;
            this.even = false;
        }

        if (isPlaying) {
            delay = (this.target - position) * beatLength * this.beats - this.codeLag;
        } else {
            this.target = null;
        }

        host.scheduleTask(() => {
            if (!this.cancelled) {
                this.even = !this.even;
                const even = isPlaying ? this.target % (this.beats * 2) === 0 : this.even;
                this.callback(even);
                // update codeLag
                const endTime = new Date().getTime();
                this.codeLag = ((endTime - (startTime + delay)) + this.codeLag * 29) / 30;
                if (this.target !== null) this.target = this.target + this.beats;
                this.start();  // repeat
            }
        }, delay);
        return this;
    }

    cancel() {
        this.cancelled = true;
        return this;
    }
}

// const si = new SyncedInterval(() => {}, 1/2).start();