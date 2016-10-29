/* API Version - 1.3.13 */

/**
 * This interface builds the foundation for storing custom settings in Bitwig Studio documents or in the
 * Bitwig Studio preferences.
 *
 * @since Bitwig Studio 1.1
 */
function Settings() {}

/**
 * Returns a signal setting object, which is shown a push button with the given label in Bitwig Studio.
 *
 * @param {string} label the name of the setting, must not be `null`
 * @param {string} category the name of the category, may be `null`
 * @param {string} action the action string as displayed on the related Bitwig Studio button, must not be `null`
 * @return {Signal} the object that encapsulates the requested signal
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Settings.prototype.getSignalSetting = function(label, category, action) {};

/**
 * Returns a numeric setting that is shown a number field in Bitwig Studio.
 *
 * @param {string} label the name of the setting, must not be `null`
 * @param {string} category the name of the category, may be `null`
 * @param {double} minValue the minimum value that the user is allowed to enter
 * @param {double} maxValue the minimum value that the user is allowed to enter
 * @param {double} stepResolution the step resolution used for the number field
 * @param {string} unit the string that should be used to display the unit of the number
 * @param {double} initialValue the initial numeric value of the setting
 * @return {RangedValue} the object that encapsulates the requested numeric setting
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Settings.prototype.getNumberSetting = function(label, category, minValue, maxValue, stepResolution, unit, initialValue) {};

/**
 * Returns an enumeration setting that is shown either as a chooser or as a button group in Bitwig Studio,
 * depending on the number of provided options.
 *
 * @param {string} label the name of the setting, must not be `null`
 * @param {string} category the name of the category, may be `null`
 * @param {String[]} options the string array that defines the allowed options for the button group or chooser
 * @param {string} initialValue the initial string value, must be one of the items specified with the option argument
 * @return {EnumValue} the object that encapsulates the requested enum setting
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Settings.prototype.getEnumSetting = function(label, category, options, initialValue) {};

/**
 * Returns a textual setting that is shown as a text field in the Bitwig Studio user interface.
 *
 * @param {string} label the name of the setting, must not be `null`
 * @param {string} category the name of the category, may be `null`
 * @param {int} numChars the maximum number of character used for the text value
 * @param {string} initialText the initial text value of the setting
 * @return {StringValue} the object that encapsulates the requested string setting
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Settings.prototype.getStringSetting = function(label, category, numChars, initialText) {};
