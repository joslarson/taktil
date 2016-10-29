/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to navigate the filter columns of a Bitwig Studio browsing session.
 *
 * @since Bitwig Studio 1.2
 */
function CursorBrowserFilterColumn() {}

CursorBrowserFilterColumn.prototype = new BrowserFilterColumn();
CursorBrowserFilterColumn.prototype.constructor = CursorBrowserFilterColumn;
