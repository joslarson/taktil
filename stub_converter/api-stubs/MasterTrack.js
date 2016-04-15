/* API Version - 1.3.1 */

/**
 * A special kind of track that represents the master track in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
function MasterTrack() {}

MasterTrack.prototype = new Track();
MasterTrack.prototype.constructor = MasterTrack;
