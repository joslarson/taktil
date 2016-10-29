/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate the columns of a Bitwig Studio browser session.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserFilterColumnBank() {}

/**
 * Returns the window size that was used to configure the filter column during creation.
 *
 * @return {int} the size of the filter column.
 */
BrowserFilterColumnBank.prototype.getSize = function() {};

/**
 * Returns the filter column for the given index.
 *
 * @param {int} index the item index, must be in the range `[0..getSize-1]`
 * @return {BrowserFilterColumn} the requested filter column object
 */
BrowserFilterColumnBank.prototype.getItem = function(index) {};

/**
 * Scrolls the filter columns one item up.
 *
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.scrollUp = function() {};

/**
 * Scrolls the filter columns one item down.
 *
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.scrollDown = function() {};

/**
 * Scrolls the filter columns one page up.
 * For example if the bank is configured with a window size of 8 entries and is currently showing items
 * [1..8], calling this method would scroll the window to show columns [9..16].
 *
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the filter columns one page up.
 * For example if the bank is configured with a window size of 8 entries and is currently showing items
 * [9..16], calling this method would scroll the window to show columns [1..8].
 *
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.scrollPageDown = function() {};

/**
 * Registers an observer that reports the current scroll position, more specifically the position of the first
 * item within the underlying list of columns, that is shown as the first column within the window.
 *
 * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                the scroll position, or `-1` in case the column has no content.
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.addScrollPositionObserver = function(callback) {};

/**
 * Registers an observer that reports if the columns can be scrolled further up.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the columns can be scrolled further down.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.addCanScrollDownObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total count of columns
 * (not the size of the window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.2
 */
BrowserFilterColumnBank.prototype.addEntryCountObserver = function(callback) {};
