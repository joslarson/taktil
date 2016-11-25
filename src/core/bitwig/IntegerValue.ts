import ApiProxy from './ApiProxy';
import Value from './Value';


class IntegerValue extends Value {

}


/**
 * Instances of this interface represent integer values.
 *
 * @since Bitwig Studio 1.0
 */
declare interface IntegerValue extends Value {
    /**
     * Sets the internal value.
     *
     * @param {int} value the new integer value.
     * @since Bitwig Studio 1.1
     */
    set(value?: number): void;

    /**
     * Increases/decrease the internal value by the given amount.
     *
     * @param {int} amount the integer amount to increase
     * @since Bitwig Studio 1.1
     */
    inc(amount?: number): void;

}


export default IntegerValue;
