/* API Version - 1.3.13 */

/**
 * Instances of this interface are used for browsing material with bank-wise access to the filter columns.
 *
 * @see com.bitwig.base.control_surface.iface.BrowsingSession
 * @since Bitwig Studio 1.2
 */
function GenericBrowsingSession() {}

GenericBrowsingSession.prototype = new BrowsingSession();
GenericBrowsingSession.prototype.constructor = GenericBrowsingSession;

/**
 * Registers an observer that reports the name of the browsing session.
 *
 * @param {int} maxCharacters
 * @param {string} textWhenUnassigned
 * @param {function} callback
 * @since Bitwig Studio 1.2
 */
GenericBrowsingSession.prototype.addNameObserver = function(maxCharacters, textWhenUnassigned, callback) {};
