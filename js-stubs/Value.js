/* API Version - 1.3.13 */

/**
 * The common interface that is shared by all value objects in the controller API.
 *
 * @since Bitwig Studio 1.1
 */
function Value() {}

/**
 * Registers an observer that reports the current value.
 *
 * @param {function} callback a callback function that receives a single parameter
 * @since Bitwig Studio 1.0
 */
Value.prototype.addValueObserver = function(callback) {};
