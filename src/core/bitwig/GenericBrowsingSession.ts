import ApiProxy from './ApiProxy';
import BrowsingSession from './BrowsingSession';


class GenericBrowsingSession extends BrowsingSession {

}


/**
 * Instances of this interface are used for browsing material with bank-wise access to the filter columns.
 *
 * @see com.bitwig.base.control_surface.iface.BrowsingSession
 * @since Bitwig Studio 1.2
 */
declare interface GenericBrowsingSession extends BrowsingSession {
    /**
     * Registers an observer that reports the name of the browsing session.
     *
     * @param {int} maxCharacters
     * @param {string} textWhenUnassigned
     * @param {function} callback
     * @since Bitwig Studio 1.2
     */
    addNameObserver(maxCharacters?: number, textWhenUnassigned?: string, callback?: Function): void;
}


export default GenericBrowsingSession;
