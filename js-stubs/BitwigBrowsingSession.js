/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing Bitwig Studio document such as controllers, presets,
 * multi-samples, or clips. Full access to all filter columns and the result column as shown in
 * Bitwig Studio's contextual browser window is provided.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
function BitwigBrowsingSession() {}

BitwigBrowsingSession.prototype = new BrowsingSession();
BitwigBrowsingSession.prototype.constructor = BitwigBrowsingSession;

/**
 * Returns the creator filter as shown in the category column of Bitwig Studio's contextual browser.
 *
 * @return {BrowserFilterColumn} the requested creator filter object.
 * @since Bitwig Studio 1.2
 */
BitwigBrowsingSession.prototype.getCreatorFilter = function() {};

/**
 * Returns the tags filter as shown in the category column of Bitwig Studio's contextual browser.
 *
 * @return {BrowserFilterColumn} the requested tags filter object.
 * @since Bitwig Studio 1.2
 */
BitwigBrowsingSession.prototype.getTagsFilter = function() {};
