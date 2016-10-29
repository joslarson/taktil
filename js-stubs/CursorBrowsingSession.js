/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for navigating the various browsing sessions of
 * Bitwig Studio's contextual browser.
 *
 * @since Bitwig Studio 1.2
 */
function CursorBrowsingSession() {}

CursorBrowsingSession.prototype = new GenericBrowsingSession();
CursorBrowsingSession.prototype.constructor = CursorBrowsingSession;
