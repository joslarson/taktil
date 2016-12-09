import ApiProxy from './ApiProxy';


import Channel from './Channel';
import Cursor from './Cursor';


class CursorChannel extends Cursor {

}


/**
 * A special kind of channel that follows a channel selection cursor in Bitwig Studio. The selection can either be a
 * custom selection cursor that gets created by the controller script, or represent the user selection cursor as shown
 * in the Bitwig Studio editors, such as the Arranger track selection cursor.
 *
 * @since Bitwig Studio 1.1
 */
declare interface CursorChannel extends Cursor {
    /**
     * Points the cursor to the given channel.
     *
     * @param {Channel} channel the channel that this channel cursor should point to
     * @since Bitwig Studio 1.2
     */
    selectChannel(channel?: Channel): void;

}


export default CursorChannel;
