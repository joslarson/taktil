import ApiProxy from './ApiProxy';


class Cursor extends ApiProxy {

}


/**
 * A generic interface that provides the foundation for working with selections.
 *
 * Implementations of this interface can either represent custom selection cursors that are created by controller
 * scripts, or represent the cursor of user selections as shown in Bitwig Studio editors, such as the Arranger
 * track selection cursor, the note editor event selection cursor and so on.
 *
 * @since Bitwig Studio 1.1
 */
declare interface Cursor {
    /**
     * Select the previous item.
     *
     * @since Bitwig Studio 1.1
     */
    selectPrevious(): void;

    /**
     * Select the next item.
     *
     * @since Bitwig Studio 1.1
     */
    selectNext(): void;

    /**
     * Select the first item.
     *
     * @since Bitwig Studio 1.1
     */
    selectFirst(): void;

    /**
     * Select the last item.
     *
     * @since Bitwig Studio 1.1
     */
    selectLast(): void;

    /**
     * Registers a function with bool argument that gets called when the previous item gains or remains selectability.
     *
     * @param {function} callback
     * @since Bitwig Studio 1.1
     */
    addCanSelectPreviousObserver(callback?: Function): void;

    /**
     * Registers a function with bool argument that gets called when the next item gains or remains selectability.
     *
     * @param {function} callback
     * @since Bitwig Studio 1.1
     */
    addCanSelectNextObserver(callback?: Function): void;

}


export default Cursor;
