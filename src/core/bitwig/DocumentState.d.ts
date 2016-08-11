import Settings from './Settings.d';


/**
 * This interface is used to save custom script settings inside Bitwig Studio documents.
 * The settings are shown to the user in the `Studio IO` panel of Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
declare interface DocumentState extends Settings {
}


export default DocumentState;
