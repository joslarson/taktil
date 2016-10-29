/* API Version - 1.3.13 */

/**
 * A generic interface that provides the foundation for working with selections.
 * 
 * Implementations of this interface can either represent custom selection cursors that are created by controller
 * scripts, or represent the cursor of user selections as shown in Bitwig Studio editors, such as the Arranger
 * track selection cursor, the note editor event selection cursor and so on.
 *
 * @since Bitwig Studio 1.1
 */
function Cursor() {}

/**
 * Select the previous item.
 *
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.selectPrevious = function() {};

/**
 * Select the next item.
 *
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.selectNext = function() {};

/**
 * Select the first item.
 *
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.selectFirst = function() {};

/**
 * Select the last item.
 *
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.selectLast = function() {};

/**
 * Registers a function with bool argument that gets called when the previous item gains or remains selectability.
 *
 * @param {function} callback
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.addCanSelectPreviousObserver = function(callback) {};

/**
 * Registers a function with bool argument that gets called when the next item gains or remains selectability.
 *
 * @param {function} callback
 * @since Bitwig Studio 1.1
 */
Cursor.prototype.addCanSelectNextObserver = function(callback) {};
