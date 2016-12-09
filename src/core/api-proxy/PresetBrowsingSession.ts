import ApiProxy from './ApiProxy';
import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class PresetBrowsingSession extends BrowsingSession {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getCategoryFilter': BrowserFilterColumn,
            'getPresetTypeFilter': BrowserFilterColumn,
            'getFileTypeFilter': BrowserFilterColumn,
        });
    }
}


/**
 * Instances of this interface are used for browsing presets, including access to all filter columns and the
 * result column as shown in the 'Presets' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface PresetBrowsingSession extends BrowsingSession {
    /**
     * Returns the category filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested category filter object.
     * @since Bitwig Studio 1.2
     */
    getCategoryFilter(): BrowserFilterColumn;

    /**
     * Returns the preset type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested preset type filter object.
     * @since Bitwig Studio 1.2
     */
    getPresetTypeFilter(): BrowserFilterColumn;

    /**
     * Returns the file type filter as shown in the category column of the browser.
     *
     * @return {BrowserFilterColumn} the requested file type filter object.
     * @since Bitwig Studio 1.2
     */
    getFileTypeFilter(): BrowserFilterColumn;

}


export default PresetBrowsingSession;
