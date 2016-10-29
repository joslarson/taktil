/* API Version - 1.3.13 */

/**
 * The foundation of all interfaces that contain controllers, such as tracks, controller layers, drum pads or FX slots.
 *
 * @since Bitwig Studio 1.1
 */
function ControllerChain() {}

/**
 * Returns a value object that indicates if the controller chain exists, or if it has content.
 *
 * @return {BooleanValue} a boolean value object
 * @since Bitwig Studio 1.0
 */
ControllerChain.prototype.exists = function() {};

/**
 * Selects the controller chain in Bitwig Studio, in case it is a selectable object.
 *
 * @since Bitwig Studio 1.1
 */
ControllerChain.prototype.selectInEditor = function() {};

/**
 * Registers an observer that reports the name of the controller chain, such as the track name or the drum pad name.
 *
 * @param {int} numChars the maximum number of characters used for the reported name
 * @param {string} textWhenUnassigned the default text that gets reported when the controller chain is not associated with
                          an object in Bitwig Studio yet.
 * @param {function} callback a callback function that receives a single name parameter (string).
 * @since Bitwig Studio 1.0
 */
ControllerChain.prototype.addNameObserver = function(numChars, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports if the controller chain is selected in Bitwig Studio editors.
 *
 * @param {function} callback a callback function that takes a single boolean parameter.
 * @since Bitwig Studio 1.1
 */
ControllerChain.prototype.addIsSelectedInEditorObserver = function(callback) {};

/**
 * Returns an object that provides bank-wise navigation of controllers.
 *
 * @param {int} numControllers the number of controllers should be accessible simultaneously
 * @return {ControllerBank} the requested controller bank object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
ControllerChain.prototype.createControllerBank = function(numControllers) {};
