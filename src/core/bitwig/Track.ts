import ApiProxy from './ApiProxy';
import ClipLauncherSlots from './ClipLauncherSlots';
import EnumValue from './EnumValue';
import Channel from './Channel';
import TrackBank from './TrackBank';
import SourceSelector from './SourceSelector';
import BooleanValue from './BooleanValue';
import CursorDevice from './CursorDevice';


class Track extends Channel {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getClipLauncherSlots': ClipLauncherSlots,
            'getArm': BooleanValue,
            'getMonitor': BooleanValue,
            'getAutoMonitor': BooleanValue,
            'getCrossFadeMode': EnumValue,
            'getIsMatrixStopped': BooleanValue,
            'getIsMatrixQueuedForStop': BooleanValue,
            'getSourceSelector': SourceSelector,
            'getCanHoldNoteData': BooleanValue,
            'getCanHoldAudioData': BooleanValue,
            'createCursorDevice': CursorDevice,
            'createTrackBank': TrackBank,
            'createMainTrackBank': TrackBank,
            'createEffectTrackBank': TrackBank,
            'createMasterTrack': Track,
            'createSiblingsTrackBank': TrackBank,
        });
    }
}


/**
 * Instances of this interface represent tracks in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Track extends Channel {
    /**
     * Registers an observer that reports the position of the track within the list of Bitwig Studio tracks.
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.1
     */
    addPositionObserver(callback?: Function): void;

    /**
     * Returns an object that can be used to access the clip launcher slots of the track.
     *
     * @return {ClipLauncherSlots} an object that represents the clip launcher slots of the track
     * @since Bitwig Studio 1.0
     */
    getClipLauncherSlots(): ClipLauncherSlots;

    /**
     * Registers an observer that reports if the clip launcher slots are queued for stop.
     *
     * @param {function} callback a callback function that receives a single boolean argument.
     * @since Bitwig Studio 1.1
     */
    addIsQueuedForStopObserver(callback?: Function): void;

    /**
     * Returns an object that provides access to the arm state of the track.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.0
     */
    getArm(): BooleanValue;

    /**
     * Returns an object that provides access to the monitoring state of the track.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.1
     */
    getMonitor(): BooleanValue;

    /**
     * Returns an object that provides access to the auto-monitoring state of the track.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.1
     */
    getAutoMonitor(): BooleanValue;

    /**
     * Returns an object that provides access to the cross-fade mode of the track.
     *
     * @return {EnumValue} an enum value object that has three possible states: "A", "B", or "AB"
     * @since Bitwig Studio 1.1
     */
    getCrossFadeMode(): EnumValue;

    /**
     * Returns a value object that provides access to the clip launcher playback state of the track.
     *
     * @return {BooleanValue} a boolean value object that indicates if the clip launcher is stopped for this track
     * @since Bitwig Studio 1.0
     */
    getIsMatrixStopped(): BooleanValue;

    /**
     * Returns a value object that provides access to the clip launcher's queue-for-stop state on this track.
     * A clip is considered to be queued for stop when playback has been requested to be stopped on that clip,
     * but the playback has not stopped yet due to the current launch quantization settings.
     *
     * @return {BooleanValue} a boolean value object that indicates if the clip launcher slots have been queued for stop
     * @since Bitwig Studio 1.0
     */
    getIsMatrixQueuedForStop(): BooleanValue;

    /**
     * Returns the source selector for the track, which is shown in the IO section of the track in Bitwig Studio
     * and lists either note or audio sources or both depending on the track type.
     *
     * @return {SourceSelector} a source selector object
     * @since Bitwig Studio 1.0
     */
    getSourceSelector(): SourceSelector;

    /**
     * Stops playback of the track.
     *
     * @since Bitwig Studio 1.0
     */
    stop(): void;

    /**
     * Calling this method causes the arrangement sequencer to take over playback.
     *
     * @since Bitwig Studio 1.0
     */
    returnToArrangement(): void;

    /**
     * Updates the name of the track.
     *
     * @param {string} name the new track name
     * @since Bitwig Studio 1.0
     */
    setName(name?: string): void;

    /**
     * Registers an observer that reports names for note key values on this track.
     * The track might provide special names for certain keys if it contains instruments that support that
     * features, such as the Bitwig Drum Machine.
     *
     * @param {function} callback a callback function that receives two arguments:
                    1. the key value in the range [0..127], and 2. the name string
     * @since Bitwig Studio 1.0
     */
    addPitchNamesObserver(callback?: Function): void;

    /**
     * Plays a note on the track with a default duration and the given key and velocity.
     *
     * @param {int} key the key value of the played note
     * @param {int} velocity the velocity of the played note
     * @since Bitwig Studio 1.0
     */
    playNote(key?: number, velocity?: number): void;

    /**
     * Starts playing a note on the track with the given key and velocity.
     *
     * @param {int} key the key value of the played note
     * @param {int} velocity the velocity of the played note
     * @since Bitwig Studio 1.0
     */
    startNote(key?: number, velocity?: number): void;

    /**
     * Stops playing a currently played note.
     *
     * @param {int} key the key value of the playing note
     * @param {int} velocity the note-off velocity
     * @since Bitwig Studio 1.0
     */
    stopNote(key?: number, velocity?: number): void;

    /**
     * Registers an observer that reports the track type.
     * Possible reported track types are `Group`, `Instrument`, `Audio`, `Hybrid`, `Effect` or `Master`.
     *
     * @param {int} numChars the maximum number of characters used for the reported track type
     * @param {string} textWhenUnassigned the default text that gets reported when the track is not yet associated with
                              a Bitwig Studio track.
     * @param {function} callback a callback function that receives a single track type parameter (string).
     * @since Bitwig Studio 1.0
     */
    addTrackTypeObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    /**
     * Registers an observer that reports if the track may contain child tracks, which is the case for group tracks.
     *
     * @param {function} callback a callback function that receives a single boolean parameter.
     * @since Bitwig Studio 1.2
     */
    addIsGroupObserver(callback?: Function): void;

    /**
     * Returns an object that indicates if the track may contain notes.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.0
     */
    getCanHoldNoteData(): BooleanValue;

    /**
     * Returns an object that indicates if the track may contain audio events.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.0
     */
    getCanHoldAudioData(): BooleanValue;

    /**
     * Returns an object that provides access to the cursor item of the track's device selection as shown in
     * the Bitwig Studio user interface.
     *
     * @return {CursorDevice} the requested device selection cursor object
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    createCursorDevice(): CursorDevice;

    /**
     * Creates a named device selection cursor that is independent from the device selection in the Bitwig Studio
     * user interface, assuming the name parameter is not null. When `name` is `null` the result is equal to
     * calling {@link Track#createCursorDevice}.
     *
     * @param {string} name the name of the custom device selection cursor, for example "Primary", or `null` to refer to
                the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
                interface.
     * @return {CursorDevice} the requested device selection cursor object
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    createCursorDevice(name?: string): CursorDevice;

    /**
     * Creates a named device selection cursor that is independent from the device selection in the Bitwig Studio
     * user interface, assuming the name parameter is not null. When `name` is `null` the result is equal to
     * calling {@link Track#createCursorDevice}.
     *
     * @param {string} name the name of the custom device selection cursor, for example "Primary", or `null` to refer to
                the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
                interface.
     * @param {int} numSends the number of sends that are simultaneously accessible in nested channels.
     * @return {CursorDevice} the requested device selection cursor object
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1.6
     */
    createCursorDevice(name?: string, numSends?: number): CursorDevice;

    /**
     * Returns a track bank with the given number of child tracks, sends and scenes. The track bank will only
     * have content if the connected track is a group track.<br/>
     *
     * A track bank can be seen as a fixed-size window onto the list of tracks in the connected track group
     * including their sends and scenes, that can be scrolled in order to access different parts of the track list.
     * For example a track bank configured for 8 tracks can show track 1-8, 2-9, 3-10 and so on.<br/>
     *
     * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
     * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
     * dynamic list of tracks, most likely more tracks than the hardware can control simultaneously. The track bank
     * returned by this function provides a convenient interface for controlling which tracks are currently shown on
     * the hardware.<br/>
     *
     * Creating a track bank using this method will consider all tracks in the document, including effect tracks
     * and the master track. Use {@link #createMainTrackBank} or {@link #createEffectTrackBank} in case you are only
     * interested in tracks of a certain kind.
     *
     * @param {int} numTracks the number of child tracks spanned by the track bank
     * @param {int} numSends the number of sends spanned by the track bank
     * @param {int} numScenes the number of scenes spanned by the track bank
     * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                            child tracks or only on the direct child tracks of the connected group track.
     * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    createTrackBank(numTracks?: number, numSends?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

    /**
     * Returns a track bank with the given number of child tracks, sends and scenes. Only audio tracks, instrument
     * tracks and hybrid tracks are considered. The track bank will only have content if the connected track is
     * a group track.
     * For more information about track banks and the `bank pattern` in general,
     * see the documentation for {@link #createTrackBank}.
     *
     * @param {int} numTracks the number of child tracks spanned by the track bank
     * @param {int} numSends the number of sends spanned by the track bank
     * @param {int} numScenes the number of scenes spanned by the track bank
     * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                            child tracks or only on the direct child tracks of the connected group track.
     * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    createMainTrackBank(numTracks?: number, numSends?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

    /**
     * Returns a track bank with the given number of child effect tracks and scenes.
     * Only effect tracks are considered. The track bank will only have content if the connected track is
     * a group track.
     * For more information about track banks and the `bank pattern` in general, see the documentation for
     * {@link #createTrackBank}.
     *
     * @param {int} numTracks the number of child tracks spanned by the track bank
     * @param {int} numScenes the number of scenes spanned by the track bank
     * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                            child tracks or only on the direct child tracks of the connected group track.
     * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    createEffectTrackBank(numTracks?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

    /**
     * Returns an object that represents the master track of the connected track group.
     * The returned object will only have content if the connected track is a group track.
     *
     * @param {int} numScenes the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
     * @return {Track} an object representing the master track of the connected track group.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    createMasterTrack(numScenes?: number): Track;

    /**
     * Returns a bank of sibling tracks with the given number of tracks, sends and scenes.
     * For more information about track banks and the `bank pattern` in general,
     * see the documentation for {@link #createTrackBank}.
     *
     * @param {int} numTracks the number of child tracks spanned by the track bank
     * @param {int} numSends the number of sends spanned by the track bank
     * @param {int} numScenes the number of scenes spanned by the track bank
     * @param {boolean} shouldIncludeEffectTracks specifies whether effect tracks should be included
     * @param {boolean} shouldIncludeMasterTrack specifies whether the master should be included
     * @return {TrackBank} an object for bank-wise navigation of sibling tracks
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    createSiblingsTrackBank(numTracks?: number, numSends?: number, numScenes?: number, shouldIncludeEffectTracks?: boolean, shouldIncludeMasterTrack?: boolean): TrackBank;

}


export default Track;
