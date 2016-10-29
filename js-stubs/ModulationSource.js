/* API Version - 1.3.13 */

/**
 * This interface represents a modulation source in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
function ModulationSource() {}

/**
 * Registers an observer which reports when the modulation source is in mapping mode.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
ModulationSource.prototype.addIsMappingObserver = function(callback) {};

/**
 * Toggles the modulation source between mapping mode and normal control functionality.
 *
 * @since Bitwig Studio 1.0
 */
ModulationSource.prototype.toggleIsMapping = function() {};

/**
 * Registers an observer the reports the name of the modulation source.
 *
 * @param {int} numChars the maximum number of character the reported name should be long
 * @param {string} textWhenUnassigned the default text that gets reported if the modulation source is not connected to
                          to a modulation source in Bitwig Studio yet
 * @param {function} callback a callback function that receives a single string parameter
 * @since Bitwig Studio 1.0
 */
ModulationSource.prototype.addNameObserver = function(numChars, textWhenUnassigned, callback) {};

/**
 * Registers an observer which reports if the modulation source is mapped to any destination(s).
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.3.10
 */
ModulationSource.prototype.addIsMappedObserver = function(callback) {};
