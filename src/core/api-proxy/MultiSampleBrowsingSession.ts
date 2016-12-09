import ApiProxy from './ApiProxy';
import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class MultiSampleBrowsingSession extends BrowsingSession {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


/**
 * Instances of this interface are used for browsing multi-samples, including access to all filter columns
 * and the result column as shown in the 'Multi-Samples' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface MultiSampleBrowsingSession extends BrowsingSession {
    /**
     * Returns the file type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested file type filter object.
     * @since Bitwig Studio 1.2
     */
    getFileTypeFilter(): BrowserFilterColumn;

}


export default MultiSampleBrowsingSession;
