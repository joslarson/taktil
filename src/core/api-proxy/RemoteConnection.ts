import ApiProxy from './ApiProxy';


class RemoteConnection extends ApiProxy {

}


/**
 * Instances of this interface are reported to the supplied script callback when connecting to a remote
 * TCP socket via {@link Host#connectToRemoteHost}.
 *
 * @see {@link Host#connectToRemoteHost}
 * @since Bitwig Studio 1.0
 */
declare interface RemoteConnection {
    /**
     * Disconnects from the remote host.
     *
     * @since Bitwig Studio 1.0
     */
    disconnect(): void;

    /**
     * Registers a callback function that gets called when the connection gets lost or disconnected.
     *
     * @param {function} callback a callback function that doesn't receive any parameters
     * @since Bitwig Studio 1.0
     */
    setDisconnectCallback(callback?: Function): void;

    /**
     * Sets the callback used for receiving data.
     *
     * The remote connection needs a header for each message sent to it containing a 32-bit big-endian integer
     * saying how big the rest of the message is. The data delivered to the script will not include this header.
     *
     * @param {function} callback a callback function with the signature `(byte[] data)`
     * @since Bitwig Studio 1.0
     */
    setReceiveCallback(callback?: Function): void;

    /**
     * Sends data to the remote host.
     *
     * @param {byte[]} data the byte array containing the data to be sent. When creating a numeric byte array in JavaScript,
                the byte values must be signed (in the range -128..127).
     * @throws IOException
     * @since Bitwig Studio 1.0
     */
    send(data?: number[]): void;
}


export default RemoteConnection;
