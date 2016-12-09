import ApiProxy from './ApiProxy';
import DeviceChain from './DeviceChain';


class CursorDeviceSlot extends DeviceChain {

}


/**
 * Instances of this interface represent the selected device slot as shown in the Bitwig Studio user interface.
 *
 * @since Bitwig Studio 1.1.6
 */
declare interface CursorDeviceSlot extends DeviceChain {
    /**
     * @param {string} slot
     */
    selectSlot(slot?: string): void;

}


export default CursorDeviceSlot;
