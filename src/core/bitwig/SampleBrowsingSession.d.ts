import BrowserFilterColumn from './BrowserFilterColumn.d';
import BrowsingSession from './BrowsingSession.d';


/**
 * Instances of this interface are used for browsing samples, including access to all filter columns and the
 * result column as shown in the 'Samples' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface SampleBrowsingSession extends BrowsingSession {
    /**
     * Returns the file type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested file type filter object.
     * @since Bitwig Studio 1.2
     */
    getFileTypeFilter(): BrowserFilterColumn;

}


export default SampleBrowsingSession;
