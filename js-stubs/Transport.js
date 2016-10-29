/* API Version - 1.3.13 */

/**
 * An interface representing the transport section in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
function Transport() {}

/**
 * Starts playback in the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.play = function() {};

/**
 * Stops playback in the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.stop = function() {};

/**
 * Toggles the transport playback state between playing and stopped.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.togglePlay = function() {};

/**
 * When the transport is stopped, calling this function starts transport playback, otherwise the transport is
 * first stopped and the playback is restarted from the last play-start position.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.restart = function() {};

/**
 * Starts recording in the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.record = function() {};

/**
 * Rewinds the Bitwig Studio transport to the beginning of the arrangement.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.rewind = function() {};

/**
 * Calling this function is equivalent to pressing the fast forward button in the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.fastForward = function() {};

/**
 * When calling this function multiple times, the timing of those calls gets evaluated and causes adjustments
 * to the project tempo.
 *
 * @since Bitwig Studio 1.1
 */
Transport.prototype.tapTempo = function() {};

/**
 * Registers an observer that reports if the Bitwig Studio transport is playing.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if playing,
                `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addIsPlayingObserver = function(callback) {};

/**
 * Registers an observer that reports if the Bitwig Studio transport is recording.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if recording,
                `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addIsRecordingObserver = function(callback) {};

/**
 * Registers an observer that reports if over-dubbing is enabled in Bitwig Studio.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if over-dubbing
                is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addOverdubObserver = function(callback) {};

/**
 * Registers an observer that reports if clip launcher over-dubbing is enabled in Bitwig Studio.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if clip launcher
                over-dubbing is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addLauncherOverdubObserver = function(callback) {};

/**
 * Registers an observer that reports the current automation write mode.
 *
 * @param {function} callback a callback function that receives a single string argument.
                Possible values are `"latch"`, `"touch"` or `"write"`.
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addAutomationWriteModeObserver = function(callback) {};

/**
 * Registers an observer that reports if Bitwig Studio is currently writing arranger automation.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when arranger
                automation write is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addIsWritingArrangerAutomationObserver = function(callback) {};

/**
 * Registers an observer that reports if Bitwig Studio is currently writing clip launcher automation.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when clip launcher
                automation write is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addIsWritingClipLauncherAutomationObserver = function(callback) {};

/**
 * Registers an observer that reports if automation is overridden in Bitwig Studio.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if overridden,
                `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addAutomationOverrideObserver = function(callback) {};

/**
 * Registers an observer that reports if arranger looping is enabled in Bitwig Studio.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when enabled,
                `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addIsLoopActiveObserver = function(callback) {};

/**
 * Registers an observer that reports if punch-in is enabled in the Bitwig Studio transport.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-in
                is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addPunchInObserver = function(callback) {};

/**
 * Registers an observer that reports if punch-out is enabled in the Bitwig Studio transport.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-out
                is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addPunchOutObserver = function(callback) {};

/**
 * Registers an observer that reports if the metronome is enabled in Bitwig Studio.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` when the metronome
                is enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addClickObserver = function(callback) {};

/**
 * Registers an observer that reports if the metronome has tick playback enabled.
 *
 * @param {function} callback a callback function that receives a single boolean argument (`true` if metronome ticks,
                are enabled, `false` otherwise).
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addMetronomeTicksObserver = function(callback) {};

/**
 * Registers an observer that reports the metronome volume.
 *
 * @param {function} callback a callback function that receives a single numeric argument.
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addMetronomeVolumeObserver = function(callback) {};

/**
 * Registers an observer that reports if the metronome is audible during pre-roll.
 *
 * @param {function} callback a callback function that receives a single boolean argument.
 * @since Bitwig Studio 1.2
 */
Transport.prototype.addPreRollClickObserver = function(callback) {};

/**
 * Registers an observer that reports the current pre-roll setting.
 *
 * @param {function} callback a callback function that receives a single string argument. Possible values are
                `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
 * @since Bitwig Studio 1.0
 */
Transport.prototype.addPreRollObserver = function(callback) {};

/**
 * Toggles the enabled state of the arranger loop in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleLoop = function() {};

/**
 * Enables of disables the arranger loop according to the given parameter.
 *
 * @param {boolean} isEnabled `true` to enable the arranger loop, `false` otherwise
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setLoop = function(isEnabled) {};

/**
 * Toggles the punch-in enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.togglePunchIn = function() {};

/**
 * Toggles the punch-out enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.togglePunchOut = function() {};

/**
 * Toggles the metronome enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleClick = function() {};

/**
 * Enables of disables the metronome according to the given parameter.
 *
 * @param {boolean} isEnabled `true` to enable the metronome, `false` otherwise
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setClick = function(isEnabled) {};

/**
 * Toggles the enabled state of the metronome ticks.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleMetronomeTicks = function() {};

/**
 * Toggles the enabled state of the metronome during pre-roll.
 *
 * @since Bitwig Studio 1.2
 */
Transport.prototype.toggleMetronomeDuringPreRoll = function() {};

/**
 * Updates the transport pre-roll setting according to the given parameter.
 *
 * @param {string} value the new pre-roll setting, either `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
 * @since Bitwig Studio 1.2
 */
Transport.prototype.setPreRoll = function(value) {};

/**
 * Sets the metronome volume.
 *
 * @param {number} amount the new metronome volume relative to the specified range.
              Values should be in the range [0..range-1].
 * @param {number} range the range of the provided amount value
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setMetronomeValue = function(amount, range) {};

/**
 * Toggles the over-dubbing enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleOverdub = function() {};

/**
 * Enables of disables arranger over-dubbing according to the given parameter.
 *
 * @param {boolean} isEnabled `true` to enable over-dubbing, `false` otherwise
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setOverdub = function(isEnabled) {};

/**
 * Toggles clip launcher overdubbing in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleLauncherOverdub = function() {};

/**
 * Enables of disables clip launcher over-dubbing according to the given parameter.
 *
 * @param {boolean} isEnabled `true` to enable the over-dubbing, `false` otherwise
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setLauncherOverdub = function(isEnabled) {};

/**
 * Sets the automation write mode.
 *
 * @param {string} mode the string that identifies the new automation write mode.
            Possible values are `"latch"`, `"touch"` or `"write"`.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setAutomationWriteMode = function(mode) {};

/**
 * Toggles the latch automation write mode in the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleLatchAutomationWriteMode = function() {};

/**
 * Toggles the arranger automation write enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleWriteArrangerAutomation = function() {};

/**
 * Toggles the clip launcher automation write enabled state of the Bitwig Studio transport.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.toggleWriteClipLauncherAutomation = function() {};

/**
 * Resets any automation overrides in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.resetAutomationOverrides = function() {};

/**
 * Switches playback to the arrangement sequencer on all tracks.
 *
 * @since Bitwig Studio 1.0
 */
Transport.prototype.returnToArrangement = function() {};

/**
 * Returns an object that provides access to the project tempo.
 *
 * @return {AutomatableRangedValue} the requested tempo value object
 * @since Bitwig Studio 1.0
 */
Transport.prototype.getTempo = function() {};

/**
 * Increases the project tempo value by the given amount, which is specified relative to the given range.
 *
 * @param {number} amount the new tempo value relative to the specified range.
              Values should be in the range [0..range-1].
 * @param {number} range the range of the provided amount value
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Transport.prototype.increaseTempo = function(amount, range) {};

/**
 * Returns an object that provides access to the transport position in Bitwig Studio.
 *
 * @return {BeatTime} a beat time object that represents the transport position
 * @since Bitwig Studio 1.0
 */
Transport.prototype.getPosition = function() {};

/**
 * Sets the transport playback position to the given beat time value.
 *
 * @param {double} beats the new playback position in beats
 * @since Bitwig Studio 1.0
 */
Transport.prototype.setPosition = function(beats) {};

/**
 * Increases the transport position value by the given number of beats, which is specified relative to the given range.
 *
 * @param {double} beats the beat time value that gets added to the current transport position.
             Values have double precision and can be positive or negative.
 * @param {boolean} snap when `true` the actual new transport position will be quantized to the beat grid, when
            `false` the position will be increased exactly by the specified beat time
 * @since Bitwig Studio 1.0
 */
Transport.prototype.incPosition = function(beats, snap) {};

/**
 * Returns an object that provides access to the punch-in position in the Bitwig Studio transport.
 *
 * @return {BeatTime} a beat time object that represents the punch-in position
 * @since Bitwig Studio 1.0
 */
Transport.prototype.getInPosition = function() {};

/**
 * Returns an object that provides access to the punch-out position in the Bitwig Studio transport.
 *
 * @return {BeatTime} a beat time object that represents the punch-out position
 * @since Bitwig Studio 1.0
 */
Transport.prototype.getOutPosition = function() {};

/**
 * Returns an object that provides access to the cross-fader, used for mixing between A/B-channels as specified
 * on the Bitwig Studio tracks.
 *
 * @return {AutomatableRangedValue}
 * @since Bitwig Studio 1.1
 */
Transport.prototype.getCrossfade = function() {};

/**
 * Returns an object that provides access to the transport time signature.
 *
 * @return {TimeSignatureValue} the time signature value object that represents the transport time signature.
 * @since Bitwig Studio 1.1
 */
Transport.prototype.getTimeSignature = function() {};

/**
 * Registers an observer that reports the current clip launcher post recording action.
 *
 * @param {function} callback a callback function that receives a single string argument.
                Possible values are `"off"`, `"play_recorded"`, `"record_next_free_slot"`, `"stop"`,
                `"return_to_arrangement"`, `"return_to_previous_clip"` or `"play_random"`.
 * @since Bitwig Studio 1.3.6
 */
Transport.prototype.addClipLauncherPostRecordingActionObserver = function(callback) {};

/**
 * Sets the automation write mode.
 *
 * @param {string} action the string that identifies the new automation write mode.
              Possible values are `"off"`, `"play_recorded"`, `"record_next_free_slot"`, `"stop"`,
              `"return_to_arrangement"`, `"return_to_previous_clip"` or `"play_random"`.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.3.6
 */
Transport.prototype.setClipLauncherPostRecordingAction = function(action) {};

/**
 * Returns an object that provides access to the clip launcher post recording time offset.
 *
 * @return {BeatTime} a beat time object that represents the post recording time offset
 * @since Bitwig Studio 1.3.6
 */
Transport.prototype.getClipLauncherPostRecordingTimeOffset = function() {};
