import ApiProxy from './ApiProxy';
import Value from './Value';


class StringValue extends Value {

}


/**
 * Instances of this interface implement the {@link Value} interface for string values.
 *
 * @since Bitwig Studio 1.1
 */
declare interface StringValue extends Value {
    /**
     * Sets the value object to the given string.
     *
     * @param {string} value the new value string
     * @since Bitwig Studio 1.1
     */
    set(value?: string): void;

}


export default StringValue;
