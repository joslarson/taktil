/* API Version - 1.3.13 */

/**
 * Instances of this interface represent a bank of custom controls that can be manually
 * learned to controller parameters by the user.
 *
 * @since Bitwig Studio 1.0
 */
function UserControlBank() {}

/**
 * Gets the user control at the given bank index.
 *
 * @param {int} index the index of the control within the bank
 * @return {AutomatableRangedValue} the requested user control object
 * @since Bitwig Studio 1.0
 */
UserControlBank.prototype.getControl = function(index) {};
