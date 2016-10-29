/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing controllers, including access to all filter columns and the
 * result column as shown in the 'Controllers' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
function ControllerBrowsingSession() {}

ControllerBrowsingSession.prototype = new BrowsingSession();
ControllerBrowsingSession.prototype.constructor = ControllerBrowsingSession;

/**
 * Returns the category filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested category filter object.
 * @since Bitwig Studio 1.2
 */
ControllerBrowsingSession.prototype.getCategoryFilter = function() {};

/**
 * Returns the controller type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested controller type filter object.
 * @since Bitwig Studio 1.2
 */
ControllerBrowsingSession.prototype.getControllerTypeFilter = function() {};

/**
 * Returns the file type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested file type filter object.
 * @since Bitwig Studio 1.2
 */
ControllerBrowsingSession.prototype.getFileTypeFilter = function() {};
