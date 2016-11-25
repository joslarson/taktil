import ApiProxy from './ApiProxy';

import ActionCategory from './ActionCategory';
import Action from './Action';


class Application extends ApiProxy {
    constructor (target) {
        super(target);
        this._extendMethodClassMap({
            'getActions': Action,
            'getAction': Action,
            'getActionCategories': ActionCategory,
            'getActionCategory': ActionCategory,
        });
    }
}


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
declare interface Application {
    /**
     * Creates a new audio track at the given position.
     *
     * @param {int} position the index within the list of main tracks where the new track should be inserted, or `-1` in case
                    the track should be inserted at the end of the list. Values outside the valid range will get
                    pinned to the valid range, so the actual position might be different from the provided
                    parameter value.
     * @since Bitwig Studio 1.1
     */
    createAudioTrack(position?: number): void;

    /**
     * Creates a new instrument track at the given position.
     *
     * @param {int} position the index within the list of main tracks where the new track should be inserted, or `-1` in case
                    the track should be inserted at the end of the list. Values outside the valid range will get
                    pinned to the valid range, so the actual position might be different from the provided
                    parameter value.
     * @since Bitwig Studio 1.1
     */
    createInstrumentTrack(position?: number): void;

    /**
     * Creates a new effect track at the given position.
     *
     * @param {int} position the index within the list of effect tracks where the new track should be inserted, or `-1` in case
                    the track should be inserted at the end of the list. Values outside the valid range will get
                    pinned to the valid range, so the actual position might be different from the provided
                    parameter value.
     * @since Bitwig Studio 1.1
     */
    createEffectTrack(position?: number): void;

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
    getActions(): Action[];

    /**
     * Returns the action for the given action identifier. For a list of available actions, see {@link #getActions()}.
     *
     * @param {string} id the action identifier string, must not be `null`
     * @return {Action} the action associated with the given id, or null in case there is no action with the given identifier.
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    getAction(id?: string): Action;

    /**
     * Returns a list of action categories that is used by Bitwig Studio to group actions into categories.
     *
     * @return {ActionCategory[]} the list of action categories
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    getActionCategories(): ActionCategory[];

    /**
     * Returns the action category associated with the given identifier.
     * For a list of available action categories, see {@link #getActionCategories()}.
     *
     * @param {string} id the category identifier string, must not be `null`
     * @return {ActionCategory} the action associated with the given id, or null in case there is no category with the given identifier
     * @throws ControlSurfaceException
     * @since Bitwig Studio 1.1
     */
    getActionCategory(id?: string): ActionCategory;

    /**
     * Activates the audio engine in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    activateEngine(): void;

    /**
     * Deactivates the audio engine in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    deactivateEngine(): void;

    /**
     * Registers an observer that gets called when the audio engine becomes active or inactive.
     *
     * @param {function} callable a callback function that accepts a single boolean parameter. The callback parameter
                    indicates whether the audio engine became active (true) or inactive (false).
     * @since Bitwig Studio 1.0
     */
    addHasActiveEngineObserver(callable?: Function): void;

    /**
     * Registers an observer that reports the name of the current project.
     *
     * @param {function} callback a callback function that accepts a single string parameter.
     * @param {int} maxChars the maximum length of the reported name. Longer names will get truncated.
     * @since Bitwig Studio 1.1
     */
    addProjectNameObserver(callback?: Function, maxChars?: number): void;

    /**
     * Switches to the next project tab in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    nextProject(): void;

    /**
     * Switches to the previous project tab in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    previousProject(): void;

    /**
     * Sends an undo command to Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    undo(): void;

    /**
     * Sends a redo command to Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    redo(): void;

    /**
     * Switches the Bitwig Studio user interface to the panel layout with the given name.
     * The list of available panel layouts depends on the active display profile.
     *
     * @param {string} panelLayout the name of the new panel layout
     * @since Bitwig Studio 1.1
     */
    setPanelLayout(panelLayout?: string): void;

    /**
     * Switches to the next panel layout of the active display profile in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    nextPanelLayout(): void;

    /**
     * Switches to the previous panel layout of the active display profile in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    previousPanelLayout(): void;

    /**
     * Registers an observer that reports the name of the active panel layout.
     *
     * @param {function} callable a callback function object that accepts a single string parameter
     * @param {int} maxChars the maximum length of the panel layout name
     * @since Bitwig Studio 1.1
     */
    addPanelLayoutObserver(callable?: Function, maxChars?: number): void;

    /**
     * Registers an observer that reports the name of the active display profile.
     *
     * @param {function} callable a callback function object that accepts a single string parameter
     * @param {int} maxChars the maximum length of the display profile name
     * @since Bitwig Studio 1.1
     */
    addDisplayProfileObserver(callable?: Function, maxChars?: number): void;

    /**
     * Toggles the visibility of the inspector panel.
     *
     * @since Bitwig Studio 1.1
     */
    toggleInspector(): void;

    /**
     * Toggles the visibility of the device chain panel.
     *
     * @since Bitwig Studio 1.0
     */
    toggleDevices(): void;

    /**
     * Toggles the visibility of the mixer panel.
     *
     * @since Bitwig Studio 1.0
     */
    toggleMixer(): void;

    /**
     * Toggles the visibility of the note editor panel.
     *
     * @since Bitwig Studio 1.0
     */
    toggleNoteEditor(): void;

    /**
     * Toggles the visibility of the automation editor panel.
     *
     * @since Bitwig Studio 1.0
     */
    toggleAutomationEditor(): void;

    /**
     * Toggles the visibility of the browser panel.
     *
     * @since Bitwig Studio 1.0
     */
    toggleBrowserVisibility(): void;

    /**
     * Equivalent to an Arrow-Left key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    arrowKeyLeft(): void;

    /**
     * Equivalent to an Arrow-Right key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    arrowKeyRight(): void;

    /**
     * Equivalent to an Arrow-Up key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    arrowKeyUp(): void;

    /**
     * Equivalent to an Arrow-Down key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    arrowKeyDown(): void;

    /**
     * Equivalent to an Enter key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    enter(): void;

    /**
     * Equivalent to an Escape key stroke on the computer keyboard.
     * The concrete functionality depends on the current keyboard focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    escape(): void;

    /**
     * Selects all items according the current selection focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    selectAll(): void;

    /**
     * Deselects any items according the current selection focus in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    selectNone(): void;

    /**
     * Cuts the selected items in Bitwig Studio if applicable.
     *
     * @since Bitwig Studio 1.0
     */
    cut(): void;

    /**
     * Copies the selected items in Bitwig Studio to the clipboard if applicable.
     *
     * @since Bitwig Studio 1.0
     */
    copy(): void;

    /**
     * Pastes the clipboard contents into the current selection focus in Bitwig Studio if applicable.
     *
     * @since Bitwig Studio 1.0
     */
    paste(): void;

    /**
     * Duplicates the active selection in Bitwig Studio if applicable.
     *
     * @since Bitwig Studio 1.0
     */
    duplicate(): void;

    /**
     * Deletes the selected items in Bitwig Studio if applicable. Originally this function was called
     * `delete` (Bitwig Studio 1.0). But as `delete` is reserved in JavaScript this function got renamed to `remove`
     * in Bitwig Studio 1.0.9.
     *
     * @since Bitwig Studio 1.0.9
     */
    remove(): void;

    /**
     * Opens a text input field in Bitwig Studio for renaming the selected item.
     *
     * @since Bitwig Studio 1.0
     */
    rename(): void;

    /**
     * Zooms in one step into the currently focused editor of the Bitwig Studio user interface.
     *
     * @since Bitwig Studio 1.0
     */
    zoomIn(): void;

    /**
     * Zooms out one step in the currently focused editor of the Bitwig Studio user interface.
     *
     * @since Bitwig Studio 1.0
     */
    zoomOut(): void;

    /**
     * Adjusts the zoom level of the currently focused editor so that it matches the active selection.
     *
     * @since Bitwig Studio 1.0
     */
    zoomToSelection(): void;

    /**
     * Adjusts the zoom level of the currently focused editor so that all content becomes visible.
     *
     * @since Bitwig Studio 1.0
     */
    zoomToFit(): void;

    /**
     * Moves the panel focus to the panel on the left of the currently focused panel.
     *
     * @since Bitwig Studio 1.0
     */
    focusPanelToLeft(): void;

    /**
     * Moves the panel focus to the panel right to the currently focused panel.
     *
     * @since Bitwig Studio 1.0
     */
    focusPanelToRight(): void;

    /**
     * Moves the panel focus to the panel above the currently focused panel.
     *
     * @since Bitwig Studio 1.0
     */
    focusPanelAbove(): void;

    /**
     * Moves the panel focus to the panel below the currently focused panel.
     *
     * @since Bitwig Studio 1.0
     */
    focusPanelBelow(): void;

    /**
     * Toggles between full screen and windowed user interface.
     *
     * @since Bitwig Studio 1.0
     */
    toggleFullScreen(): void;

}


export default Application;
