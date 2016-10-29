/* API Version - 1.3.13 */

/**
 * Instances of this interface represent integer values.
 *
 * @since Bitwig Studio 1.0
 */
function IntegerValue() {}

IntegerValue.prototype = new Value();
IntegerValue.prototype.constructor = IntegerValue;

/**
 * Sets the internal value.
 *
 * @param {int} value the new integer value.
 * @since Bitwig Studio 1.1
 */
IntegerValue.prototype.set = function(value) {};

/**
 * Increases/decrease the internal value by the given amount.
 *
 * @param {int} amount the integer amount to increase
 * @since Bitwig Studio 1.1
 */
IntegerValue.prototype.inc = function(amount) {};
