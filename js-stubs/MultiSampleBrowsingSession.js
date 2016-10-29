/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing multi-samples, including access to all filter columns
 * and the result column as shown in the 'Multi-Samples' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
function MultiSampleBrowsingSession() {}

MultiSampleBrowsingSession.prototype = new BrowsingSession();
MultiSampleBrowsingSession.prototype.constructor = MultiSampleBrowsingSession;

/**
 * Returns the file type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested file type filter object.
 * @since Bitwig Studio 1.2
 */
MultiSampleBrowsingSession.prototype.getFileTypeFilter = function() {};
