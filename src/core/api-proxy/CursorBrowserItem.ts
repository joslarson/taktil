import ApiProxy from './ApiProxy';
import BrowserItemBank from './BrowserItemBank';
import BrowserItem from './BrowserItem';


class CursorBrowserItem extends BrowserItem {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'createSiblingsBank': BrowserItemBank,
        });
    }
}


/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
declare interface CursorBrowserItem extends BrowserItem {
    /**
     * Returns a bank object that provides access to the siblings of the cursor item.
     * The bank will automatically scroll so that the cursor item is always visible.
     *
     * @param {int} numSiblings the number of simultaneously accessible siblings
     * @return {BrowserItemBank} the requested item bank object
     */
    createSiblingsBank(numSiblings?: number): BrowserItemBank;

}


export default CursorBrowserItem;
