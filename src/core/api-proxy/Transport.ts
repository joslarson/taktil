import ApiProxy from './ApiProxy';


import BeatTime from './BeatTime';
import AutomatableRangedValue from './AutomatableRangedValue';
import TimeSignatureValue from './TimeSignatureValue';


class Transport extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getTempo': AutomatableRangedValue,
            'getPosition': BeatTime,
            'getInPosition': BeatTime,
            'getOutPosition': BeatTime,
            'getCrossfade': AutomatableRangedValue,
            'getTimeSignature': TimeSignatureValue,
            'getClipLauncherPostRecordingTimeOffset': BeatTime,
        });
    }
}


/**
 * An interface representing the transport section in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Transport {
    /**
     * Starts playback in the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    play(): void;

    /**
     * Stops playback in the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    stop(): void;

    /**
     * Toggles the transport playback state between playing and stopped.
     *
     * @since Bitwig Studio 1.0
     */
    togglePlay(): void;

    /**
     * When the transport is stopped, calling this function starts transport playback, otherwise the transport is
     * first stopped and the playback is restarted from the last play-start position.
     *
     * @since Bitwig Studio 1.0
     */
    restart(): void;

    /**
     * Starts recording in the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    record(): void;

    /**
     * Rewinds the Bitwig Studio transport to the beginning of the arrangement.
     *
     * @since Bitwig Studio 1.0
     */
    rewind(): void;

    /**
     * Calling this function is equivalent to pressing the fast forward button in the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    fastForward(): void;

    /**
     * When calling this function multiple times, the timing of those calls gets evaluated and causes adjustments
     * to the project tempo.
     *
     * @since Bitwig Studio 1.1
     */
    tapTempo(): void;

    /**
     * Registers an observer that reports if the Bitwig Studio transport is playing.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if playing,
                    `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addIsPlayingObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the Bitwig Studio transport is recording.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if recording,
                    `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addIsRecordingObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if over-dubbing is enabled in Bitwig Studio.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if over-dubbing
                    is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addOverdubObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if clip launcher over-dubbing is enabled in Bitwig Studio.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if clip launcher
                    over-dubbing is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addLauncherOverdubObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the current automation write mode.
     *
     * @param {function} callback a callback function that receives a single string argument.
                    Possible values are `"latch"`, `"touch"` or `"write"`.
     * @since Bitwig Studio 1.0
     */
    addAutomationWriteModeObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if Bitwig Studio is currently writing arranger automation.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when arranger
                    automation write is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addIsWritingArrangerAutomationObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if Bitwig Studio is currently writing clip launcher automation.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when clip launcher
                    automation write is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addIsWritingClipLauncherAutomationObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if automation is overridden in Bitwig Studio.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if overridden,
                    `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addAutomationOverrideObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if arranger looping is enabled in Bitwig Studio.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when enabled,
                    `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addIsLoopActiveObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if punch-in is enabled in the Bitwig Studio transport.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-in
                    is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addPunchInObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if punch-out is enabled in the Bitwig Studio transport.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-out
                    is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addPunchOutObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the metronome is enabled in Bitwig Studio.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` when the metronome
                    is enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addClickObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the metronome has tick playback enabled.
     *
     * @param {function} callback a callback function that receives a single boolean argument (`true` if metronome ticks,
                    are enabled, `false` otherwise).
     * @since Bitwig Studio 1.0
     */
    addMetronomeTicksObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the metronome volume.
     *
     * @param {function} callback a callback function that receives a single numeric argument.
     * @since Bitwig Studio 1.0
     */
    addMetronomeVolumeObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the metronome is audible during pre-roll.
     *
     * @param {function} callback a callback function that receives a single boolean argument.
     * @since Bitwig Studio 1.2
     */
    addPreRollClickObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the current pre-roll setting.
     *
     * @param {function} callback a callback function that receives a single string argument. Possible values are
                    `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
     * @since Bitwig Studio 1.0
     */
    addPreRollObserver(callback?: Function): void;

    /**
     * Toggles the enabled state of the arranger loop in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    toggleLoop(): void;

    /**
     * Enables of disables the arranger loop according to the given parameter.
     *
     * @param {boolean} isEnabled `true` to enable the arranger loop, `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setLoop(isEnabled?: boolean): void;

    /**
     * Toggles the punch-in enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    togglePunchIn(): void;

    /**
     * Toggles the punch-out enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    togglePunchOut(): void;

    /**
     * Toggles the metronome enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    toggleClick(): void;

    /**
     * Enables of disables the metronome according to the given parameter.
     *
     * @param {boolean} isEnabled `true` to enable the metronome, `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setClick(isEnabled?: boolean): void;

    /**
     * Toggles the enabled state of the metronome ticks.
     *
     * @since Bitwig Studio 1.0
     */
    toggleMetronomeTicks(): void;

    /**
     * Toggles the enabled state of the metronome during pre-roll.
     *
     * @since Bitwig Studio 1.2
     */
    toggleMetronomeDuringPreRoll(): void;

    /**
     * Updates the transport pre-roll setting according to the given parameter.
     *
     * @param {string} value the new pre-roll setting, either `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
     * @since Bitwig Studio 1.2
     */
    setPreRoll(value?: string): void;

    /**
     * Sets the metronome volume.
     *
     * @param {number} amount the new metronome volume relative to the specified range.
                  Values should be in the range [0..range-1].
     * @param {number} range the range of the provided amount value
     * @since Bitwig Studio 1.0
     */
    setMetronomeValue(amount?: number, range?: number): void;

    /**
     * Toggles the over-dubbing enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    toggleOverdub(): void;

    /**
     * Enables of disables arranger over-dubbing according to the given parameter.
     *
     * @param {boolean} isEnabled `true` to enable over-dubbing, `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setOverdub(isEnabled?: boolean): void;

    /**
     * Toggles clip launcher overdubbing in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    toggleLauncherOverdub(): void;

    /**
     * Enables of disables clip launcher over-dubbing according to the given parameter.
     *
     * @param {boolean} isEnabled `true` to enable the over-dubbing, `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setLauncherOverdub(isEnabled?: boolean): void;

    /**
     * Sets the automation write mode.
     *
     * @param {string} mode the string that identifies the new automation write mode.
                Possible values are `"latch"`, `"touch"` or `"write"`.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    setAutomationWriteMode(mode?: string): void;

    /**
     * Toggles the latch automation write mode in the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    toggleLatchAutomationWriteMode(): void;

    /**
     * Toggles the arranger automation write enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    toggleWriteArrangerAutomation(): void;

    /**
     * Toggles the clip launcher automation write enabled state of the Bitwig Studio transport.
     *
     * @since Bitwig Studio 1.0
     */
    toggleWriteClipLauncherAutomation(): void;

    /**
     * Resets any automation overrides in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    resetAutomationOverrides(): void;

    /**
     * Switches playback to the arrangement sequencer on all tracks.
     *
     * @since Bitwig Studio 1.0
     */
    returnToArrangement(): void;

    /**
     * Returns an object that provides access to the project tempo.
     *
     * @return {AutomatableRangedValue} the requested tempo value object
     * @since Bitwig Studio 1.0
     */
    getTempo(): AutomatableRangedValue;

    /**
     * Increases the project tempo value by the given amount, which is specified relative to the given range.
     *
     * @param {number} amount the new tempo value relative to the specified range.
                  Values should be in the range [0..range-1].
     * @param {number} range the range of the provided amount value
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.0
     */
    increaseTempo(amount?: number, range?: number): void;

    /**
     * Returns an object that provides access to the transport position in Bitwig Studio.
     *
     * @return {BeatTime} a beat time object that represents the transport position
     * @since Bitwig Studio 1.0
     */
    getPosition(): BeatTime;

    /**
     * Sets the transport playback position to the given beat time value.
     *
     * @param {double} beats the new playback position in beats
     * @since Bitwig Studio 1.0
     */
    setPosition(beats?: number): void;

    /**
     * Increases the transport position value by the given number of beats, which is specified relative to the given range.
     *
     * @param {double} beats the beat time value that gets added to the current transport position.
                 Values have double precision and can be positive or negative.
     * @param {boolean} snap when `true` the actual new transport position will be quantized to the beat grid, when
                `false` the position will be increased exactly by the specified beat time
     * @since Bitwig Studio 1.0
     */
    incPosition(beats?: number, snap?: boolean): void;

    /**
     * Returns an object that provides access to the punch-in position in the Bitwig Studio transport.
     *
     * @return {BeatTime} a beat time object that represents the punch-in position
     * @since Bitwig Studio 1.0
     */
    getInPosition(): BeatTime;

    /**
     * Returns an object that provides access to the punch-out position in the Bitwig Studio transport.
     *
     * @return {BeatTime} a beat time object that represents the punch-out position
     * @since Bitwig Studio 1.0
     */
    getOutPosition(): BeatTime;

    /**
     * Returns an object that provides access to the cross-fader, used for mixing between A/B-channels as specified
     * on the Bitwig Studio tracks.
     *
     * @return {AutomatableRangedValue}
     * @since Bitwig Studio 1.1
     */
    getCrossfade(): AutomatableRangedValue;

    /**
     * Returns an object that provides access to the transport time signature.
     *
     * @return {TimeSignatureValue} the time signature value object that represents the transport time signature.
     * @since Bitwig Studio 1.1
     */
    getTimeSignature(): TimeSignatureValue;

    /**
     * Registers an observer that reports the current clip launcher post recording action.
     *
     * @param {function} callback a callback function that receives a single string argument.
                    Possible values are `"off"`, `"play_recorded"`, `"record_next_free_slot"`, `"stop"`,
                    `"return_to_arrangement"`, `"return_to_previous_clip"` or `"play_random"`.
     * @since Bitwig Studio 1.3.6
     */
    addClipLauncherPostRecordingActionObserver(callback?: Function): void;

    /**
     * Sets the automation write mode.
     *
     * @param {string} action the string that identifies the new automation write mode.
                  Possible values are `"off"`, `"play_recorded"`, `"record_next_free_slot"`, `"stop"`,
                  `"return_to_arrangement"`, `"return_to_previous_clip"` or `"play_random"`.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.3.6
     */
    setClipLauncherPostRecordingAction(action?: string): void;

    /**
     * Returns an object that provides access to the clip launcher post recording time offset.
     *
     * @return {BeatTime} a beat time object that represents the post recording time offset
     * @since Bitwig Studio 1.3.6
     */
    getClipLauncherPostRecordingTimeOffset(): BeatTime;

}


export default Transport;
