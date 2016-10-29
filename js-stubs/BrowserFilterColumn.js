/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserFilterColumn() {}

BrowserFilterColumn.prototype = new BrowserColumn();
BrowserFilterColumn.prototype.constructor = BrowserFilterColumn;

/**
 * Returns the filter item that represents the top-level all/any/everything wildcard item.
 *
 * @return {BrowserFilterItem} the requested filter item object
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumn.prototype.getWildcardItem = function() {};

/**
 * Returns the cursor filter item, which can be used to navigate over the list of entries.
 *
 * @return {BrowserFilterItem} the requested filter item object
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumn.prototype.createCursorItem = function() {};

/**
 * Returns an object that provides access to a bank of successive entries using a window configured with the
 * given size, that can be scrolled over the list of entries.
 *
 * @param {int} size the number of simultaneously accessible items
 * @return {BrowserFilterItemBank} the requested item bank object
 */
BrowserFilterColumn.prototype.createItemBank = function(size) {};

/**
 * Registers an observer that reports the name of the filter column.
 *
 * @param {int} maxCharacters
 * @param {string} textWhenUnassigned
 * @param {function} callback
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumn.prototype.addNameObserver = function(maxCharacters, textWhenUnassigned, callback) {};
