/* API Version - 1.3.13 */

/**
 * Instances of this interface represent scenes in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
function Scene() {}

/**
 * Returns a value object that indicates if the scene exists.
 *
 * @return {Value} a boolean value object
 * @since Bitwig Studio 1.1
 */
Scene.prototype.exists = function() {};

/**
 * Launches the scene.
 *
 * @since Bitwig Studio 1.1
 */
Scene.prototype.launch = function() {};

/**
 * Returns an object that provides access to the name of the scene.
 *
 * @return {StringValue} a string value object that represents the scene name.
 * @since Bitwig Studio 1.1
 */
Scene.prototype.getName = function() {};

/**
 * Registers an observer that reports the position of the scene within the list of Bitwig Studio scenes.
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.1
 */
Scene.prototype.addPositionObserver = function(callback) {};

/**
 * Registers an observer that reports if the scene is selected in Bitwig Studio.
 *
 * @param {function} callback a callback function that takes a single boolean parameter.
 * @since Bitwig Studio 1.1
 */
Scene.prototype.addIsSelectedInEditorObserver = function(callback) {};

/**
 * Selects the scene in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
Scene.prototype.selectInEditor = function() {};

/**
 * Makes the scene visible in the Bitwig Studio user interface.
 *
 * @since Bitwig Studio 1.1
 */
Scene.prototype.showInEditor = function() {};
