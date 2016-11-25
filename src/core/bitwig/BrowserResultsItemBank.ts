import ApiProxy from './ApiProxy';
import BrowserItemBank from './BrowserItemBank';
import BrowserResultsItem from './BrowserResultsItem';


class BrowserResultsItemBank extends BrowserItemBank {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getItem': BrowserResultsItem,
        });
    }
}


/**
 * Instances of this interface are used to navigate the results column in the Bitwig Studio browser.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserResultsItemBank extends BrowserItemBank {
    /**
     * Returns the result item for the given index.
     *
     * @param {int} index the item index, must be in the range `[0..getSize-1]`
     * @return {BrowserResultsItem} the requested results item object
     * @since Bitwig Studio 1.2
     */
    getItem(index?: number): BrowserResultsItem;

}


export default BrowserResultsItemBank;
