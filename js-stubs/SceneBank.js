/* API Version - 1.3.13 */

/**
 * A scene bank provides access to a range of scenes in Bitwig Studio.
 * Instances of scene bank are configured with a fixed number of scenes and represent an excerpt
 * of a larger list of scenes. Various methods are provided for scrolling to different sections
 * of the scene list. It basically acts like a window moving over the list of underlying scenes.
 * 
 * To receive an instance of scene bank call {@link com.bitwig.base.control_surface.iface.Host#createSceneBank}.
 *
 * @see {@link com.bitwig.base.control_surface.iface.Host#createSceneBank}
 * @since Bitwig Studio 1.1
 */
function SceneBank() {}

/**
 * Returns the scene at the given index within the bank.
 *
 * @param {int} indexInBank the scene index within this bank, not the index within the list of all Bitwig Studio
                   scenes. Must be in the range [0..sizeOfBank-1].
 * @return {Scene} the requested scene object
 * @since Bitwig Studio 1.1
 */
SceneBank.prototype.getScene = function(indexInBank) {};

/**
 * Scrolls the scenes one page up.
 *
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the scenes one page down.
 *
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.scrollPageDown = function() {};

/**
 * Scrolls the scenes one scene up.
 *
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.scrollUp = function() {};

/**
 * Scrolls the scenes one scene down.
 *
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.scrollDown = function() {};

/**
 * Makes the scene with the given position visible in the track bank.
 *
 * @param {int} position the position of the scene within the underlying full list of scenes
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.scrollTo = function(position) {};

/**
 * Registers an observer that reports the current scene scroll position.
 *
 * @param {function} callback a callback function that takes a single integer parameter
 * @param {int} valueWhenUnassigned the default value that gets reports when the track bank is not yet connected
                           to a Bitwig Studio document
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.addScrollPositionObserver = function(callback, valueWhenUnassigned) {};

/**
 * Registers an observer that reports if the scene window can be scrolled further up.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the scene window can be scrolled further down.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.addCanScrollDownObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total scene count
 * (not the number of scenes available in the bank window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.addSceneCountObserver = function(callback) {};

/**
 * Launches the scene with the given bank index.
 *
 * @param {int} indexInWindow the scene index within the bank, not the position of the scene withing the underlying full
                     list of scenes.
 * @since Bitwig Studio 1.0
 */
SceneBank.prototype.launchScene = function(indexInWindow) {};
