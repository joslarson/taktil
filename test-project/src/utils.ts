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
        h: Math.round(h * 127),
        s: Math.round(s * 127),
        v: Math.round(v * 127)
    };
}
