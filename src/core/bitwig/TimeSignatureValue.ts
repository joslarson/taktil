import ApiProxy from './ApiProxy';
import Value from './Value';
import IntegerValue from './IntegerValue';


class TimeSignatureValue extends Value {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getNumerator': IntegerValue,
            'getDenominator': IntegerValue,
            'getTicks': IntegerValue,
        });
    }
}


/**
 * Instances of this interface represent time signature values.
 *
 * @since Bitwig Studio 1.1
 */
declare interface TimeSignatureValue extends Value {
    /**
     * Updates the time signature according to the given string.
     *
     * @param {string} name a textual representation of the new time signature value, formatted as
                `numerator/denominator[, ticks]`
     * @since Bitwig Studio 1.1
     */
    set(name?: string): void;

    /**
     * Returns an object that provides access to the time signature numerator.
     *
     * @return {IntegerValue} an integer value object that represents the time signature numerator.
     * @since Bitwig Studio 1.1
     */
    getNumerator(): IntegerValue;

    /**
     * Returns an object that provides access to the time signature denominator.
     *
     * @return {IntegerValue} an integer value object that represents the time signature denominator.
     * @since Bitwig Studio 1.1
     */
    getDenominator(): IntegerValue;

    /**
     * Returns an object that provides access to the time signature tick subdivisions.
     *
     * @return {IntegerValue} an integer value object that represents the time signature ticks.
     * @since Bitwig Studio 1.1
     */
    getTicks(): IntegerValue;

}


export default TimeSignatureValue;
