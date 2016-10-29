/* API Version - 1.3.13 */

/**
 * An interface representing various commands which can be performed on the Bitwig Studio arranger.<br/>
 * 
 * To receive an instance of the application interface call {@link Host#createArranger}.
 *
 * @since Bitwig Studio 1.0
 */
function Arranger() {}

/**
 * Gets an object that allows to enable/disable arranger playback follow. Observers can be registered on
 * the returned object for receiving notifications when the setting switches between on and off.
 *
 * @return {BooleanValue} a boolean value object that represents the enabled state of arranger playback follow
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.isPlaybackFollowEnabled = function() {};

/**
 * Gets an object that allows to control the arranger track height. Observers can be registered on
 * the returned object for receiving notifications when the track height changes.
 *
 * @return {BooleanValue} a boolean value object that has the state `true` when the tracks have double row height
        and `false` when the tracks have single row height.
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.hasDoubleRowTrackHeight = function() {};

/**
 * Gets an object that allows to show/hide the cue markers in the arranger panel. Observers can be registered on
 * the returned object for receiving notifications when the cue marker lane switches between shown and hidden.
 *
 * @return {BooleanValue} a boolean value object that represents the cue marker section visibility
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.areCueMarkersVisible = function() {};

/**
 * Gets an object that allows to show/hide the clip launcher in the arranger panel. Observers can be registered
 * on the returned object for receiving notifications when the clip launcher switches between shown and hidden.
 *
 * @return {BooleanValue} a boolean value object that represents the clip launcher visibility
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.isClipLauncherVisible = function() {};

/**
 * Gets an object that allows to show/hide the timeline in the arranger panel. Observers can be registered
 * on the returned object for receiving notifications when the timeline switches between shown and hidden.
 *
 * @return {BooleanValue} a boolean value object that represents the timeline visibility
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.isTimelineVisible = function() {};

/**
 * Gets an object that allows to show/hide the track input/output choosers in the arranger panel. Observers can
 * be registered on the returned object for receiving notifications when the I/O section switches between shown
 * and hidden.
 *
 * @return {BooleanValue} a boolean value object that represents the visibility of the track I/O section
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.isIoSectionVisible = function() {};

/**
 * Gets an object that allows to show/hide the effect tracks in the arranger panel. Observers can be registered on
 * the returned object for receiving notifications when the effect track section switches between shown and hidden.
 *
 * @return {BooleanValue} a boolean value object that represents the visibility of the effect track section
 * @since Bitwig Studio 1.1
 */
Arranger.prototype.areEffectTracksVisible = function() {};
