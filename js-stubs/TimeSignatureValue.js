/* API Version - 1.3.13 */

/**
 * Instances of this interface represent time signature values.
 *
 * @since Bitwig Studio 1.1
 */
function TimeSignatureValue() {}

TimeSignatureValue.prototype = new Value();
TimeSignatureValue.prototype.constructor = TimeSignatureValue;

/**
 * Updates the time signature according to the given string.
 *
 * @param {string} name a textual representation of the new time signature value, formatted as
            `numerator/denominator[, ticks]`
 * @since Bitwig Studio 1.1
 */
TimeSignatureValue.prototype.set = function(name) {};

/**
 * Returns an object that provides access to the time signature numerator.
 *
 * @return {IntegerValue} an integer value object that represents the time signature numerator.
 * @since Bitwig Studio 1.1
 */
TimeSignatureValue.prototype.getNumerator = function() {};

/**
 * Returns an object that provides access to the time signature denominator.
 *
 * @return {IntegerValue} an integer value object that represents the time signature denominator.
 * @since Bitwig Studio 1.1
 */
TimeSignatureValue.prototype.getDenominator = function() {};

/**
 * Returns an object that provides access to the time signature tick subdivisions.
 *
 * @return {IntegerValue} an integer value object that represents the time signature ticks.
 * @since Bitwig Studio 1.1
 */
TimeSignatureValue.prototype.getTicks = function() {};
