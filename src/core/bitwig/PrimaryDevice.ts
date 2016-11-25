import ApiProxy from './ApiProxy';
import Device from './Device';


class PrimaryDevice extends Device {

}


export declare enum DeviceType {
    ANY = 0,
}

export declare enum ChainLocation {
    FIRST = 0,
    NEXT = 1,
    PREVIOUS = 2,
    LAST = 3,
}


/**
 * A special kind of device that represents the primary device of a track.
 *
 * @since Bitwig Studio 1.0
 */
declare interface PrimaryDevice extends Device {
    DeviceType: DeviceType;
    ChainLocation: ChainLocation;

    /**
     * Makes the device with the given type and location the new primary device.
     *
     * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
     * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
     * @since Bitwig Studio 1.0
     */
    switchToDevice(deviceType?: DeviceType, chainLocation?: ChainLocation): void;

    /**
     * Registers an observer that reports if navigation to another device with the provided characteristics is possible.
     *
     * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
     * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
     * @param {function} callback a callback function the receives a single boolean parameter
     * @since Bitwig Studio 1.0
     */
    addCanSwitchToDeviceObserver(deviceType?: DeviceType, chainLocation?: ChainLocation, callback?: Function): void;

}


export default PrimaryDevice;
