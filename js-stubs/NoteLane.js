/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to access the notes for a specific note key.
 *
 * @since Bitwig Studio 1.0
 */
function NoteLane() {}

/**
 * Registers an observer for the note value, which is either the note pitch represented
 * by this lane, or in case of audio a lane index (currently always 0 in that case).
 *
 * @param {function} callback
 * @since Bitwig Studio 1.0
 */
NoteLane.prototype.addNoteValueObserver = function(callback) {};

/**
 * Registers an observer that reports the name of the note lane. Typically the name of a note lane is either
 * equal to the title of an associated drum pad, or reflects the pitch of the note, e.g. "C#3".
 *
 * @param {int} numChars the maximum number of characters used for the reported name
 * @param {string} textWhenUnassigned the default name that gets reported when the lane is not yet associated
                          with a note lane in Bitwig Studio
 * @param {function} callback a callback function that receives a single string argument
 * @since Bitwig Studio 1.0
 */
NoteLane.prototype.addNameObserver = function(numChars, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the color of the note lane. By default the reported color will be the
 * track color, or in case an associated drum pad has a custom color it will be the color of that pad
 * (currently not implemented).
 *
 * @param {function} callback a callback function that receives three arguments which from an RGB color:
                1. the red dimension of the color value,
                2. the green dimension of the color value, and
                3. the blue dimension of the color value
 * @since Bitwig Studio 1.0
 */
NoteLane.prototype.addColorObserver = function(callback) {};

/**
 * Plays a note with the key of the note lane and the provided velocity parameter.
 *
 * @param {double} velocity the velocity the note should be played with
 * @since Bitwig Studio 1.0
 */
NoteLane.prototype.play = function(velocity) {};
