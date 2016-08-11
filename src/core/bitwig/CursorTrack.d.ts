import CursorNavigationMode from './CursorNavigationMode.d';
import CursorChannel from './CursorChannel.d';
import Track from './Track.d';


/**
 * Instances of this interface represent the cursor item of track selections.
 *
 * @since Bitwig Studio 1.1
 */
declare interface CursorTrack extends CursorChannel, Track {
    /**
     * Makes the cursor track point to it's parent group track, in case it is not already pointing to the
     * root group track.
     *
     * @since Bitwig Studio 1.2
     */
    selectParent(): void;

    /**
     * Specifies the behaviour of the functions {@link #selectPrevious()}, {@link #selectNext()},
     * {@link #selectFirst()} and {@link #selectLast()}. Calling those functions can either navigate the cursor
     * within the current nesting level, or over a flat list of either all tracks or only the expanded tracks.
     * Default is CursorNavigationMode.FLAT.
     *
     * @param {CursorNavigationMode} mode
     * @since Bitwig Studio 1.2
     */
    setCursorNavigationMode(mode?: CursorNavigationMode): void;

}


export default CursorTrack;
