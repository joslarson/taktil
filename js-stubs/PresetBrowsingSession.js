/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing presets, including access to all filter columns and the
 * result column as shown in the 'Presets' tab of Bitwig Studio's contextual browser window.
 *
 * @see BrowsingSession
 * @since Bitwig Studio 1.2
 */
function PresetBrowsingSession() {}

PresetBrowsingSession.prototype = new BrowsingSession();
PresetBrowsingSession.prototype.constructor = PresetBrowsingSession;

/**
 * Returns the category filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested category filter object.
 * @since Bitwig Studio 1.2
 */
PresetBrowsingSession.prototype.getCategoryFilter = function() {};

/**
 * Returns the preset type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested preset type filter object.
 * @since Bitwig Studio 1.2
 */
PresetBrowsingSession.prototype.getPresetTypeFilter = function() {};

/**
 * Returns the file type filter as shown in the category column of the browser.
 *
 * @return {BrowserFilterColumn} the requested file type filter object.
 * @since Bitwig Studio 1.2
 */
PresetBrowsingSession.prototype.getFileTypeFilter = function() {};
