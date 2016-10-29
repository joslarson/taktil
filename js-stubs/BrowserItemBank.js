/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserItemBank() {}

/**
 * Returns the window size that was used to configure the filter column during creation.
 *
 * @return {int} the size of the filter column.
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.getSize = function() {};

/**
 * Returns the item for the given index.
 *
 * @param {int} index the item index, must be in the range `[0..getSize-1]`
 * @return {BrowserItem} the requested item object
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.getItem = function(index) {};

/**
 * Scrolls the filter column entries one item up.
 *
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.scrollUp = function() {};

/**
 * Scrolls the filter column entries one item down.
 *
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.scrollDown = function() {};

/**
 * Scrolls the filter column entries one page up.
 * For example if the column is configured with a window size of 8 entries and is currently showing items
 * [1..8], calling this method would scroll the column to show items [9..16].
 *
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the filter column entries one page up.
 * For example if the column is configured with a window size of 8 entries and is currently showing items
 * [9..16], calling this method would scroll the column to show items [1..8].
 *
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.scrollPageDown = function() {};

/**
 * Registers an observer that reports the current scroll position, more specifically the position of the first
 * item within the underlying list of entries, that is shown as the first entry within the window.
 *
 * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                the scroll position, or `-1` in case the column has no content.
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.addScrollPositionObserver = function(callback) {};

/**
 * Registers an observer that reports if the column entries can be scrolled further up.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the column entries can be scrolled further down.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowserItemBank.prototype.addCanScrollDownObserver = function(callback) {};
