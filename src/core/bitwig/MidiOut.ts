import ApiProxy from './ApiProxy';


class MidiOut extends ApiProxy {

}


/**
 * Instances of this interface are used to send MIDI messages to a specific MIDI hardware.
 *
 * @since Bitwig Studio 1.0
 */
declare interface MidiOut {
    /**
     * Sends a MIDI message to the hardware device.
     *
     * @param {int} status the status byte of the MIDI message
     * @param {int} data1 the data1 part of the MIDI message
     * @param {int} data2 the data2 part of the MIDI message
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    sendMidi(status?: number, data1?: number, data2?: number): void;

    /**
     * Sends a MIDI SysEx message to the hardware device.
     *
     * @param {string} hexString the sysex message formatted as hexadecimal value string
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    sendSysex(hexString?: string): void;

    /**
     * Enables or disables sending MIDI beat clock messages to the hardware depending on the given parameter.
     * Typically MIDI devices that run an internal sequencer such as hardware step sequencers would be interested
     * in MIDI clock messages.
     *
     * @param {boolean} shouldSendClock `true` in case the hardware should receive MIDI clock messages,
                           `false` otherwise
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setShouldSendMidiBeatClock(shouldSendClock?: boolean): void;

}


export default MidiOut;
