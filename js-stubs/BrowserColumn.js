/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserColumn() {}

/**
 * Registers an observer that reports if the column exists.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserColumn.prototype.addExistsObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total count of column entries
 * (not the size of the column window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.2
 */
BrowserColumn.prototype.addEntryCountObserver = function(callback) {};

/**
 * Returns the cursor item, which can be used to navigate over the list of entries.
 *
 * @return {BrowserItem} the requested filter item object
 * @since Bitwig Studio 1.2
 */
BrowserColumn.prototype.createCursorItem = function() {};

/**
 * Returns an object that provides access to a bank of successive entries using a window configured with the
 * given size, that can be scrolled over the list of entries.
 *
 * @param {int} size the number of simultaneously accessible items
 * @return {BrowserItemBank} the requested item bank object
 */
BrowserColumn.prototype.createItemBank = function(size) {};
