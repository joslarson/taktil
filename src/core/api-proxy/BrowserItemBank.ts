import ApiProxy from './ApiProxy';
import BrowserItem from './BrowserItem';


class BrowserItemBank extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getItem': BrowserItem,
        });
    }
}


/**
 * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserItemBank {
    /**
     * Returns the window size that was used to configure the filter column during creation.
     *
     * @return {int} the size of the filter column.
     * @since Bitwig Studio 1.2
     */
    getSize(): number;

    /**
     * Returns the item for the given index.
     *
     * @param {int} index the item index, must be in the range `[0..getSize-1]`
     * @return {BrowserItem} the requested item object
     * @since Bitwig Studio 1.2
     */
    getItem(index?: number): BrowserItem;

    /**
     * Scrolls the filter column entries one item up.
     *
     * @since Bitwig Studio 1.2
     */
    scrollUp(): void;

    /**
     * Scrolls the filter column entries one item down.
     *
     * @since Bitwig Studio 1.2
     */
    scrollDown(): void;

    /**
     * Scrolls the filter column entries one page up.
     * For example if the column is configured with a window size of 8 entries and is currently showing items
     * [1..8], calling this method would scroll the column to show items [9..16].
     *
     * @since Bitwig Studio 1.2
     */
    scrollPageUp(): void;

    /**
     * Scrolls the filter column entries one page up.
     * For example if the column is configured with a window size of 8 entries and is currently showing items
     * [9..16], calling this method would scroll the column to show items [1..8].
     *
     * @since Bitwig Studio 1.2
     */
    scrollPageDown(): void;

    /**
     * Registers an observer that reports the current scroll position, more specifically the position of the first
     * item within the underlying list of entries, that is shown as the first entry within the window.
     *
     * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                    the scroll position, or `-1` in case the column has no content.
     * @since Bitwig Studio 1.2
     */
    addScrollPositionObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the column entries can be scrolled further up.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addCanScrollUpObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the column entries can be scrolled further down.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addCanScrollDownObserver(callback?: Function): void;
}


export default BrowserItemBank;
