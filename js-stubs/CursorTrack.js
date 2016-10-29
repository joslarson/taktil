/* API Version - 1.3.13 */

/**
 * Instances of this interface represent the cursor item of track selections.
 *
 * @since Bitwig Studio 1.1
 */
function CursorTrack() {}

CursorTrack.prototype = new CursorChannel();
CursorTrack.prototype.constructor = CursorTrack;

/**
 * Makes the cursor track point to it's parent group track, in case it is not already pointing to the
 * root group track.
 *
 * @since Bitwig Studio 1.2
 */
CursorTrack.prototype.selectParent = function() {};

/**
 * Specifies the behaviour of the functions {@link #selectPrevious()}, {@link #selectNext()},
 * {@link #selectFirst()} and {@link #selectLast()}. Calling those functions can either navigate the cursor
 * within the current nesting level, or over a flat list of either all tracks or only the expanded tracks.
 * Default is CursorNavigationMode.FLAT.
 *
 * @param {CursorNavigationMode} mode
 * @since Bitwig Studio 1.2
 */
CursorTrack.prototype.setCursorNavigationMode = function(mode) {};
