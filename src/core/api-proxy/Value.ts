import ApiProxy from './ApiProxy';


class Value extends ApiProxy {

}


/**
 * The common interface that is shared by all value objects in the controller API.
 *
 * @since Bitwig Studio 1.1
 */
declare interface Value {
    /**
     * Registers an observer that reports the current value.
     *
     * @param {function} callback a callback function that receives a single parameter
     * @since Bitwig Studio 1.0
     */
    addValueObserver(callback?: Function): void;

}


export default Value;
