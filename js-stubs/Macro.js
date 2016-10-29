/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to represent macro controls in Bitwig Studio to controllers.
 *
 * @since Bitwig Studio 1.0
 */
function Macro() {}

/**
 * Returns an object that provides access to the control value of the macro.
 *
 * @return {AutomatableRangedValue} a ranged value object.
 * @since Bitwig Studio 1.0
 */
Macro.prototype.getAmount = function() {};

/**
 * Returns an object that provides access to the modulation source of the macro.
 *
 * @return {ModulationSource} a modulation source object.
 * @since Bitwig Studio 1.0
 */
Macro.prototype.getModulationSource = function() {};

/**
 * Registers an observer that reports the label of the macro control.
 *
 * @param {int} numChars the maximum number of characters of the reported label
 * @param {string} textWhenUnassigned the default text that is reported when the macro is not connected to a
                          Bitwig Studio macro control.
 * @param {function} callback a callback function that receives a single string parameter.
 */
Macro.prototype.addLabelObserver = function(numChars, textWhenUnassigned, callback) {};
