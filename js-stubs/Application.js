/* API Version - 1.3.13 */

/**
 * An interface that provides methods for accessing the most common global application commands.<br/>
 * 
 * In addition, functions are provided for accessing any application action in a generic and categorized way,
 * pretty much as displayed in the Bitwig Studio commander dialog (see {@link #getActions()},
 * {@link #getAction(String)}, {@link #getActionCategories()}), {@link #getActionCategory(String)}).<br/>
 * 
 * To receive an instance of the application interface call {@link Host#createApplication()}.
 *
 * @since Bitwig Studio 1.0
 */
function Application() {}

/**
 * Creates a new audio track at the given position.
 *
 * @param {int} position the index within the list of main tracks where the new track should be inserted, or `-1` in case
                the track should be inserted at the end of the list. Values outside the valid range will get
                pinned to the valid range, so the actual position might be different from the provided
                parameter value.
 * @since Bitwig Studio 1.1
 */
Application.prototype.createAudioTrack = function(position) {};

/**
 * Creates a new instrument track at the given position.
 *
 * @param {int} position the index within the list of main tracks where the new track should be inserted, or `-1` in case
                the track should be inserted at the end of the list. Values outside the valid range will get
                pinned to the valid range, so the actual position might be different from the provided
                parameter value.
 * @since Bitwig Studio 1.1
 */
Application.prototype.createInstrumentTrack = function(position) {};

/**
 * Creates a new effect track at the given position.
 *
 * @param {int} position the index within the list of effect tracks where the new track should be inserted, or `-1` in case
                the track should be inserted at the end of the list. Values outside the valid range will get
                pinned to the valid range, so the actual position might be different from the provided
                parameter value.
 * @since Bitwig Studio 1.1
 */
Application.prototype.createEffectTrack = function(position) {};

/**
 * Returns a list of actions that the application supports. Actions are commands in Bitwig Studio that
 * are typically accessible through menus or keyboard shortcuts.
 * 
 * Please note that many of the commands encapsulated by the reported actions are also accessible through other
 * (probably more convenient) interfaces methods of the API. In contrast to that, this method provides a more
 * generic way to find available application functionality.
 *
 * @return {Action[]} the list of actions
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Application.prototype.getActions = function() {};

/**
 * Returns the action for the given action identifier. For a list of available actions, see {@link #getActions()}.
 *
 * @param {string} id the action identifier string, must not be `null`
 * @return {Action} the action associated with the given id, or null in case there is no action with the given identifier.
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Application.prototype.getAction = function(id) {};

/**
 * Returns a list of action categories that is used by Bitwig Studio to group actions into categories.
 *
 * @return {ActionCategory[]} the list of action categories
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Application.prototype.getActionCategories = function() {};

/**
 * Returns the action category associated with the given identifier.
 * For a list of available action categories, see {@link #getActionCategories()}.
 *
 * @param {string} id the category identifier string, must not be `null`
 * @return {ActionCategory} the action associated with the given id, or null in case there is no category with the given identifier
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Application.prototype.getActionCategory = function(id) {};

/**
 * Activates the audio engine in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.activateEngine = function() {};

/**
 * Deactivates the audio engine in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.deactivateEngine = function() {};

/**
 * Registers an observer that gets called when the audio engine becomes active or inactive.
 *
 * @param {function} callable a callback function that accepts a single boolean parameter. The callback parameter
                indicates whether the audio engine became active (true) or inactive (false).
 * @since Bitwig Studio 1.0
 */
Application.prototype.addHasActiveEngineObserver = function(callable) {};

/**
 * Registers an observer that reports the name of the current project.
 *
 * @param {function} callback a callback function that accepts a single string parameter.
 * @param {int} maxChars the maximum length of the reported name. Longer names will get truncated.
 * @since Bitwig Studio 1.1
 */
Application.prototype.addProjectNameObserver = function(callback, maxChars) {};

/**
 * Switches to the next project tab in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.nextProject = function() {};

/**
 * Switches to the previous project tab in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.previousProject = function() {};

/**
 * Sends an undo command to Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.undo = function() {};

/**
 * Sends a redo command to Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.redo = function() {};

/**
 * Switches the Bitwig Studio user interface to the panel layout with the given name.
 * The list of available panel layouts depends on the active display profile.
 *
 * @param {string} panelLayout the name of the new panel layout
 * @since Bitwig Studio 1.1
 */
Application.prototype.setPanelLayout = function(panelLayout) {};

/**
 * Switches to the next panel layout of the active display profile in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
Application.prototype.nextPanelLayout = function() {};

/**
 * Switches to the previous panel layout of the active display profile in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
Application.prototype.previousPanelLayout = function() {};

/**
 * Registers an observer that reports the name of the active panel layout.
 *
 * @param {function} callable a callback function object that accepts a single string parameter
 * @param {int} maxChars the maximum length of the panel layout name
 * @since Bitwig Studio 1.1
 */
Application.prototype.addPanelLayoutObserver = function(callable, maxChars) {};

/**
 * Registers an observer that reports the name of the active display profile.
 *
 * @param {function} callable a callback function object that accepts a single string parameter
 * @param {int} maxChars the maximum length of the display profile name
 * @since Bitwig Studio 1.1
 */
Application.prototype.addDisplayProfileObserver = function(callable, maxChars) {};

/**
 * Toggles the visibility of the inspector panel.
 *
 * @since Bitwig Studio 1.1
 */
Application.prototype.toggleInspector = function() {};

/**
 * Toggles the visibility of the controller chain panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleControllers = function() {};

/**
 * Toggles the visibility of the mixer panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleMixer = function() {};

/**
 * Toggles the visibility of the note editor panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleNoteEditor = function() {};

/**
 * Toggles the visibility of the automation editor panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleAutomationEditor = function() {};

/**
 * Toggles the visibility of the browser panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleBrowserVisibility = function() {};

/**
 * Equivalent to an Arrow-Left key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.arrowKeyLeft = function() {};

/**
 * Equivalent to an Arrow-Right key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.arrowKeyRight = function() {};

/**
 * Equivalent to an Arrow-Up key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.arrowKeyUp = function() {};

/**
 * Equivalent to an Arrow-Down key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.arrowKeyDown = function() {};

/**
 * Equivalent to an Enter key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.enter = function() {};

/**
 * Equivalent to an Escape key stroke on the computer keyboard.
 * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.escape = function() {};

/**
 * Selects all items according the current selection focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.selectAll = function() {};

/**
 * Deselects any items according the current selection focus in Bitwig Studio.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.selectNone = function() {};

/**
 * Cuts the selected items in Bitwig Studio if applicable.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.cut = function() {};

/**
 * Copies the selected items in Bitwig Studio to the clipboard if applicable.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.copy = function() {};

/**
 * Pastes the clipboard contents into the current selection focus in Bitwig Studio if applicable.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.paste = function() {};

/**
 * Duplicates the active selection in Bitwig Studio if applicable.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.duplicate = function() {};

/**
 * Deletes the selected items in Bitwig Studio if applicable. Originally this function was called
 * `delete` (Bitwig Studio 1.0). But as `delete` is reserved in JavaScript this function got renamed to `remove`
 * in Bitwig Studio 1.0.9.
 *
 * @since Bitwig Studio 1.0.9
 */
Application.prototype.remove = function() {};

/**
 * Opens a text input field in Bitwig Studio for renaming the selected item.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.rename = function() {};

/**
 * Zooms in one step into the currently focused editor of the Bitwig Studio user interface.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.zoomIn = function() {};

/**
 * Zooms out one step in the currently focused editor of the Bitwig Studio user interface.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.zoomOut = function() {};

/**
 * Adjusts the zoom level of the currently focused editor so that it matches the active selection.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.zoomToSelection = function() {};

/**
 * Adjusts the zoom level of the currently focused editor so that all content becomes visible.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.zoomToFit = function() {};

/**
 * Moves the panel focus to the panel on the left of the currently focused panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.focusPanelToLeft = function() {};

/**
 * Moves the panel focus to the panel right to the currently focused panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.focusPanelToRight = function() {};

/**
 * Moves the panel focus to the panel above the currently focused panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.focusPanelAbove = function() {};

/**
 * Moves the panel focus to the panel below the currently focused panel.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.focusPanelBelow = function() {};

/**
 * Toggles between full screen and windowed user interface.
 *
 * @since Bitwig Studio 1.0
 */
Application.prototype.toggleFullScreen = function() {};
