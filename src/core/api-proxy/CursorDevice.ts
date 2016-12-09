import ApiProxy from './ApiProxy';
import Channel from './Channel';
import Cursor from './Cursor';
import Device from './Device';


class CursorDevice extends Cursor {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': Channel,
        });
    }
}


/**
 * A special kind of selection cursor used for devices.
 *
 * @since Bitwig Studio 1.1
 */
declare interface CursorDevice extends Cursor {
    /**
     * Returns the channel that this cursor device was created on.
     * Currently this will always be a track or cursor track instance.
     *
     * @return {Channel} the track or cursor track object that was used for creation of this cursor device.
     * @since Bitwig Studio 1.1
     */
    getChannel(): Channel;

    /**
     * Selects the parent device if there is any.
     *
     * @since Bitwig Studio 1.1
     */
    selectParent(): void;

    /**
     * Moves this cursor to the given device.
     *
     * @param {Device} device the device that this cursor should point to
     * @since Bitwig Studio 1.1
     */
    selectDevice(device?: Device): void;

    /**
     * Selects the first device in the given channel.
     *
     * @param {Channel} channel the channel in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectFirstInChannel(channel?: Channel): void;

    /**
     * Selects the last device in the given channel.
     *
     * @param {Channel} channel the channel in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectLastInChannel(channel?: Channel): void;

    /**
     * Selects the first device in the nested FX slot with the given name.
     *
     * @param {string} chain the name of the FX slot in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectFirstInSlot(chain?: string): void;

    /**
     * Selects the last device in the nested FX slot with the given name.
     *
     * @param {string} chain the name of the FX slot in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectLastInSlot(chain?: string): void;

    /**
     * Selects the first device in the drum pad associated with the given key.
     *
     * @param {int} key the key associated with the drum pad in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectFirstInKeyPad(key?: number): void;

    /**
     * Selects the last device in the drum pad associated with the given key.
     *
     * @param {int} key the key associated with the drum pad in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectLastInKeyPad(key?: number): void;

    /**
     * Selects the first device in the nested layer with the given index.
     *
     * @param {int} index the index of the nested layer in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectFirstInLayer(index?: number): void;

    /**
     * Selects the last device in the nested layer with the given index.
     *
     * @param {int} index the index of the nested layer in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectLastInLayer(index?: number): void;

    /**
     * Selects the first device in the nested layer with the given name.
     *
     * @param {string} name the name of the nested layer in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectFirstInLayer(name?: string): void;

    /**
     * Selects the last device in the nested layer with the given name.
     *
     * @param {string} name the name of the nested layer in which the device should be selected
     * @since Bitwig Studio 1.1
     */
    selectLastInLayer(name?: string): void;

}


export default CursorDevice;
