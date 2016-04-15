/* API Version - 1.3.1 */

/**
 * A special kind of device that represents the primary device of a track.
 *
 * @since Bitwig Studio 1.0
 */
function PrimaryDevice() {}

PrimaryDevice.prototype = new Device();
PrimaryDevice.prototype.constructor = PrimaryDevice;

/**
 * Makes the device with the given type and location the new primary device.
 *
 * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
 * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
 * @since Bitwig Studio 1.0
 */
PrimaryDevice.prototype.switchToDevice = function(deviceType, chainLocation) {};

/**
 * Registers an observer that reports if navigation to another device with the provided characteristics is possible.
 *
 * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
 * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
 * @param {function} callback a callback function the receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
PrimaryDevice.prototype.addCanSwitchToDeviceObserver = function(deviceType, chainLocation, callback) {};


/**
 * An enum used to navigate the primary device within a device chain.
 *
 * @since Bitwig Studio 1.0
 */
PrimaryDevice.ChainLocation = {
	FIRST: 0,
	NEXT: 1,
	PREVIOUS: 2,
	LAST: 3,
};

/**
 * An enum used to specify different kinds of devices.
 *
 * @since Bitwig Studio 1.0
 */
PrimaryDevice.DeviceType = {
	ANY: 0,
};