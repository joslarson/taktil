/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserFilterItemBank() {}

BrowserFilterItemBank.prototype = new BrowserItemBank();
BrowserFilterItemBank.prototype.constructor = BrowserFilterItemBank;

/**
 * Returns the filter item for the given index.
 *
 * @param {int} index the item index, must be in the range `[0..getSize-1]`
 * @return {BrowserFilterItem} the requested filter item object
 * @since Bitwig Studio 1.2
 */
BrowserFilterItemBank.prototype.getItem = function(index) {};
