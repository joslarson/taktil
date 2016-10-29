/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate the available sessions in Bitwig Studio's contextual browser.
 * The sessions are shown as tabs in the graphical user interface of the browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowsingSessionBank() {}

/**
 * Returns the window size that was used to configure the session bank during creation.
 *
 * @return {int} the size of the session bank.
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.getSize = function() {};

/**
 * Returns the browser session for the given index.
 *
 * @param {int} index the session index, must be in the range `[0..getSize-1]`
 * @return {GenericBrowsingSession} the requested browser session object
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.getSession = function(index) {};

/**
 * Scrolls the browser sessions one item up.
 *
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.scrollUp = function() {};

/**
 * Scrolls the browser sessions one item down.
 *
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.scrollDown = function() {};

/**
 * Scrolls the browser sessions one page up.
 * For example if the bank is configured with a window size of 8 entries and is currently showing items
 * [1..8], calling this method would scroll the window to show items [9..16].
 *
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the filter columns one page up.
 * For example if the bank is configured with a window size of 8 entries and is currently showing items
 * [9..16], calling this method would scroll the window to show items [1..8].
 *
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.scrollPageDown = function() {};

/**
 * Registers an observer that reports the current scroll position, more specifically the position of the first
 * item within the underlying list of browser sessions, that is shown as the first session within the window.
 *
 * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                the scroll position, or `-1` in case the column has no content.
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.addScrollPositionObserver = function(callback) {};

/**
 * Registers an observer that reports if the browser sessions can be scrolled further up.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the browser sessions can be scrolled further down.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.addCanScrollDownObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total count of browser sessions
 * (not the size of the window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.2
 */
BrowsingSessionBank.prototype.addEntryCountObserver = function(callback) {};
