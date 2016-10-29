/* API Version - 1.3.13 */

/**
 * This interface is used to configure observation of pretty-printed controller parameter values.
 *
 * @since Bitwig Studio 1.1.5
 */
function DirectParameterValueDisplayObserver() {}

/**
 * Starts observing the parameters according to the given parameter ID array, or stops observing
 * in case `null` is passed in for the parameter ID array.
 *
 * @param {String[]} parameterIds the array of parameter IDs or `null` to stop observing parameter display values.
 * @since Bitwig Studio 1.1.5
 */
DirectParameterValueDisplayObserver.prototype.setObservedParameterIds = function(parameterIds) {};
