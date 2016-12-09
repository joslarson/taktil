import ApiProxy from './ApiProxy';
import RangedValue from './RangedValue';


class BeatTime extends RangedValue {

}


/**
 * Instances of this interface represent beat time values.
 *
 * @since Bitwig Studio 1.0
 */
declare interface BeatTime extends RangedValue {
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
    addTimeObserver(separator?: string, barsLen?: number, beatsLen?: number, subdivisionLen?: number, ticksLen?: number, callback?: Function): void;

    /**
     * Adds an observer which receives the internal raw value of the parameter as floating point value.
     *
     * @param {function} callback a callback function that receives a single floating point parameter with double precision.
     * @since Bitwig Studio 1.0
     */
    addRawValueObserver(callback?: Function): void;

    /**
     * Sets the internal (raw) value.
     *
     * @param {double} value a numeric value with double-precision. Range is undefined.
     * @since Bitwig Studio 1.0
     */
    setRaw(value?: number): void;

    /**
     * Increments / decrements the internal (raw) value by the given delta.
     *
     * @param {double} delta the amount that gets added to the internal value.
     * @since Bitwig Studio 1.0
     */
    incRaw(delta?: number): void;

}


export default BeatTime;
