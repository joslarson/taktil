/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing clips, including access to all filter columns and the
 * result column as shown in the 'Clips' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
function ClipBrowsingSession() {}

ClipBrowsingSession.prototype = new BrowsingSession();
ClipBrowsingSession.prototype.constructor = ClipBrowsingSession;

/**
 * Returns the file type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested file type filter object.
 * @since Bitwig Studio 1.2
 */
ClipBrowsingSession.prototype.getFileTypeFilter = function() {};
