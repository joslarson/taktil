import ApiProxy from './ApiProxy';
import Value from './Value';


class EnumValue extends Value {

}


/**
 * Instances of this interface represent enumeration values. Enum values work similar to string values,
 * but are limited to a fixed set of value options.
 *
 * @since Bitwig Studio 1.0
 */
declare interface EnumValue extends Value {
    /**
     * Sets the value to the enumeration item with the given name.
     *
     * @param {string} name the name of the new enum item
     * @since Bitwig Studio 1.0
     */
    set(name?: string): void;

}


export default EnumValue;
