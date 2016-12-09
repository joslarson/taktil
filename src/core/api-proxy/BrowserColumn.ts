import ApiProxy from './ApiProxy';
import BrowserItemBank from './BrowserItemBank';
import BrowserItem from './BrowserItem';


class BrowserColumn extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'createCursorItem': BrowserItem,
            'createItemBank': BrowserItemBank,
        });
    }
}


/**
 * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserColumn {
    /**
     * Registers an observer that reports if the column exists.
     *
     * @param {function} callback a callback function that receives a single boolean parameter
     * @since Bitwig Studio 1.2
     */
    addExistsObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the underlying total count of column entries
     * (not the size of the column window).
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.2
     */
    addEntryCountObserver(callback?: Function): void;

    /**
     * Returns the cursor item, which can be used to navigate over the list of entries.
     *
     * @return {BrowserItem} the requested filter item object
     * @since Bitwig Studio 1.2
     */
    createCursorItem(): BrowserItem;

    /**
     * Returns an object that provides access to a bank of successive entries using a window configured with the
     * given size, that can be scrolled over the list of entries.
     *
     * @param {int} size the number of simultaneously accessible items
     * @return {BrowserItemBank} the requested item bank object
     */
    createItemBank(size?: number): BrowserItemBank;

}


export default BrowserColumn;
