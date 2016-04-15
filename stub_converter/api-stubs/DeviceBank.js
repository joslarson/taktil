/* API Version - 1.3.1 */

/**
 * This interface is used for navigation of device chains in Bitwig Studio.
 * Instances are configured with a fixed number of devices and provide access to a excerpt
 * of the devices inside a device chain. Various methods are provided for scrolling to different sections
 * of the device chain. It basically acts like a window moving over the devices.
 * 
 * To receive an instance of DeviceBank call {@link Track#createDeviceBank}.
 *
 * @see {@link Track#createDeviceBank}
 * @since Bitwig Studio 1.1
 */
function DeviceBank() {}

/**
 * Returns the object that was used to instantiate this device bank.
 * Possible device chain instances are tracks, device layers, drums pads, or FX slots.
 *
 * @return {DeviceChain} the requested device chain object
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.getDeviceChain = function() {};

/**
 * Returns the device at the given index within the bank.
 *
 * @param {int} indexInBank the device index within this bank, not the position within the device chain.
                   Must be in the range [0..sizeOfBank-1].
 * @return {Device} the requested device object
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.getDevice = function(indexInBank) {};

/**
 * Scrolls the device window one page up.
 *
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.scrollPageUp = function() {};

/**
 * Scrolls the device window one page down.
 *
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.scrollPageDown = function() {};

/**
 * Scrolls the device window one device up.
 *
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.scrollUp = function() {};

/**
 * Scrolls the device window one device down.
 *
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.scrollDown = function() {};

/**
 * Makes the device with the given position visible in the track bank.
 *
 * @param {int} position the position of the device within the device chain
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.scrollTo = function(position) {};

/**
 * Registers an observer that reports the current device scroll position.
 *
 * @param {function} callback a callback function that takes a single integer parameter
 * @param {int} valueWhenUnassigned the default value that gets reports when the device chain is not yet connected
                           to a Bitwig Studio document
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.addScrollPositionObserver = function(callback, valueWhenUnassigned) {};

/**
 * Registers an observer that reports if the device window can be scrolled further up.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.addCanScrollUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the device window can be scrolled further down.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.addCanScrollDownObserver = function(callback) {};

/**
 * Registers an observer that reports the total device count of the device chain
 * (not the number of devices accessible through the bank window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.1
 */
DeviceBank.prototype.addDeviceCountObserver = function(callback) {};
