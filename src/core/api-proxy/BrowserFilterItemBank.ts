import ApiProxy from './ApiProxy';
import BrowserItemBank from './BrowserItemBank';
import BrowserFilterItem from './BrowserFilterItem';


class BrowserFilterItemBank extends BrowserItemBank {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getItem': BrowserFilterItem,
        });
    }
}


/**
 * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserFilterItemBank extends BrowserItemBank {
    /**
     * Returns the filter item for the given index.
     *
     * @param {int} index the item index, must be in the range `[0..getSize-1]`
     * @return {BrowserFilterItem} the requested filter item object
     * @since Bitwig Studio 1.2
     */
    getItem(index?: number): BrowserFilterItem;

}


export default BrowserFilterItemBank;
