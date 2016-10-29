/* API Version - 1.3.13 */

/**
 * Instances of this interface are used to send MIDI messages to a specific MIDI hardware.
 *
 * @since Bitwig Studio 1.0
 */
function MidiOut() {}

/**
 * Sends a MIDI message to the hardware controller.
 *
 * @param {int} status the status byte of the MIDI message
 * @param {int} data1 the data1 part of the MIDI message
 * @param {int} data2 the data2 part of the MIDI message
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
MidiOut.prototype.sendMidi = function(status, data1, data2) {};

/**
 * Sends a MIDI SysEx message to the hardware controller.
 *
 * @param {string} hexString the sysex message formatted as hexadecimal value string
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
MidiOut.prototype.sendSysex = function(hexString) {};

/**
 * Enables or disables sending MIDI beat clock messages to the hardware depending on the given parameter.
 * Typically MIDI controllers that run an internal sequencer such as hardware step sequencers would be interested
 * in MIDI clock messages.
 *
 * @param {boolean} shouldSendClock `true` in case the hardware should receive MIDI clock messages,
                       `false` otherwise
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
MidiOut.prototype.setShouldSendMidiBeatClock = function(shouldSendClock) {};
