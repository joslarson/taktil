/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate the results column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserResultsItemBank() {}

BrowserResultsItemBank.prototype = new BrowserItemBank();
BrowserResultsItemBank.prototype.constructor = BrowserResultsItemBank;

/**
 * Returns the result item for the given index.
 *
 * @param {int} index the item index, must be in the range `[0..getSize-1]`
 * @return {BrowserResultsItem} the requested results item object
 * @since Bitwig Studio 1.2
 */
BrowserResultsItemBank.prototype.getItem = function(index) {};
