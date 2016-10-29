/* API Version - 1.3.13 */

/**
 * Instances of this interface represent a contextual browser in Bitwig Studio.
 *
 * @since Bitwig Studio 1.2
 */
function Browser() {}

/**
 * Registers an observer that reports if a browsing session was started.
 *
 * @param {function} callback a callback function that receivers a single boolean parameter.
 * @since Bitwig Studio 1.2
 */
Browser.prototype.addIsBrowsingObserver = function(callback) {};

/**
 * Starts a new browser session.
 *
 * @since Bitwig Studio 1.2
 */
Browser.prototype.startBrowsing = function() {};

/**
 * Cancels the current browser session.
 *
 * @since Bitwig Studio 1.2
 */
Browser.prototype.cancelBrowsing = function() {};

/**
 * Finished the browser session by loading the selected item.
 *
 * @since Bitwig Studio 1.2
 */
Browser.prototype.commitSelectedResult = function() {};

/**
 * Activates the given search session. Please note that only one search session can be active at a time.
 *
 * @param {BrowsingSession} session the session that should be activated.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.2
 */
Browser.prototype.activateSession = function(session) {};

/**
 * Return an object allows to observe and control if the browser window should be small or full-sized.
 *
 * @return {BooleanValue} a boolean value object
 * @since Bitwig Studio 1.2
 */
Browser.prototype.isWindowMinimized = function() {};

/**
 * Return an object allows to observe and control if the selected result should be auditioned.
 *
 * @return {BooleanValue} a boolean value object
 * @since Bitwig Studio 1.2
 */
Browser.prototype.shouldAudition = function() {};

/**
 * Returns an object that provided bank-wise navigation of the available search sessions.
 * Each search session is dedicated to a certain material type, as shown in the tabs of
 * Bitwig Studio's contextual browser.
 *
 * @param {int} size the size of the windows used to navigate the available browsing sessions.
 * @return {BrowsingSessionBank} the requested file column bank object
 * @since Bitwig Studio 1.2
 */
Browser.prototype.createSessionBank = function(size) {};

/**
 * Returns an object that represents the selected tab as shown in Bitwig Studio's contextual browser window.
 *
 * @return {CursorBrowsingSession} the requested browsing session cursor
 * @since Bitwig Studio 1.2
 */
Browser.prototype.createCursorSession = function() {};

/**
 * Returns an object that provides access to the contents of the controller tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {ControllerBrowsingSession} the requested controller browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getControllerSession = function() {};

/**
 * Returns an object that provides access to the contents of the preset tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {PresetBrowsingSession} the requested preset browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getPresetSession = function() {};

/**
 * Returns an object that provides access to the contents of the samples tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {SampleBrowsingSession} the requested sample browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getSampleSession = function() {};

/**
 * Returns an object that provides access to the contents of the multi-samples tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {MultiSampleBrowsingSession} the requested multi-sample browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getMultiSampleSession = function() {};

/**
 * Returns an object that provides access to the contents of the clips tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {ClipBrowsingSession} the requested clip browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getClipSession = function() {};

/**
 * Returns an object that provides access to the contents of the music tab as shown in Bitwig Studio's
 * contextual browser window.
 *
 * @return {MusicBrowsingSession} the requested music browsing session instance
 * @since Bitwig Studio 1.2
 */
Browser.prototype.getMusicSession = function() {};
