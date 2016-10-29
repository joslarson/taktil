/* API Version - 1.3.13 */

/**
 * Instances of this interface represent beat time values.
 *
 * @since Bitwig Studio 1.0
 */
function BeatTime() {}

BeatTime.prototype = new RangedValue();
BeatTime.prototype.constructor = BeatTime;

/**
 * Registers an observer that reports the internal beat time value as formatted text, for example "012:03:00:01".
 *
 * @param {string} separator the character used to separate the segments of the formatted beat time, typically ":", "." or "-"
 * @param {int} barsLen the number of digits reserved for bars
 * @param {int} beatsLen the number of digits reserved for beats
 * @param {int} subdivisionLen the number of digits reserved for beat subdivisions
 * @param {int} ticksLen the number of digits reserved for ticks
 * @param {function} callback a callback function that receives a single string parameter
 * @since Bitwig Studio 1.0
 */
BeatTime.prototype.addTimeObserver = function(separator, barsLen, beatsLen, subdivisionLen, ticksLen, callback) {};

/**
 * Adds an observer which receives the internal raw value of the parameter as floating point value.
 *
 * @param {function} callback a callback function that receives a single floating point parameter with double precision.
 * @since Bitwig Studio 1.0
 */
BeatTime.prototype.addRawValueObserver = function(callback) {};

/**
 * Sets the internal (raw) value.
 *
 * @param {double} value a numeric value with double-precision. Range is undefined.
 * @since Bitwig Studio 1.0
 */
BeatTime.prototype.setRaw = function(value) {};

/**
 * Increments / decrements the internal (raw) value by the given delta.
 *
 * @param {double} delta the amount that gets added to the internal value.
 * @since Bitwig Studio 1.0
 */
BeatTime.prototype.incRaw = function(delta) {};
