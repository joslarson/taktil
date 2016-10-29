/* API Version - 1.3.13 */

/**
 * An interface representing the global groove settings of the project.
 *
 * @since Bitwig Studio 1.0
 */
function Groove() {}

/**
 * Returns the enabled state of the groove.
 *
 * @return {AutomatableRangedValue} an object that provides access to the groove on/off setting
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getEnabled = function() {};

/**
 * Returns the object that represents the shuffle amount in Bitwig Studio.
 *
 * @return {AutomatableRangedValue} an ranged value object that provides access to the shuffle amount
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getShuffleAmount = function() {};

/**
 * Returns the object that represents the shuffle rate in Bitwig Studio.
 *
 * @return {AutomatableRangedValue} an ranged value object that provides access to the shuffle rate
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getShuffleRate = function() {};

/**
 * Returns the object that represents the accent amount in Bitwig Studio.
 *
 * @return {AutomatableRangedValue} an ranged value object that provides access to the accent amount
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getAccentAmount = function() {};

/**
 * Returns the object that represents the accent rate in Bitwig Studio.
 *
 * @return {AutomatableRangedValue} an ranged value object that provides access to the accent rate
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getAccentRate = function() {};

/**
 * Returns the object that represents the accent phase in Bitwig Studio.
 *
 * @return {AutomatableRangedValue} an ranged value object that provides access to the accent phase
 * @since Bitwig Studio 1.0
 */
Groove.prototype.getAccentPhase = function() {};
