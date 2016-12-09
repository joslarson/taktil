import ApiProxy from './ApiProxy';
import NoteInput from './NoteInput';


class MidiIn extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'createNoteInput': NoteInput,
        });
    }
}


/**
 * Instances of this interface are used to setup handler functions for incoming MIDI messages
 * from a specific MIDI hardware.
 *
 * @since Bitwig Studio 1.0
 */
declare interface MidiIn {
    /**
     * Registers a callback for receiving short (normal) MIDI messages on this MIDI input port.
     *
     * @param {function} callback a callback function that receives three integer parameters:
                    1. the status byte
                    2. the data1 value
                    2. the data2 value
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setMidiCallback(callback?: Function): void;

    /**
     * Registers a callback for receiving sysex MIDI messages on this MIDI input port.
     *
     * @param {function} callback a callback function that takes a single string argument
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setSysexCallback(callback?: Function): void;

    /**
     * Creates a note input that appears in the track input choosers in Bitwig Studio.
     * This method must be called within the `init()` function of the script.
     * The messages matching the given mask parameter will be fed directly to the application, and are not processed
     * by the script.
     *
     * @param {string} name the name of the note input as it appears in the track input choosers in Bitwig Studio
     * @param {string} masks a filter string formatted as hexadecimal value with `?` as wildcard. For example
                 `80????` would match note-off on channel 1 (0). When this parameter is {@null},
                 a standard filter will be used to forward note-related messages on channel 1 (0).
     * @return {NoteInput} the object representing the requested note input
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    createNoteInput(name?: string, ...masks: string[]): NoteInput;

}


export default MidiIn;
