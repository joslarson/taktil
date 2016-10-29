/* API Version - 1.3.13 */

/**
 * Instances of this interface represent enumeration values. Enum values work similar to string values,
 * but are limited to a fixed set of value options.
 *
 * @since Bitwig Studio 1.0
 */
function EnumValue() {}

EnumValue.prototype = new Value();
EnumValue.prototype.constructor = EnumValue;

/**
 * Sets the value to the enumeration item with the given name.
 *
 * @param {string} name the name of the new enum item
 * @since Bitwig Studio 1.0
 */
EnumValue.prototype.set = function(name) {};
