import ApiProxy from './ApiProxy';
import RangedValue from './RangedValue';
import BeatTime from './BeatTime';
import BooleanValue from './BooleanValue';


class Clip extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getShuffle': BooleanValue,
            'getAccent': RangedValue,
            'getPlayStart': BeatTime,
            'getPlayStop': BeatTime,
            'getLoopStart': BeatTime,
            'getLoopLength': BeatTime,
        });
    }
}


/**
 * An interface that provides access to the contents of a clip in Bitwig Studio.
 *
 * The note content of the clip is exposed in terms of steps and keys, mainly targeted to x-y-grid applications
 * such as step sequencers.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Clip {
    /**
     * Scroll the note grid so that the given key becomes visible.
     *
     * @param {int} key the key that should become visible
     * @since Bitwig Studio 1.0
     */
    scrollToKey(key?: number): void;

    /**
     * Scrolls the note grid keys one page up. For example if the note grid is configured to show 12 keys
     * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [48..59].
     *
     * @since Bitwig Studio 1.0
     */
    scrollKeysPageUp(): void;

    /**
     * Scrolls the note grid keys one page down. For example if the note grid is configured to show 12 keys
     * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [48..59].
     *
     * @since Bitwig Studio 1.0
     */
    scrollKeysPageDown(): void;

    /**
     * Scrolls the note grid keys one key up. For example if the note grid is configured to show 12 keys
     * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [37..48].
     *
     * @since Bitwig Studio 1.0
     */
    scrollKeysStepUp(): void;

    /**
     * Scrolls the note grid keys one key down. For example if the note grid is configured to show 12 keys
     * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [35..46].
     *
     * @since Bitwig Studio 1.0
     */
    scrollKeysStepDown(): void;

    /**
     * Scroll the note grid so that the given step becomes visible.
     *
     * @param {int} step the step that should become visible
     * @since Bitwig Studio 1.0
     */
    scrollToStep(step?: number): void;

    /**
     * Scrolls the note grid steps one page forward. For example if the note grid is configured to show 16 steps
     * and is currently showing keys [0..15], calling this method would scroll the note grid to key range [16..31].
     *
     * @since Bitwig Studio 1.0
     */
    scrollStepsPageForward(): void;

    /**
     * Scrolls the note grid steps one page backwards. For example if the note grid is configured to show 16 steps
     * and is currently showing keys [16..31], calling this method would scroll the note grid to key range [0..16].
     *
     * @since Bitwig Studio 1.0
     */
    scrollStepsPageBackwards(): void;

    /**
     * Scrolls the note grid steps one step forward. For example if the note grid is configured to show 16 steps
     * and is currently showing keys [0..15], calling this method would scroll the note grid to key range [1..16].
     *
     * @since Bitwig Studio 1.0
     */
    scrollStepsStepForward(): void;

    /**
     * Scrolls the note grid steps one step backwards. For example if the note grid is configured to show 16 steps
     * and is currently showing keys [1..16], calling this method would scroll the note grid to key range [0..15].
     *
     * @since Bitwig Studio 1.0
     */
    scrollStepsStepBackwards(): void;

    /**
     * Registers an observer that reports if the note grid keys can be scrolled further up.
     *
     * @param {function} callback a callback function that receives a single boolean parameter.
     * @since Bitwig Studio 1.0
     */
    addCanScrollKeysUpObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the note grid keys can be scrolled further down.
     *
     * @param {function} callback a callback function that receives a single boolean parameter.
     * @since Bitwig Studio 1.0
     */
    addCanScrollKeysDownObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the note grid steps can be scrolled backwards.
     *
     * @param {function} callback a callback function that receives a single boolean parameter.
     * @since Bitwig Studio 1.0
     */
    addCanScrollStepsBackwardsObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the note grid keys can be scrolled forward.
     *
     * @param {function} callback a callback function that receives a single boolean parameter.
     * @since Bitwig Studio 1.0
     */
    addCanScrollStepsForwardObserver(callback?: Function): void;

    /**
     * Toggles the existence of a note in the note grid cell specified by the given x and y arguments.
     *
     * @param {int} x the x position within the note grid, defining the step/time of the target note
     * @param {int} y the y position within the note grid, defining the key of the target note
     * @param {int} insertVelocity the velocity of the target note in case a new note gets inserted
     * @since Bitwig Studio 1.0
     */
    toggleStep(x?: number, y?: number, insertVelocity?: number): void;

    /**
     * Creates a note in the grid cell specified by the given x and y arguments. Existing notes are overwritten.
     *
     * @param {int} x the x position within the note grid, defining the step/time of the new note
     * @param {int} y the y position within the note grid, defining the key of the new note
     * @param {int} insertVelocity the velocity of the new note
     * @param {double} insertDuration the duration of the new note
     * @since Bitwig Studio 1.0
     */
    setStep(x?: number, y?: number, insertVelocity?: number, insertDuration?: number): void;

    /**
     * Removes the note in the grid cell specified by the given x and y arguments. Calling this method does nothing
     * in case no note exists at the given x-y-coordinates.
     *
     * @param {int} x the x position within the note grid, defining the step/time of the target note
     * @param {int} y the y position within the note grid, defining the key of the target note
     * @since Bitwig Studio 1.0
     */
    clearStep(x?: number, y?: number): void;

    /**
     * Selects the note in the grid cell specified by the given x and y arguments, in case there actually is a note
     * at the given x-y-coordinates.
     *
     * @param {int} x the x position within the note grid, defining the step/time of the target note
     * @param {int} y the y position within the note grid, defining the key of the target note
     * @param {boolean} clearCurrentSelection `true` if the existing selection should be cleared,
                                 {@false} if the note should be added to the current selection.
     * @since Bitwig Studio 1.0
     */
    selectStepContents(x?: number, y?: number, clearCurrentSelection?: boolean): void;

    /**
     * Sets the beat time duration that is represented by one note grid step.
     *
     * @param {double} lengthInBeatTime the length of one note grid step in beat time.
     * @since Bitwig Studio 1.0
     */
    setStepSize(lengthInBeatTime?: number): void;

    /**
     * Registers an observer that reports which note grid steps/keys contain notes.
     *
     * @param {function} callback A callback function that receives three parameters:
                    1. the x (step) coordinate within the note grid (integer),
                    2. the y (key) coordinate within the note grid (integer), and
                    3. an integer value that indicates if the step is empty (`0`)
                       or if a note continues playing (`1`) or starts playing (`2`).
     * @since Bitwig Studio 1.0
     */
    addStepDataObserver(callback?: Function): void;

    /**
     * Registers an observer that reports note grid cells as they get played by the sequencer.
     *
     * @param {function} callback A callback function that receives a single integer parameter, which reflects the step coordinate
                    that is played, or -1 if no step is associated with the current playback position.
     * @since Bitwig Studio 1.0
     */
    addPlayingStepObserver(callback?: Function): void;

    /**
     * Updates the name of the clip.
     *
     * @param {string} name the new clip name
     * @since Bitwig Studio 1.0
     */
    setName(name?: string): void;

    /**
     * Returns shuffle settings of the clip.
     *
     * @return {BooleanValue} the value object that represents the clips shuffle setting.
     * @since Bitwig Studio 1.0
     */
    getShuffle(): BooleanValue;

    /**
     * Returns accent setting of the clip.
     *
     * @return {RangedValue} the ranged value object that represents the clips accent setting.
     * @since Bitwig Studio 1.0
     */
    getAccent(): RangedValue;

    /**
     * Returns the start of the clip in beat time.
     *
     * @return {BeatTime} the beat time object that represents the clips start time.
     * @since Bitwig Studio 1.1
     */
    getPlayStart(): BeatTime;

    /**
     * Returns the length of the clip in beat time.
     *
     * @return {BeatTime} the beat time object that represents the duration of the clip.
     * @since Bitwig Studio 1.1
     */
    getPlayStop(): BeatTime;

    /**
     * Returns an object that provides access to the loop enabled state of the clip.
     *
     * @return {BooleanValue} a boolean value object.
     * @since Bitwig Studio 1.1
     */
    isLoopEnabled(): BooleanValue;

    /**
     * Returns the loop start time of the clip in beat time.
     *
     * @return {BeatTime} the beat time object that represents the clips loop start time.
     * @since Bitwig Studio 1.1
     */
    getLoopStart(): BeatTime;

    /**
     * Returns the loop length of the clip in beat time.
     *
     * @return {BeatTime} the beat time object that represents the clips loop length.
     * @since Bitwig Studio 1.1
     */
    getLoopLength(): BeatTime;
}


export default Clip;
