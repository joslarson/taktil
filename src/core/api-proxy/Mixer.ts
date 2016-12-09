import ApiProxy from './ApiProxy';
import BooleanValue from './BooleanValue';


class Mixer extends ApiProxy {

}


/**
 * An interface used to access various commands that can be performed on the Bitwig Studio mixer panel.<br/>
 *
 * To get an instance of the mixer interface call {@link Host#createMixer}.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Mixer {
    /**
     * Gets an object that allows to show/hide the meter section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the meter section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the meter section visibility
     * @since Bitwig Studio 1.1
     */
    isMeterSectionVisible(): BooleanValue;

    /**
     * Gets an object that allows to show/hide the io section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the io section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the io section visibility
     * @since Bitwig Studio 1.1
     */
    isIoSectionVisible(): BooleanValue;

    /**
     * Gets an object that allows to show/hide the sends section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the sends section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the sends section visibility
     * @since Bitwig Studio 1.1
     */
    isSendSectionVisible(): BooleanValue;

    /**
     * Gets an object that allows to show/hide the clip launcher section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the clip launcher section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the clip launcher section visibility
     * @since Bitwig Studio 1.1
     */
    isClipLauncherSectionVisible(): BooleanValue;

    /**
     * Gets an object that allows to show/hide the devices section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the devices section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the devices section visibility
     * @since Bitwig Studio 1.1
     */
    isDeviceSectionVisible(): BooleanValue;

    /**
     * Gets an object that allows to show/hide the cross-fade section of the mixer panel. Observers can be registered on
     * the returned object for receiving notifications when the cross-fade section switches between shown and hidden state.
     *
     * @return {BooleanValue} a boolean value object that represents the cross-fade section visibility
     * @since Bitwig Studio 1.1
     */
    isCrossFadeSectionVisible(): BooleanValue;

}


export default Mixer;
