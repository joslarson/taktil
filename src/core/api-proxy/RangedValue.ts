import ApiProxy from './ApiProxy';


class RangedValue extends ApiProxy {

}


/**
 * Instances of this interface represent numeric values that have an upper and lower limit.
 *
 * @since Bitwig Studio 1.0
 */
declare interface RangedValue {
    /**
     * Adds an observer which receives the normalized value of the parameter as an integer number
     * within the range [0..range-1].
     *
     * @param {int} range the range used to scale the value when reported to the callback
     * @param {function} callback a callback function that receives a single integer parameter
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    addValueObserver(range?: number, callback?: Function): void;

    /**
     * Sets the value in an absolute fashion. The value will be scaled according to the given resolution.
     *
     * Typically the resolution would be specified as the amount of steps the hardware control provides
     * (for example 128) and just pass the integer value as it comes from the MIDI device. The host application
     * will take care of scaling it.
     *
     * @param {number} value integer number in the range [0 .. resolution-1]
     * @param {number} resolution the resolution used for scaling
     * @throws ControlSurfaceException if passed-in parameters are null
     * @since Bitwig Studio 1.0
     */
    set(value?: number, resolution?: number): void;

    /**
     * Increments or decrements the value according to the given increment and resolution parameters.
     *
     * Typically the resolution would be specified as the amount of steps the hardware control provides
     * (for example 128) and just pass the integer value as it comes from the MIDI device. The host application
     * will take care of scaling it.
     *
     * @param {number} increment the amount that the current value is increased by
     * @param {number} resolution the resolution used for scaling
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    inc(increment?: number, resolution?: number): void;

    /**
     * Add an observer which receives the internal raw of the parameter as floating point.
     *
     * @param {function} callback a callback function that receives a single numeric parameter with double precision.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    addRawValueObserver(callback?: Function): void;

    /**
     * Set the internal (raw) value.
     *
     * @param {double} value the new value with double precision. Range is undefined.
     * @since Bitwig Studio 1.1
     */
    setRaw(value?: number): void;

    /**
     * Increments / decrements the internal (raw) value.
     *
     * @param {double} delta the amount that the current internal value get increased by.
     * @since Bitwig Studio 1.1
     */
    incRaw(delta?: number): void;

}


export default RangedValue;
