import ApiProxy from './ApiProxy';
import BooleanValue from './BooleanValue';
import ClipLauncherScenesOrSlots from './ClipLauncherScenesOrSlots';


class ClipLauncherSlots extends ClipLauncherScenesOrSlots {

}


/**
 * Instances of this interface represent a scrollable fixed-size window that is connected to a section
 * of the clip launcher slots for a specific track.
 *
 * @since Bitwig Studio 1.0
 */
declare interface ClipLauncherSlots extends ClipLauncherScenesOrSlots {
    /**
     * Selects the slot with the given index.
     *
     * @param {int} slot the index of the slot within the slot window.
     * @since Bitwig Studio 1.0
     */
    select(slot?: number): void;

    /**
     * Starts recording into the slot with the given index.
     *
     * @param {int} slot the index of the slot within the slot window.
     * @since Bitwig Studio 1.0
     */
    record(slot?: number): void;

    /**
     * Makes the clip content of the slot with the given index visible in the note or audio editor.
     *
     * @param {int} slot the index of the slot within the slot window.
     * @since Bitwig Studio 1.0
     */
    showInEditor(slot?: number): void;

    /**
     * Creates an new clip in the slot with the given index.
     *
     * @param {int} slot
     * @param {int} lengthInBeats
     * @since Bitwig Studio 1.0
     */
    createEmptyClip(slot?: number, lengthInBeats?: number): void;

    /**
     * Deletes the clip in the slot with the given index.
     *
     * @param {int} slot the index of the slot within the slot window.
     * @since Bitwig Studio 1.2
     */
    deleteClip(slot?: number): void;

    /**
     * Registers an observer that reports selection changes for the slots inside the window.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index is selected (`true`)
                    or not (`false`)
     * @since Bitwig Studio 1.0
     */
    addIsSelectedObserver(callback?: Function): void;

    /**
     * Registers an observer that reports which slots contain clips.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index contains a clip (`true`)
                    or not (`false`)
     * @since Bitwig Studio 1.0
     */
    addHasContentObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the playback state of clips / slots. The reported states include
     * `stopped`, `playing`, `recording`, but also `queued for stop`, `queued for playback`, `queued for recording`.
     *
     * @param {function} callback a callback function that receives three parameters:
                    1. the slot index (integer),
                    2. the queued or playback state: `0` when stopped, `1` when playing, or `2` when recording, and
                    3. a boolean parameter indicating if the second argument is referring to the queued state
                       (`true`) or the actual playback state (`false`)
     * @since Bitwig Studio 1.1
     */
    addPlaybackStateObserver(callback?: Function): void;

    /**
     * Registers an observer that reports which slots have clips that are currently playing.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index has a clip that is currently playing
                    (`true`) or not (`false`)
     * @since Bitwig Studio 1.0
     */
    addIsPlayingObserver(callback?: Function): void;

    /**
     * Registers an observer that reports which slots have clips that are currently recording.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index has a clip that is currently recording
                    (`true`) or not (`false`)
     * @since Bitwig Studio 1.0
     */
    addIsRecordingObserver(callback?: Function): void;

    /**
     * Add an observer if clip playback is queued on the slot.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                       for playback (`true`) or not (`false`)
     * @since Bitwig Studio 1.1
     */
    addIsPlaybackQueuedObserver(callback?: Function): void;

    /**
     * Add an observer if clip recording is queued on the slot.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                       for recording (`true`) or not (`false`)
     * @since Bitwig Studio 1.1
     */
    addIsRecordingQueuedObserver(callback?: Function): void;

    /**
     * Add an observer if clip playback is queued to stop on the slot.
     *
     * @param {function} callback a callback function that receives two parameters:
                    1. the slot index (integer), and
                    2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                       for stop (`true`) or not (`false`)
     * @since Bitwig Studio 1.1
     */
    addIsStopQueuedObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the colors of clip in the current slot window.
     *
     * @param {function} callback a callback function that receives four parameters:
                    1. the slot index (integer),
                    2. the red coordinate of the RBG color value,
                    3. the green coordinate of the RBG color value, and
                    4. the blue coordinate of the RBG color value
     * @since Bitwig Studio 1.0
     */
    addColorObserver(callback?: Function): void;

    /**
     * Specifies if the Bitwig Studio clip launcher should indicate which slots are part of the window.
     * By default indications are disabled.
     *
     * @param {boolean} shouldIndicate `true` if visual indications should be enabled, `false` otherwise
     * @since Bitwig Studio 1.0
     */
    setIndication(shouldIndicate?: boolean): void;

    /**
     * Returns an object that can be used to observe and toggle if the slots on a connected track group show
     * either scenes launch buttons (for launching the content of the track group) or the clips of the group
     * master track.
     *
     * @return {BooleanValue} a boolean value object.
     */
    isMasterTrackContentShownOnTrackGroups(): BooleanValue;
}


export default ClipLauncherSlots;
