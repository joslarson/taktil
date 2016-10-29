/* API Version - 1.3.13 */

/**
 * Instances of this interface represent the state of a solo button.
 *
 * @since Bitwig Studio 1.1
 */
function SoloValue() {}

SoloValue.prototype = new BooleanValue();
SoloValue.prototype.constructor = SoloValue;

/**
 * Toggles the current solo state.
 *
 * @param {boolean} exclusive specifies if solo on other channels should be disabled
                 automatically ('true') or not ('false').
 * @since Bitwig Studio 1.1
 */
SoloValue.prototype.toggle = function(exclusive) {};
