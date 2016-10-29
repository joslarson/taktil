/* API Version - 1.3.13 */

/**
 * A special kind of channel that follows a channel selection cursor in Bitwig Studio. The selection can either be a
 * custom selection cursor that gets created by the controller script, or represent the user selection cursor as shown
 * in the Bitwig Studio editors, such as the Arranger track selection cursor.
 *
 * @since Bitwig Studio 1.1
 */
function CursorChannel() {}

CursorChannel.prototype = new Cursor();
CursorChannel.prototype.constructor = CursorChannel;

/**
 * Points the cursor to the given channel.
 *
 * @param {Channel} channel the channel that this channel cursor should point to
 * @since Bitwig Studio 1.2
 */
CursorChannel.prototype.selectChannel = function(channel) {};
