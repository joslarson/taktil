/* API Version - 1.3.13 */

/**
 * This interface is used for navigation of controller chains in Bitwig Studio.
 * Instances are configured with a fixed number of controllers and provide access to a excerpt
 * of the controllers inside a controller chain. Various methods are provided for scrolling to different sections
 * of the controller chain. It basically acts like a window moving over the controllers.
 * 
 * To receive an instance of ControllerBank call {@link Track#createControllerBank}.
 *
 * @see {@link Track#createControllerBank}
 * @since Bitwig Studio 1.1
 */
function ControllerBank() {}

/**
 * Returns the object that was used to instantiate this controller bank.
 * Possible controller chain instances are tracks, controller layers, drums pads, or FX slots.
 *
 * @return {ControllerChain} the requested controller chain object
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.getControllerChain = function() {};

/**
 * Returns the controller at the given index within the bank.
 *
 * @param {int} indexInBank the controller index within this bank, not the position within the controller chain.
                   Must be in the range [0..sizeOfBank-1].
 * @return {Controller} the requested controller object
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.getController = function(indexInBank) {};

/**
 * Scrolls the controller window one page up.
 *
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the controller window one page down.
 *
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.scrollPageDown = function() {};

/**
 * Scrolls the controller window one controller up.
 *
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.scrollUp = function() {};

/**
 * Scrolls the controller window one controller down.
 *
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.scrollDown = function() {};

/**
 * Makes the controller with the given position visible in the track bank.
 *
 * @param {int} position the position of the controller within the controller chain
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.scrollTo = function(position) {};

/**
 * Registers an observer that reports the current controller scroll position.
 *
 * @param {function} callback a callback function that takes a single integer parameter
 * @param {int} valueWhenUnassigned the default value that gets reports when the controller chain is not yet connected
                           to a Bitwig Studio document
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.addScrollPositionObserver = function(callback, valueWhenUnassigned) {};

/**
 * Registers an observer that reports if the controller window can be scrolled further up.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the controller window can be scrolled further down.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.addCanScrollDownObserver = function(callback) {};

/**
 * Registers an observer that reports the total controller count of the controller chain
 * (not the number of controllers accessible through the bank window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.1
 */
ControllerBank.prototype.addControllerCountObserver = function(callback) {};
