import ApiProxy from './ApiProxy';


class RemoteSocket extends ApiProxy {

}


/**
 * Instances of this interface represent a TCP socket that other network clients can connect to,
 * typically created by calling {@link Host#createRemoteConnection}.
 *
 * @see {@link Host#createRemoteConnection}
 * @since Bitwig Studio 1.0
 */
declare interface RemoteSocket {
    /**
     * Sets a callback which receives a remote connection object for each incoming connection.
     *
     * @param {function} callback a callback function which receives a single {@link RemoteConnection} argument
     * @since Bitwig Studio 1.0
     */
    setClientConnectCallback(callback?: Function): void;

    /**
     * Gets the actual port used for the remote socket, which might differ from the originally requested
     * port when calling {@link Host#createRemoteConnection(String name, int port)} in case the requested port
     * was already used.
     *
     * @return {int} the actual port used for the remote socket
     * @since Bitwig Studio 1.0
     */
    getPort(): number;

}


export default RemoteSocket;
