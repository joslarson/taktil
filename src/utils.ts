import View from './core/View';
import state from './state';


export function isInArray(array, searchValue) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] == searchValue) return true;
    }
    return false;
}


export function getCcList(ctrlSection) {
    var ccList = [];
    var keys = Object.keys(ctrlSection);
    // println(keys);
    for (var i = 0; i < keys.length; i++) {
        var node = ctrlSection[keys[i]];
        if (typeof(node) === 'number'){
            ccList.push(node);
        } else {
            ccList = ccList.concat(getCcList(node));
        }
    };
    return ccList;
}

export function isCc(status) {
    return (status & 0xf0) == 0xb0;
}

export function isNote(status) {
    return ((status & 0xf0) == 0x80) || ((status & 0xf0) == 0x90);
}

export function midiChannel(status) {
	return (status & 0x0f) + 1;
}

export function msgType(status) {
    return (status & 0xf0);
}

export function rgb2hsb(r, g, b) {
    var result = {h: undefined, s: undefined, b: undefined};

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

    result.h = Math.floor (result.h * 127.0 / 360.0);
    result.s = Math.floor ((1 - Math.pow (1 - result.s, 2)) * 127.0);
    result.b = Math.floor (result.b * 127.0);

    return result;
}

export function initCountingArray(startValue, length) {
    var arr = [];
    arr.length = length;
    for (var x = 0; x < arr.length; x++) {
        arr[x] = x;
    }
    return arr;
}

export function all(testArray) {
    var result = true;
    for (var i = 0; i < testArray.length; i++) {
        var test = testArray[i];
        if (!test) {
            result = false;
            break;
        }
    };
    return result;
};

export function any(testArray) {
    var result = false;
    for (var i = 0; i < testArray.length; i++) {
        var test = testArray[i];
        if (test) {
            result = true;
            break;
        }
    };
    return result;
};



export class IntervalTask {
    scope: any;
    callback: Function;
    interval: number;
    cancelled = false;

    constructor(scope, callback, interval) {
        this.scope = scope;
        this.callback = callback;
        this.interval = interval;
    }

    start(...args) {
        var that = this;
        host.scheduleTask(function(){
            if (!that.cancelled) that.callback.apply(that.scope, args);
        }, [], this.interval);
        return this;
    }

    cancel() {
        this.cancelled = true;
        return this;
    }
}


// TODO: move to Views
export function initViews(views: { [key: string]: View; }) {
    for (let viewName in views) views[viewName].init();
}

// TODO: move to Hardware
export function updateHwCtrlD2(hwCtrlName, d2: number) {
    var hwCtrl = state.device.hwCtrls[hwCtrlName];
    state.midiOut.sendMidi(hwCtrl.s, hwCtrl.d1, d2);
}

export function areDeepEqual(obj1, obj2) {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on step when comparing prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good a we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object beeing a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
