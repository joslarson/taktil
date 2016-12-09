import ApiProxy from './ApiProxy';
import BrowserFilterItemBank from './BrowserFilterItemBank';
import BrowserFilterItem from './BrowserFilterItem';
import BrowserColumn from './BrowserColumn';


class BrowserFilterColumn extends BrowserColumn {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getWildcardItem': BrowserFilterItem,
            'createCursorItem': BrowserFilterItem,
            'createItemBank': BrowserFilterItemBank,
        });
    }
}


/**
 * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserFilterColumn extends BrowserColumn {
    /**
     * Returns the filter item that represents the top-level all/any/everything wildcard item.
     *
     * @return {BrowserFilterItem} the requested filter item object
     * @since Bitwig Studio 1.2
     */
    getWildcardItem(): BrowserFilterItem;

    /**
     * Returns the cursor filter item, which can be used to navigate over the list of entries.
     *
     * @return {BrowserFilterItem} the requested filter item object
     * @since Bitwig Studio 1.2
     */
    createCursorItem(): BrowserFilterItem;

    /**
     * Returns an object that provides access to a bank of successive entries using a window configured with the
     * given size, that can be scrolled over the list of entries.
     *
     * @param {int} size the number of simultaneously accessible items
     * @return {BrowserFilterItemBank} the requested item bank object
     */
    createItemBank(size?: number): BrowserFilterItemBank;

    /**
     * Registers an observer that reports the name of the filter column.
     *
     * @param {int} maxCharacters
     * @param {string} textWhenUnassigned
     * @param {function} callback
     * @since Bitwig Studio 1.2
     */
    addNameObserver(maxCharacters?: number, textWhenUnassigned?: string, callback?: Function): void;

}


export default BrowserFilterColumn;
