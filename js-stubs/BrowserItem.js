/* API Version - 1.3.13 */

/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserItem() {}

/**
 * Registers an observer that reports if the item exists.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserItem.prototype.addExistsObserver = function(callback) {};

/**
 * Registers an observer that reports the string value of the browser item.
 *
 * @param {int} maxCharacters
 * @param {string} textWhenUnassigned
 * @param {function} callback a callback function that receives a single string argument
 * @since Bitwig Studio 1.2
 */
BrowserItem.prototype.addValueObserver = function(maxCharacters, textWhenUnassigned, callback) {};

/**
 * Returns an object that provides access to the selected state of the browser item.
 *
 * @return {BooleanValue} an boolean value object
 * @since Bitwig Studio 1.2
 */
BrowserItem.prototype.isSelected = function() {};
