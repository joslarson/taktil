import ApiProxy from './ApiProxy';


import DeviceChain from './DeviceChain';
import AutomatableRangedValue from './AutomatableRangedValue';
import Value from './Value';
import BooleanValue from './BooleanValue';
import SoloValue from './SoloValue';


class Channel extends DeviceChain {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getVolume': AutomatableRangedValue,
            'getPan': AutomatableRangedValue,
            'getMute': Value,
            'getSolo': SoloValue,
            'getSend': AutomatableRangedValue,
        });
    }
}


/**
 * This interface defines access to the common attributes and operations of channels, such as tracks or nested
 * device channels.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Channel extends DeviceChain {
    /**
     * Returns an object that represents the activated state of the channel.
     *
     * @return {BooleanValue} an object that provides access to the channels activated state.
     * @since Bitwig Studio 1.1.1
     */
    isActivated(): BooleanValue;

    /**
     * Gets a representation of the channels volume control.
     *
     * @return {AutomatableRangedValue} an object that provides access to the channels volume control.
     * @since Bitwig Studio 1.0
     */
    getVolume(): AutomatableRangedValue;

    /**
     * Gets a representation of the channels pan control.
     *
     * @return {AutomatableRangedValue} an object that provides access to the channels pan control.
     * @since Bitwig Studio 1.0
     */
    getPan(): AutomatableRangedValue;

    /**
     * Gets a representation of the channels mute control.
     *
     * @return {Value} an object that provides access to the channels mute control.
     * @since Bitwig Studio 1.0
     */
    getMute(): Value;

    /**
     * Gets a representation of the channels solo control.
     *
     * @return {SoloValue} an object that provides access to the channels solo control.
     * @since Bitwig Studio 1.0
     */
    getSolo(): SoloValue;

    /**
     * Registers an observer for the VU-meter of this track.
     *
     * @param {int} range the number of steps to which the reported values should be scaled. For example a range of 128 would
                 cause the callback to be called with values between 0 and 127.
     * @param {int} channel 0 for left channel, 1 for right channel, -1 for the sum of both
     * @param {boolean} peak when `true` the peak value is reported, otherwise the RMS value
     * @param {function} callback a callback function that takes a single numeric argument. The value is in the range [0..range-1].
     * @throws com.bitwig.base.control_surface.ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    addVuMeterObserver(range?: number, channel?: number, peak?: boolean, callback?: Function): void;

    /**
     * Registers an observer that reports notes when they are played on the channel.
     *
     * @param {function} callback a callback function that receives three parameters:
                    1. on/off state (boolean), 2. key (int), and 3. velocity (float).
     * @since Bitwig Studio 1.0
     */
    addNoteObserver(callback?: Function): void;

    /**
     * Registers an observer that receives notifications about the color of the channel.
     * The callback gets called at least once immediately after this function call to report the current color.
     * Additional calls are fired each time the color changes.
     *
     * @param {function} callback a callback function that receives three float parameters in the range [0..1]:
                    1. red, 2. green, and 3. blue.
     * @since Bitwig Studio 1.0
     */
    addColorObserver(callback?: Function): void;

    /**
     * Gets a representation of the channels send control at the given index.
     *
     * @param {int} index the index of the send, must be valid
     * @return {AutomatableRangedValue} an object that provides access to the requested send control.
     * @since Bitwig Studio 1.0
     */
    getSend(index?: number): AutomatableRangedValue;

    /**
     * Selects the device chain in the Bitwig Studio mixer, in case it is a selectable object.
     *
     * @since Bitwig Studio 1.1.1
     */
    selectInMixer(): void;

    /**
     * Registers an observer that reports if the device chain is selected in Bitwig Studio mixer.
     *
     * @param {function} callback a callback function that takes a single boolean parameter.
     * @since Bitwig Studio 1.1.1
     */
    addIsSelectedInMixerObserver(callback?: Function): void;

}


export default Channel;
