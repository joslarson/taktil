/* API Version - 1.3.13 */

/**
 * A generic interface used to implement actions or events that are not associated with a value.
 *
 * @since Bitwig Studio 1.1
 */
function Signal() {}

/**
 * Registers an observer that gets notified when the signal gets fired.
 *
 * @param {function} callback a callback function that does not receive any argument.
 * @since Bitwig Studio 1.1
 */
Signal.prototype.addSignalObserver = function(callback) {};

/**
 * Fires the action or event represented by the signal object.
 *
 * @since Bitwig Studio 1.1
 */
Signal.prototype.fire = function() {};
