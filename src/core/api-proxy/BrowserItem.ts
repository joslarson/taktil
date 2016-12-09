import ApiProxy from './ApiProxy';
import BooleanValue from './BooleanValue';


class BrowserItem extends ApiProxy {

}


/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserItem {
    /**
     * Registers an observer that reports if the item exists.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addExistsObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the string value of the browser item.
     *
     * @param {int} maxCharacters
     * @param {string} textWhenUnassigned
     * @param {function} callback a callback function that receives a single string argument
     * @since Bitwig Studio 1.2
     */
    addValueObserver(maxCharacters?: number, textWhenUnassigned?: string, callback?: Function): void;

    /**
     * Returns an object that provides access to the selected state of the browser item.
     *
     * @return {BooleanValue} an boolean value object
     * @since Bitwig Studio 1.2
     */
    isSelected(): BooleanValue;

}


export default BrowserItem;
