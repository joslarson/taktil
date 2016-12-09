import ApiProxy from './ApiProxy';

import RangedValue from './RangedValue';


class AutomatableRangedValue extends RangedValue {

}


/**
 * Instances of this interface represent ranged parameters that can be controlled with automation in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
declare interface AutomatableRangedValue extends RangedValue {
    /**
     * Adds an observer which reports changes to the name of the automated parameter. The callback will get called
     * at least once immediately after calling this method for reporting the current name.
     *
     * @param {int} maxChars maximum length of the string sent to the observer
     * @param {string} textWhenUnassigned the default text to use
     * @param {function} callback a callback function that receives a single string parameter
     * @since Bitwig Studio 1.0
     */
    addNameObserver(maxChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    /**
     * Adds an observer which sends a formatted text representation of the value whenever the value changes.
     * The callback will get called at least once immediately after calling this method for reporting the current state.
     *
     * @param {int} maxChars maximum length of the string sent to the observer
     * @param {string} textWhenUnassigned the default text to use
     * @param {function} callback a callback function that receives a single string parameter
     * @since Bitwig Studio 1.0
     */
    addValueDisplayObserver(maxChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    /**
     * Resets the value to its default.
     *
     * @since Bitwig Studio 1.0
     */
    reset(): void;

    /**
     * Touch (or un-touch) the value for automation recording.
     *
     * @param {boolean} isBeingTouched `true` for touching, `false` for un-touching
     * @since Bitwig Studio 1.0
     */
    touch(isBeingTouched?: boolean): void;

    /**
     * Specifies if this value should be indicated as mapped in Bitwig Studio, which is visually shown as colored dots
     * or tinting on the parameter controls.
     *
     * @param {boolean} shouldIndicate `true` in case visual indications should be shown in Bitwig Studio,
                          `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setIndication(shouldIndicate?: boolean): void;

    /**
     * Specifies a label for the mapped hardware parameter as shown in Bitwig Studio, for example in menu items for
     * learning controls.
     *
     * @param {string} label the label to be shown in Bitwig Studio
     * @since Bitwig Studio 1.0
     */
    setLabel(label?: string): void;

    /**
     * Restores control of this parameter to automation playback.
     *
     * @since 1.1
     */
    restoreAutomationControl(): void;

}


export default AutomatableRangedValue;
