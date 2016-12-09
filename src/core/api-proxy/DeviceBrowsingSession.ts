import ApiProxy from './ApiProxy';
import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class DeviceBrowsingSession extends BrowsingSession {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getCategoryFilter': BrowserFilterColumn,
            'getDeviceTypeFilter': BrowserFilterColumn,
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


/**
 * Instances of this interface are used for browsing devices, including access to all filter columns and the
 * result column as shown in the 'Devices' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface DeviceBrowsingSession extends BrowsingSession {
    /**
     * Returns the category filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested category filter object.
     * @since Bitwig Studio 1.2
     */
    getCategoryFilter(): BrowserFilterColumn;

    /**
     * Returns the device type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested device type filter object.
     * @since Bitwig Studio 1.2
     */
    getDeviceTypeFilter(): BrowserFilterColumn;

    /**
     * Returns the file type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested file type filter object.
     * @since Bitwig Studio 1.2
     */
    getFileTypeFilter(): BrowserFilterColumn;

}


export default DeviceBrowsingSession;
