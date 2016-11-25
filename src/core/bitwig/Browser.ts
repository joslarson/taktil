import ApiProxy from './ApiProxy';
import MultiSampleBrowsingSession from './MultiSampleBrowsingSession';
import CursorBrowsingSession from './CursorBrowsingSession';
import ClipBrowsingSession from './ClipBrowsingSession';
import PresetBrowsingSession from './PresetBrowsingSession';
import BrowsingSessionBank from './BrowsingSessionBank';
import MusicBrowsingSession from './MusicBrowsingSession';
import BrowsingSession from './BrowsingSession';
import BooleanValue from './BooleanValue';
import SampleBrowsingSession from './SampleBrowsingSession';
import DeviceBrowsingSession from './DeviceBrowsingSession';


class Browser extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'createSessionBank': BrowsingSessionBank,
            'createCursorSession': CursorBrowsingSession,
            'getDeviceSession': DeviceBrowsingSession,
            'getPresetSession': PresetBrowsingSession,
            'getSampleSession': SampleBrowsingSession,
            'getMultiSampleSession': MultiSampleBrowsingSession,
            'getClipSession': ClipBrowsingSession,
            'getMusicSession': MusicBrowsingSession,
        });
    }
}


/**
 * Instances of this interface represent a contextual browser in Bitwig Studio.
 *
 * @since Bitwig Studio 1.2
 */
declare interface Browser {
    /**
     * Registers an observer that reports if a browsing session was started.
     *
     * @param {function} callback a callback function that receivers a single boolean parameter.
     * @since Bitwig Studio 1.2
     */
    addIsBrowsingObserver(callback?: Function): void;

    /**
     * Starts a new browser session.
     *
     * @since Bitwig Studio 1.2
     */
    startBrowsing(): void;

    /**
     * Cancels the current browser session.
     *
     * @since Bitwig Studio 1.2
     */
    cancelBrowsing(): void;

    /**
     * Finished the browser session by loading the selected item.
     *
     * @since Bitwig Studio 1.2
     */
    commitSelectedResult(): void;

    /**
     * Activates the given search session. Please note that only one search session can be active at a time.
     *
     * @param {BrowsingSession} session the session that should be activated.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.2
     */
    activateSession(session?: BrowsingSession): void;

    /**
     * Return an object allows to observe and control if the browser window should be small or full-sized.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.2
     */
    isWindowMinimized(): BooleanValue;

    /**
     * Return an object allows to observe and control if the selected result should be auditioned.
     *
     * @return {BooleanValue} a boolean value object
     * @since Bitwig Studio 1.2
     */
    shouldAudition(): BooleanValue;

    /**
     * Returns an object that provided bank-wise navigation of the available search sessions.
     * Each search session is dedicated to a certain material type, as shown in the tabs of
     * Bitwig Studio's contextual browser.
     *
     * @param {int} size the size of the windows used to navigate the available browsing sessions.
     * @return {BrowsingSessionBank} the requested file column bank object
     * @since Bitwig Studio 1.2
     */
    createSessionBank(size?: number): BrowsingSessionBank;

    /**
     * Returns an object that represents the selected tab as shown in Bitwig Studio's contextual browser window.
     *
     * @return {CursorBrowsingSession} the requested browsing session cursor
     * @since Bitwig Studio 1.2
     */
    createCursorSession(): CursorBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the device tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {DeviceBrowsingSession} the requested device browsing session instance
     * @since Bitwig Studio 1.2
     */
    getDeviceSession(): DeviceBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the preset tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {PresetBrowsingSession} the requested preset browsing session instance
     * @since Bitwig Studio 1.2
     */
    getPresetSession(): PresetBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the samples tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {SampleBrowsingSession} the requested sample browsing session instance
     * @since Bitwig Studio 1.2
     */
    getSampleSession(): SampleBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the multi-samples tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {MultiSampleBrowsingSession} the requested multi-sample browsing session instance
     * @since Bitwig Studio 1.2
     */
    getMultiSampleSession(): MultiSampleBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the clips tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {ClipBrowsingSession} the requested clip browsing session instance
     * @since Bitwig Studio 1.2
     */
    getClipSession(): ClipBrowsingSession;

    /**
     * Returns an object that provides access to the contents of the music tab as shown in Bitwig Studio's
     * contextual browser window.
     *
     * @return {MusicBrowsingSession} the requested music browsing session instance
     * @since Bitwig Studio 1.2
     */
    getMusicSession(): MusicBrowsingSession;

}


export default Browser;
