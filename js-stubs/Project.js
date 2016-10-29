/* API Version - 1.3.13 */

/**
 * An interface for representing the current project.
 *
 * @since Bitwig Studio 1.1.5
 */
function Project() {}

/**
 * Returns an object that represents the root track group of the active Bitwig Studio project.
 *
 * @return {Track} the root track group of the currently active project
 * @since Bitwig Studio 1.2
 */
Project.prototype.getRootTrackGroup = function() {};

/**
 * Returns an object that represents the top level track group as shown in the arranger/mixer
 * of the active Bitwig Studio project.
 *
 * @return {Track} the shown top level track group of the currently active project
 * @since Bitwig Studio 1.2
 */
Project.prototype.getShownTopLevelTrackGroup = function() {};

/**
 * Creates a new scene (using an existing empty scene if possible) from the clips that are currently
 * playing in the clip launcher.
 *
 * @since Bitwig Studio 1.1.5
 */
Project.prototype.createSceneFromPlayingLauncherClips = function() {};
