import ApiProxy from './ApiProxy';
import DeviceChain from './DeviceChain';
import Device from './Device';


class DeviceBank extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getDeviceChain': DeviceChain,
            'getDevice': Device,
        });
    }
}


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
declare interface DeviceBank {
    /**
     * Returns the object that was used to instantiate this device bank.
     * Possible device chain instances are tracks, device layers, drums pads, or FX slots.
     *
     * @return {DeviceChain} the requested device chain object
     * @since Bitwig Studio 1.1
     */
    getDeviceChain(): DeviceChain;

    /**
     * Returns the device at the given index within the bank.
     *
     * @param {int} indexInBank the device index within this bank, not the position within the device chain.
                       Must be in the range [0..sizeOfBank-1].
     * @return {Device} the requested device object
     * @since Bitwig Studio 1.1
     */
    getDevice(indexInBank?: number): Device;

    /**
     * Scrolls the device window one page up.
     *
     * @since Bitwig Studio 1.1
     */
    scrollPageUp(): void;

    /**
     * Scrolls the device window one page down.
     *
     * @since Bitwig Studio 1.1
     */
    scrollPageDown(): void;

    /**
     * Scrolls the device window one device up.
     *
     * @since Bitwig Studio 1.1
     */
    scrollUp(): void;

    /**
     * Scrolls the device window one device down.
     *
     * @since Bitwig Studio 1.1
     */
    scrollDown(): void;

    /**
     * Makes the device with the given position visible in the track bank.
     *
     * @param {int} position the position of the device within the device chain
     * @since Bitwig Studio 1.1
     */
    scrollTo(position?: number): void;

    /**
     * Registers an observer that reports the current device scroll position.
     *
     * @param {function} callback a callback function that takes a single integer parameter
     * @param {int} valueWhenUnassigned the default value that gets reports when the device chain is not yet connected
                               to a Bitwig Studio document
     * @since Bitwig Studio 1.1
     */
    addScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

    /**
     * Registers an observer that reports if the device window can be scrolled further up.
     *
     * @param {function} callback a callback function that takes a single boolean parameter
     * @since Bitwig Studio 1.1
     */
    addCanScrollUpObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the device window can be scrolled further down.
     *
     * @param {function} callback a callback function that takes a single boolean parameter
     * @since Bitwig Studio 1.1
     */
    addCanScrollDownObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the total device count of the device chain
     * (not the number of devices accessible through the bank window).
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.1
     */
    addDeviceCountObserver(callback?: Function): void;

}


export default DeviceBank;
