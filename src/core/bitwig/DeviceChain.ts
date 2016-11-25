import ApiProxy from './ApiProxy';
import DeviceBank from './DeviceBank';
import BooleanValue from './BooleanValue';


class DeviceChain extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'createDeviceBank': DeviceBank,
        });
    }
}


/**
 * The foundation of all interfaces that contain devices, such as tracks, device layers, drum pads or FX slots.
 *
 * @since Bitwig Studio 1.1
 */
declare interface DeviceChain {
    /**
     * Returns a value object that indicates if the device chain exists, or if it has content.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.0
     */
    exists(): BooleanValue;

    /**
     * Selects the device chain in Bitwig Studio, in case it is a selectable object.
     *
     * @since Bitwig Studio 1.1
     */
    selectInEditor(): void;

    /**
     * Registers an observer that reports the name of the device chain, such as the track name or the drum pad name.
     *
     * @param {int} numChars the maximum number of characters used for the reported name
     * @param {string} textWhenUnassigned the default text that gets reported when the device chain is not associated with
                              an object in Bitwig Studio yet.
     * @param {function} callback a callback function that receives a single name parameter (string).
     * @since Bitwig Studio 1.0
     */
    addNameObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    /**
     * Registers an observer that reports if the device chain is selected in Bitwig Studio editors.
     *
     * @param {function} callback a callback function that takes a single boolean parameter.
     * @since Bitwig Studio 1.1
     */
    addIsSelectedInEditorObserver(callback?: Function): void;

    /**
     * Returns an object that provides bank-wise navigation of devices.
     *
     * @param {int} numDevices the number of devices should be accessible simultaneously
     * @return {DeviceBank} the requested device bank object
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    createDeviceBank(numDevices?: number): DeviceBank;

}


export default DeviceChain;
