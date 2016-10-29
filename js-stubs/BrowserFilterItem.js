/* API Version - 1.3.13 */

/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
function BrowserFilterItem() {}

BrowserFilterItem.prototype = new BrowserItem();
BrowserFilterItem.prototype.constructor = BrowserFilterItem;

/**
 * Registers an observer that reports the hit count of the filter item.
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.2
 */
BrowserFilterItem.prototype.addHitCountObserver = function(callback) {};
