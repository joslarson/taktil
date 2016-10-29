/* API Version - 1.3.13 */

/**
 * Instances of this interface represent boolean values.
 *
 * @since Bitwig Studio 1.0
 */
function BooleanValue() {}

BooleanValue.prototype = new Value();
BooleanValue.prototype.constructor = BooleanValue;

/**
 * Sets the internal value.
 *
 * @param {boolean} value the new boolean value.
 * @since Bitwig Studio 1.0
 */
BooleanValue.prototype.set = function(value) {};

/**
 * Toggles the current state. In case the current value is `false`, the new value will be `true` and
 * the other way round.
 *
 * @since Bitwig Studio 1.0
 */
BooleanValue.prototype.toggle = function() {};
