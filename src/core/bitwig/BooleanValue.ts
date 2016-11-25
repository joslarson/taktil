import ApiProxy from './ApiProxy';
import Value from './Value';


class BooleanValue extends Value {

}


/**
 * Instances of this interface represent boolean values.
 *
 * @since Bitwig Studio 1.0
 */
declare interface BooleanValue extends Value {
    /**
     * Sets the internal value.
     *
     * @param {boolean} value the new boolean value.
     * @since Bitwig Studio 1.0
     */
    set(value?: boolean): void;

    /**
     * Toggles the current state. In case the current value is `false`, the new value will be `true` and
     * the other way round.
     *
     * @since Bitwig Studio 1.0
     */
    toggle(): void;

}


export default BooleanValue;
