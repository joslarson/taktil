import ApiProxy from './ApiProxy';
import BrowsingSession from './BrowsingSession';
import BrowserFilterColumn from './BrowserFilterColumn';


class BitwigBrowsingSession extends BrowsingSession {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getCreatorFilter': BrowserFilterColumn,
            'getTagsFilter': BrowserFilterColumn,
        });
    }
}


/**
 * Instances of this interface are used for browsing Bitwig Studio document such as devices, presets,
 * multi-samples, or clips. Full access to all filter columns and the result column as shown in
 * Bitwig Studio's contextual browser window is provided.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface BitwigBrowsingSession extends BrowsingSession {
    /**
     * Returns the creator filter as shown in the category column of Bitwig Studio's contextual browser.
     *
     * @return {BrowserFilterColumn} the requested creator filter object.
     * @since Bitwig Studio 1.2
     */
    getCreatorFilter(): BrowserFilterColumn;

    /**
     * Returns the tags filter as shown in the category column of Bitwig Studio's contextual browser.
     *
     * @return {BrowserFilterColumn} the requested tags filter object.
     * @since Bitwig Studio 1.2
     */
    getTagsFilter(): BrowserFilterColumn;

}


export default BitwigBrowsingSession;
