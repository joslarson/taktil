/* API Version - 1.3.13 */

/**
 * Instances of this interface implement the {@link Value} interface for string values.
 *
 * @since Bitwig Studio 1.1
 */
function StringValue() {}

StringValue.prototype = new Value();
StringValue.prototype.constructor = StringValue;

/**
 * Sets the value object to the given string.
 *
 * @param {string} value the new value string
 * @since Bitwig Studio 1.1
 */
StringValue.prototype.set = function(value) {};
