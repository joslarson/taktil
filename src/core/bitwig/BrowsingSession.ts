import ApiProxy from './ApiProxy';


import CursorBrowserFilterColumn from './CursorBrowserFilterColumn';
import BrowserResultsColumn from './BrowserResultsColumn';
import CursorBrowserResultItem from './CursorBrowserResultItem';
import BrowserResultsItem from './BrowserResultsItem';
import BrowserFilterColumnBank from './BrowserFilterColumnBank';


class BrowsingSession extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getResults': BrowserResultsColumn,
            'getCursorResult': CursorBrowserResultItem,
            'getSettledResult': BrowserResultsItem,
            'getCursorFilter': CursorBrowserFilterColumn,
            'createFilterBank': BrowserFilterColumnBank,
        });
    }
}


/**
 * Instances of this interface are used for browsing material according to a certain type.
 * Possible material types are devices, presets, samples, multi-samples, clips, or files from your music
 * collection.
 *
 * In Bitwig Studio's contextual browser window the search sessions for the various material kinds are shown
 * in tabs. Just like the tabs in the browser window, instances of this interface provide access to multiple
 * filter columns and one result column. The filter columns are used to control the content of the results
 * column.
 *
 * @since Bitwig Studio 1.2
 */
declare interface BrowsingSession {
    /**
     * Registers an observer that reports if the browser session is available for the current context.
     *
     * @param {function} callback a callback function that receives a single boolean argument.
     * @since Bitwig Studio 1.2
     */
    addIsAvailableObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the browser session is currently active.
     *
     * @param {function} callback a callback function that receives a single boolean argument.
     * @since Bitwig Studio 1.2
     */
    addIsActiveObserver(callback?: Function): void;

    /**
     * Activates the given search session, same as calling
     * {@link Browser#activateSession Browser#activateSession(this)}.
     * Please note that only one search session can be active at a time.
     *
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    activate(): void;

    /**
     * Returns an object that represents the column which shows the results according to the current
     * filter settings in Bitwig Studio's contextual browser.
     *
     * @return {BrowserResultsColumn} the requested results browser column.
     * @since Bitwig Studio 1.2
     */
    getResults(): BrowserResultsColumn;

    /**
     * Returns an object used for navigating the entries in the results column of Bitwig Studio's
     * contextual browser.
     *
     * @return {CursorBrowserResultItem} the requested cursor object.
     * @since Bitwig Studio 1.2
     */
    getCursorResult(): CursorBrowserResultItem;

    /**
     * Returns an object that represents the currently loaded material item.
     *
     * @return {BrowserResultsItem} the requested settled result object
     * @since Bitwig Studio 1.2
     */
    getSettledResult(): BrowserResultsItem;

    /**
     * Returns an object that can be used to navigate over the various filter sections of the browsing session.
     *
     * @return {CursorBrowserFilterColumn} the requested filter cursor object
     */
    getCursorFilter(): CursorBrowserFilterColumn;

    /**
     * Returns an object that provided bank-wise navigation of filter columns.
     *
     * @param {int} numColumns the number of columns that are simultaneously accessible.
     * @return {BrowserFilterColumnBank} the requested file column bank object
     * @since Bitwig Studio 1.2
     */
    createFilterBank(numColumns?: number): BrowserFilterColumnBank;

    /**
     * Registers an observer that reports the number of results available for the current filter settings.
     *
     * @param {function} callback a callback function that receives a single integer argument.
     * @since Bitwig Studio 1.2
     */
    addHitCountObserver(callback?: Function): void;
}


export default BrowsingSession;
