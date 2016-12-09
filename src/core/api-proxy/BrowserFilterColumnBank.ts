import ApiProxy from './ApiProxy';


import BrowserFilterColumn from './BrowserFilterColumn';


class BrowserFilterColumnBank extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getItem': BrowserFilterColumn,
        });
    }
}


/**
 * Instances of this interface are used to navigate the columns of a Bitwig Studio browser session.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserFilterColumnBank {
    /**
     * Returns the window size that was used to configure the filter column during creation.
     *
     * @return {int} the size of the filter column.
     */
    getSize(): number;

    /**
     * Returns the filter column for the given index.
     *
     * @param {int} index the item index, must be in the range `[0..getSize-1]`
     * @return {BrowserFilterColumn} the requested filter column object
     */
    getItem(index?: number): BrowserFilterColumn;

    /**
     * Scrolls the filter columns one item up.
     *
     * @since Bitwig Studio 1.2
     */
    scrollUp(): void;

    /**
     * Scrolls the filter columns one item down.
     *
     * @since Bitwig Studio 1.2
     */
    scrollDown(): void;

    /**
     * Scrolls the filter columns one page up.
     * For example if the bank is configured with a window size of 8 entries and is currently showing items
     * [1..8], calling this method would scroll the window to show columns [9..16].
     *
     * @since Bitwig Studio 1.2
     */
    scrollPageUp(): void;

    /**
     * Scrolls the filter columns one page up.
     * For example if the bank is configured with a window size of 8 entries and is currently showing items
     * [9..16], calling this method would scroll the window to show columns [1..8].
     *
     * @since Bitwig Studio 1.2
     */
    scrollPageDown(): void;

    /**
     * Registers an observer that reports the current scroll position, more specifically the position of the first
     * item within the underlying list of columns, that is shown as the first column within the window.
     *
     * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                    the scroll position, or `-1` in case the column has no content.
     * @since Bitwig Studio 1.2
     */
    addScrollPositionObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the columns can be scrolled further up.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addCanScrollUpObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the columns can be scrolled further down.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addCanScrollDownObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the underlying total count of columns
     * (not the size of the window).
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.2
     */
    addEntryCountObserver(callback?: Function): void;

}


export default BrowserFilterColumnBank;
