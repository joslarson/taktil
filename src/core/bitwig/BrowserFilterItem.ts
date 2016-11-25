import ApiProxy from './ApiProxy';
import BrowserItem from './BrowserItem';


class BrowserFilterItem extends BrowserItem {

}


/**
 * Instances of this interface represent entries in a browser filter column.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowserFilterItem extends BrowserItem {
    /**
     * Registers an observer that reports the hit count of the filter item.
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.2
     */
    addHitCountObserver(callback?: Function): void;

}


export default BrowserFilterItem;
