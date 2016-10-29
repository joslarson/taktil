/* API Version - 1.3.13 */

/**
 * A special kind of controller that represents the primary controller of a track.
 *
 * @since Bitwig Studio 1.0
 */
function PrimaryController() {}

PrimaryController.prototype = new Controller();
PrimaryController.prototype.constructor = PrimaryController;

/**
 * Makes the controller with the given type and location the new primary controller.
 *
 * @param {PrimaryController.ControllerType} controllerType the requested controller type of the new primary controller
 * @param {PrimaryController.ChainLocation} chainLocation the requested chain location of the new primary controller
 * @since Bitwig Studio 1.0
 */
PrimaryController.prototype.switchToController = function(controllerType, chainLocation) {};

/**
 * Registers an observer that reports if navigation to another controller with the provided characteristics is possible.
 *
 * @param {PrimaryController.ControllerType} controllerType the requested controller type of the new primary controller
 * @param {PrimaryController.ChainLocation} chainLocation the requested chain location of the new primary controller
 * @param {function} callback a callback function the receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
PrimaryController.prototype.addCanSwitchToControllerObserver = function(controllerType, chainLocation, callback) {};


/**
 * An enum used to navigate the primary controller within a controller chain.
 *
 * @since Bitwig Studio 1.0
 */
PrimaryController.ChainLocation = {
	FIRST: 0,
	NEXT: 1,
	PREVIOUS: 2,
	LAST: 3,
};

/**
 * An enum used to specify different kinds of controllers.
 *
 * @since Bitwig Studio 1.0
 */
PrimaryController.ControllerType = {
	ANY: 0,
};