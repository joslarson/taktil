/* API Version - 1.3.13 */

/**
 * An abstract interface that represents the clip launcher scenes or slots of a single track.
 *
 * @since Bitwig Studio 1.0
 */
function ClipLauncherScenesOrSlots() {}

/**
 * Launches the scene/slot with the given index.
 *
 * @param {int} slot the index of the slot that should be launched
 * @since Bitwig Studio 1.0
 */
ClipLauncherScenesOrSlots.prototype.launch = function(slot) {};

/**
 * Stops clip launcher playback for the associated track.
 *
 * @since Bitwig Studio 1.0
 */
ClipLauncherScenesOrSlots.prototype.stop = function() {};

/**
 * Performs a return-to-arrangement operation on the related track, which caused playback to be taken over by the
 * arrangement sequencer.
 *
 * @since Bitwig Studio 1.0
 */
ClipLauncherScenesOrSlots.prototype.returnToArrangement = function() {};

/**
 * Registers an observer that reports the names of the scenes and slots. The slot names reflect the names of
 * containing clips.
 *
 * @param {function} callback a callback function receiving two parameters:
                1. the slot index (integer) within the configured window, and
                2. the name of the scene/slot (string)
 * @since Bitwig Studio 1.0
 */
ClipLauncherScenesOrSlots.prototype.addNameObserver = function(callback) {};
