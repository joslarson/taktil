import ApiProxy from './ApiProxy';


class NoteInput extends ApiProxy {

}


export declare enum NoteExpression {
    NONE = 0,
    PITCH_DOWN = 1,
    PITCH_UP = 2,
    GAIN_DOWN = 3,
    GAIN_UP = 4,
    PAN_LEFT = 5,
    PAN_RIGHT = 6,
    TIMBRE_DOWN = 7,
    TIMBRE_UP = 8,
}


/**
 * Instances of this interface implement note input functionality used for recording notes in Bitwig Studio and for
 * playing the instruments in tracks on hardware keyboards. In Bitwig Studio the note inputs are shown int the input
 * choosers of Bitwig Studio tracks.
 *
 * @since Bitwig Studio 1.0
 */
declare interface NoteInput {
    NoteExpression: NoteExpression;
    /**
     * Specifies if the note input should consume MIDI notes, or in other words if it should prevent forwarding incoming
     * notes to the MIDI callback registered in {@link MidiIn#setMidiCallback}. This setting is `true` by default.
     *
     * @param {boolean} shouldConsumeEvents `true` if note events should be consumed, `false` of the events should be
                               additionally sent to the callback registered via {@link MidiIn#setMidiCallback}
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setShouldConsumeEvents(shouldConsumeEvents?: boolean): void;

    /**
     * Specifies a translation table which defines the actual key value (0-127) of notes arriving in Bitwig Studio
     * for each note key potentially received from the hardware. This is used for note-on/off and polyphonic
     * aftertouch events. Specifying a value of `-1` for a key means that notes with the key value will be
     * filtered out.
     *
     * Typically this method is used to implement transposition or scale features in controller scripts.
     * By default an identity transform table is configured, which means that all incoming MIDI notes keep their
     * original key value when being sent into Bitwig Studio.
     *
     * @param {Object[]} table an array which should contain 128 entries. Each entry should be a note value in the range [0..127]
                 or -1 in case of filtering.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setKeyTranslationTable(table?: Array<any>): void;

    /**
     * Specifies a translation table which defines the actual velocity value (0-127) of notes arriving in Bitwig Studio
     * for each note velocity potentially received from the hardware. This is used for note-on events only.
     *
     * Typically this method is used to implement velocity curves or fixed velocity mappings in controller scripts.
     * By default an identity transform table is configured, which means that all incoming MIDI notes keep their
     * original velocity when being sent into Bitwig Studio.
     *
     * @param {Object[]} table an array which should contain 128 entries. Each entry should be a note value in the range [0..127]
                 or -1 in case of filtering.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setVelocityTranslationTable(table?: Array<any>): void;

    /**
     * Assigns polyphonic aftertouch MIDI messages to the specified note expression.
     * Multi-dimensional control is possible by calling this method several times with different MIDI channel parameters.
     * If a key translation table is configured by calling {@link #setKeyTranslationTable}, that table is used
     * for polyphonic aftertouch as well.
     *
     * @param {int} channel the MIDI channel to map, range [0..15]
     * @param {NoteInput.NoteExpression} expression the note-expression to map for the given MIDI channel
     * @param {int} pitchRange the pitch mapping range in semitones, values must be in the range [1..24].
                      This parameter is ignored for non-pitch expressions.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    assignPolyphonicAftertouchToExpression(channel?: number, expression?: NoteExpression, pitchRange?: number): void;

    /**
     * Enables use of Expressive MIDI mode. (note-per-channel)
     *
     * @param {boolean} useExpressiveMidi enabled/disable the MPE mode for this note-input
     * @param {int} baseChannel which channel (must be either 0 or 15) which is used as the base for this note-input
     * @param {int} pitchBendRange initial pitch bend range used
     * @throws ControlSurfaceException
     */
    setUseExpressiveMidi(useExpressiveMidi?: boolean, baseChannel?: number, pitchBendRange?: number): void;

    /**
     * Sends MIDI data directly to the note input. This will bypass both the event filter and translation tables.
     * The MIDI channel of the message will be ignored.
     *
     * @param {int} status the status byte of the MIDI message
     * @param {int} data0 the data0 part of the MIDI message
     * @param {int} data1 the data1 part of the MIDI message
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    sendRawMidiEvent(status?: number, data0?: number, data1?: number): void;

}


export default NoteInput;
