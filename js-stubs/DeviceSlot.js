/* API Version - 1.3.13 */

/**
 * Instances of this interface represent nested FX slots in devices.
 *
 * @since Bitwig Studio 1.1
 */
function DeviceSlot() {}

DeviceSlot.prototype = new DeviceChain();
DeviceSlot.prototype.constructor = DeviceSlot;
