import ApiProxy from './ApiProxy';


class ClipLauncherScenesOrSlots extends ApiProxy {

}


/**
 * An abstract interface that represents the clip launcher scenes or slots of a single track.
 *
 * @since Bitwig Studio 1.0
 */
declare interface ClipLauncherScenesOrSlots {
    /**
     * Launches the scene/slot with the given index.
     *
     * @param {int} slot the index of the slot that should be launched
     * @since Bitwig Studio 1.0
     */
    launch(slot?: number): void;

    /**
     * Stops clip launcher playback for the associated track.
     *
     * @since Bitwig Studio 1.0
     */
    stop(): void;

    /**
     * Performs a return-to-arrangement operation on the related track, which caused playback to be taken over by the
     * arrangement sequencer.
     *
     * @since Bitwig Studio 1.0
     */
    returnToArrangement(): void;

    /**
     * Registers an observer that reports the names of the scenes and slots. The slot names reflect the names of
     * containing clips.
     *
     * @param {function} callback a callback function receiving two parameters:
                    1. the slot index (integer) within the configured window, and
                    2. the name of the scene/slot (string)
     * @since Bitwig Studio 1.0
     */
    addNameObserver(callback?: Function): void;
}


export default ClipLauncherScenesOrSlots;
