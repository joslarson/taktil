import ApiProxy from './ApiProxy';


import BooleanValue from './BooleanValue';


class SoloValue extends BooleanValue {

}


/**
 * Instances of this interface represent the state of a solo button.
 *
 * @since Bitwig Studio 1.1
 */
declare interface SoloValue extends BooleanValue {
    /**
     * Toggles the current solo state.
     *
     * @param {boolean} exclusive specifies if solo on other channels should be disabled
                     automatically ('true') or not ('false').
     * @since Bitwig Studio 1.1
     */
    toggle(exclusive?: boolean): void;

}


export default SoloValue;
