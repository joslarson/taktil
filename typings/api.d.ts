declare namespace api {
    /**
     * Instances of this interface represent actions in Bitwig Studio, such as commands that
     * can be launched from the main menu or via keyboard shortcuts.
     *
     * To receive the list of all actions provided by Bitwig Studio call {@link Application#getActions()}.
     * The list of actions that belong to a certain category can be queried by calling {@link ActionCategory#getActions()}.
     * Access to specific actions is provided in {@link Application#getAction(String)}.
     *
     * @since Bitwig Studio 1.1
     */
    class Action {
        /**
         * Returns a string the identifies this action uniquely.
         *
         * @return {string} the identifier string
         * @since Bitwig Studio 1.1
         */
        getId(): string;

        /**
         * Returns the name of this action.
         *
         * @return {string} the name string
         * @since Bitwig Studio 1.1
         */
        getName(): string;

        /**
         * Returns the category of this action.
         *
         * @return {ActionCategory} the category string
         * @since Bitwig Studio 1.1
         */
        getCategory(): ActionCategory;

        /**
         * Returns the text that is displayed in menu items associated with this action.
         *
         * @return {string} the menu item text
         * @since Bitwig Studio 1.1
         */
        getMenuItemText(): string;

        /**
         * Invokes the action.
         *
         * @since Bitwig Studio 1.1
         */
        invoke(): void;

    }

    /**
     * Instances of this interface are used to categorize actions in Bitwig Studio.
     * The list of action categories provided by Bitwig Studio can be queried by calling
     * {@link Application#getActionCategories()}. To receive a specific action category
     * call {@link Application#getActionCategory(String)}.
     *
     * @see Application#getActionCategories()
     * @see Application#getActionCategory(String)
     * @since Bitwig Studio 1.1
     */
    class ActionCategory {
        /**
         * Returns a string the identifies this action category uniquely.
         *
         * @return {string} the identifier string
         * @since Bitwig Studio 1.1
         */
        getId(): string;

        /**
         * Returns the name of this action category.
         *
         * @return {string} the name string
         * @since Bitwig Studio 1.1
         */
        getName(): string;

        /**
         * Lists all actions in this category.
         *
         * @return {Action[]} the array of actions in this category
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getActions(): Action[];

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
    class Application {
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

    /**
     * An interface representing various commands which can be performed on the Bitwig Studio arranger.<br/>
     *
     * To receive an instance of the application interface call {@link Host#createArranger}.
     *
     * @since Bitwig Studio 1.0
     */
    class Arranger {
        /**
         * Gets an object that allows to enable/disable arranger playback follow. Observers can be registered on
         * the returned object for receiving notifications when the setting switches between on and off.
         *
         * @return {BooleanValue} a boolean value object that represents the enabled state of arranger playback follow
         * @since Bitwig Studio 1.1
         */
        isPlaybackFollowEnabled(): BooleanValue;

        /**
         * Gets an object that allows to control the arranger track height. Observers can be registered on
         * the returned object for receiving notifications when the track height changes.
         *
         * @return {BooleanValue} a boolean value object that has the state `true` when the tracks have double row height
                and `false` when the tracks have single row height.
         * @since Bitwig Studio 1.1
         */
        hasDoubleRowTrackHeight(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the cue markers in the arranger panel. Observers can be registered on
         * the returned object for receiving notifications when the cue marker lane switches between shown and hidden.
         *
         * @return {BooleanValue} a boolean value object that represents the cue marker section visibility
         * @since Bitwig Studio 1.1
         */
        areCueMarkersVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the clip launcher in the arranger panel. Observers can be registered
         * on the returned object for receiving notifications when the clip launcher switches between shown and hidden.
         *
         * @return {BooleanValue} a boolean value object that represents the clip launcher visibility
         * @since Bitwig Studio 1.1
         */
        isClipLauncherVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the timeline in the arranger panel. Observers can be registered
         * on the returned object for receiving notifications when the timeline switches between shown and hidden.
         *
         * @return {BooleanValue} a boolean value object that represents the timeline visibility
         * @since Bitwig Studio 1.1
         */
        isTimelineVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the track input/output choosers in the arranger panel. Observers can
         * be registered on the returned object for receiving notifications when the I/O section switches between shown
         * and hidden.
         *
         * @return {BooleanValue} a boolean value object that represents the visibility of the track I/O section
         * @since Bitwig Studio 1.1
         */
        isIoSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the effect tracks in the arranger panel. Observers can be registered on
         * the returned object for receiving notifications when the effect track section switches between shown and hidden.
         *
         * @return {BooleanValue} a boolean value object that represents the visibility of the effect track section
         * @since Bitwig Studio 1.1
         */
        areEffectTracksVisible(): BooleanValue;

    }

    /**
     * Instances of this interface represent ranged parameters that can be controlled with automation in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    class AutomatableRangedValue extends RangedValue {
        /**
         * Adds an observer which reports changes to the name of the automated parameter. The callback will get called
         * at least once immediately after calling this method for reporting the current name.
         *
         * @param {int} maxChars maximum length of the string sent to the observer
         * @param {string} textWhenUnassigned the default text to use
         * @param {function} callback a callback function that receives a single string parameter
         * @since Bitwig Studio 1.0
         */
        addNameObserver(maxChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Adds an observer which sends a formatted text representation of the value whenever the value changes.
         * The callback will get called at least once immediately after calling this method for reporting the current state.
         *
         * @param {int} maxChars maximum length of the string sent to the observer
         * @param {string} textWhenUnassigned the default text to use
         * @param {function} callback a callback function that receives a single string parameter
         * @since Bitwig Studio 1.0
         */
        addValueDisplayObserver(maxChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Resets the value to its default.
         *
         * @since Bitwig Studio 1.0
         */
        reset(): void;

        /**
         * Touch (or un-touch) the value for automation recording.
         *
         * @param {boolean} isBeingTouched `true` for touching, `false` for un-touching
         * @since Bitwig Studio 1.0
         */
        touch(isBeingTouched?: boolean): void;

        /**
         * Specifies if this value should be indicated as mapped in Bitwig Studio, which is visually shown as colored dots
         * or tinting on the parameter controls.
         *
         * @param {boolean} shouldIndicate `true` in case visual indications should be shown in Bitwig Studio,
                              `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setIndication(shouldIndicate?: boolean): void;

        /**
         * Specifies a label for the mapped hardware parameter as shown in Bitwig Studio, for example in menu items for
         * learning controls.
         *
         * @param {string} label the label to be shown in Bitwig Studio
         * @since Bitwig Studio 1.0
         */
        setLabel(label?: string): void;

        /**
         * Restores control of this parameter to automation playback.
         *
         * @since 1.1
         */
        restoreAutomationControl(): void;

    }

    /**
     * Instances of this interface represent beat time values.
     *
     * @since Bitwig Studio 1.0
     */
    class BeatTime extends RangedValue {
        /**
         * Registers an observer that reports the internal beat time value as formatted text, for example "012:03:00:01".
         *
         * @param {string} separator the character used to separate the segments of the formatted beat time, typically ":", "." or "-"
         * @param {int} barsLen the number of digits reserved for bars
         * @param {int} beatsLen the number of digits reserved for beats
         * @param {int} subdivisionLen the number of digits reserved for beat subdivisions
         * @param {int} ticksLen the number of digits reserved for ticks
         * @param {function} callback a callback function that receives a single string parameter
         * @since Bitwig Studio 1.0
         */
        addTimeObserver(separator?: string, barsLen?: number, beatsLen?: number, subdivisionLen?: number, ticksLen?: number, callback?: Function): void;

        /**
         * Adds an observer which receives the internal raw value of the parameter as floating point value.
         *
         * @param {function} callback a callback function that receives a single floating point parameter with double precision.
         * @since Bitwig Studio 1.0
         */
        addRawValueObserver(callback?: Function): void;

        /**
         * Sets the internal (raw) value.
         *
         * @param {double} value a numeric value with double-precision. Range is undefined.
         * @since Bitwig Studio 1.0
         */
        setRaw(value?: number): void;

        /**
         * Increments / decrements the internal (raw) value by the given delta.
         *
         * @param {double} delta the amount that gets added to the internal value.
         * @since Bitwig Studio 1.0
         */
        incRaw(delta?: number): void;

    }

    /**
     * Instances of this interface are used for browsing Bitwig Studio document such as devices, presets,
     * multi-samples, or clips. Full access to all filter columns and the result column as shown in
     * Bitwig Studio's contextual browser window is provided.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class BitwigBrowsingSession extends BrowsingSession {
        /**
         * Returns the creator filter as shown in the category column of Bitwig Studio's contextual browser.
         *
         * @return {BrowserFilterColumn} the requested creator filter object.
         * @since Bitwig Studio 1.2
         */
        getCreatorFilter(): BrowserFilterColumn;

        /**
         * Returns the tags filter as shown in the category column of Bitwig Studio's contextual browser.
         *
         * @return {BrowserFilterColumn} the requested tags filter object.
         * @since Bitwig Studio 1.2
         */
        getTagsFilter(): BrowserFilterColumn;

    }

    /**
     * Instances of this interface represent boolean values.
     *
     * @since Bitwig Studio 1.0
     */
    class BooleanValue extends Value {
        /**
         * Sets the internal value.
         *
         * @param {boolean} value the new boolean value.
         * @since Bitwig Studio 1.0
         */
        set(value?: boolean): void;

        /**
         * Toggles the current state. In case the current value is `false`, the new value will be `true` and
         * the other way round.
         *
         * @since Bitwig Studio 1.0
         */
        toggle(): void;

    }

    /**
     * Instances of this interface represent a contextual browser in Bitwig Studio.
     *
     * @since Bitwig Studio 1.2
     */
    class Browser {
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

    /**
     * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserColumn {
        /**
         * Registers an observer that reports if the column exists.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addExistsObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total count of column entries
         * (not the size of the column window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.2
         */
        addEntryCountObserver(callback?: Function): void;

        /**
         * Returns the cursor item, which can be used to navigate over the list of entries.
         *
         * @return {BrowserItem} the requested filter item object
         * @since Bitwig Studio 1.2
         */
        createCursorItem(): BrowserItem;

        /**
         * Returns an object that provides access to a bank of successive entries using a window configured with the
         * given size, that can be scrolled over the list of entries.
         *
         * @param {int} size the number of simultaneously accessible items
         * @return {BrowserItemBank} the requested item bank object
         */
        createItemBank(size?: number): BrowserItemBank;

    }

    /**
     * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserFilterColumn extends BrowserColumn {
        /**
         * Returns the filter item that represents the top-level all/any/everything wildcard item.
         *
         * @return {BrowserFilterItem} the requested filter item object
         * @since Bitwig Studio 1.2
         */
        getWildcardItem(): BrowserFilterItem;

        /**
         * Returns the cursor filter item, which can be used to navigate over the list of entries.
         *
         * @return {BrowserFilterItem} the requested filter item object
         * @since Bitwig Studio 1.2
         */
        createCursorItem(): BrowserFilterItem;

        /**
         * Returns an object that provides access to a bank of successive entries using a window configured with the
         * given size, that can be scrolled over the list of entries.
         *
         * @param {int} size the number of simultaneously accessible items
         * @return {BrowserFilterItemBank} the requested item bank object
         */
        createItemBank(size?: number): BrowserFilterItemBank;

        /**
         * Registers an observer that reports the name of the filter column.
         *
         * @param {int} maxCharacters
         * @param {string} textWhenUnassigned
         * @param {function} callback
         * @since Bitwig Studio 1.2
         */
        addNameObserver(maxCharacters?: number, textWhenUnassigned?: string, callback?: Function): void;

    }

    /**
     * Instances of this interface are used to navigate the columns of a Bitwig Studio browser session.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserFilterColumnBank {
        /**
         * Returns the window size that was used to configure the filter column during creation.
         *
         * @return {int} the size of the filter column.
         */
        getSize(): number;

        /**
         * Returns the filter column for the given index.
         *
         * @param {int} index the item index, must be in the range `[0..getSize-1]`
         * @return {BrowserFilterColumn} the requested filter column object
         */
        getItem(index?: number): BrowserFilterColumn;

        /**
         * Scrolls the filter columns one item up.
         *
         * @since Bitwig Studio 1.2
         */
        scrollUp(): void;

        /**
         * Scrolls the filter columns one item down.
         *
         * @since Bitwig Studio 1.2
         */
        scrollDown(): void;

        /**
         * Scrolls the filter columns one page up.
         * For example if the bank is configured with a window size of 8 entries and is currently showing items
         * [1..8], calling this method would scroll the window to show columns [9..16].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageUp(): void;

        /**
         * Scrolls the filter columns one page up.
         * For example if the bank is configured with a window size of 8 entries and is currently showing items
         * [9..16], calling this method would scroll the window to show columns [1..8].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageDown(): void;

        /**
         * Registers an observer that reports the current scroll position, more specifically the position of the first
         * item within the underlying list of columns, that is shown as the first column within the window.
         *
         * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                        the scroll position, or `-1` in case the column has no content.
         * @since Bitwig Studio 1.2
         */
        addScrollPositionObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the columns can be scrolled further up.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the columns can be scrolled further down.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total count of columns
         * (not the size of the window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.2
         */
        addEntryCountObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface represent entries in a browser filter column.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserFilterItem extends BrowserItem {
        /**
         * Registers an observer that reports the hit count of the filter item.
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.2
         */
        addHitCountObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface are used to navigate a filter column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserFilterItemBank extends BrowserItemBank {
        /**
         * Returns the filter item for the given index.
         *
         * @param {int} index the item index, must be in the range `[0..getSize-1]`
         * @return {BrowserFilterItem} the requested filter item object
         * @since Bitwig Studio 1.2
         */
        getItem(index?: number): BrowserFilterItem;

    }

    /**
     * Instances of this interface represent entries in a browser filter column.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserItem {
        /**
         * Registers an observer that reports if the item exists.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addExistsObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the string value of the browser item.
         *
         * @param {int} maxCharacters
         * @param {string} textWhenUnassigned
         * @param {function} callback a callback function that receives a single string argument
         * @since Bitwig Studio 1.2
         */
        addValueObserver(maxCharacters?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Returns an object that provides access to the selected state of the browser item.
         *
         * @return {BooleanValue} an boolean value object
         * @since Bitwig Studio 1.2
         */
        isSelected(): BooleanValue;

    }

    /**
     * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserItemBank {
        /**
         * Returns the window size that was used to configure the filter column during creation.
         *
         * @return {int} the size of the filter column.
         * @since Bitwig Studio 1.2
         */
        getSize(): number;

        /**
         * Returns the item for the given index.
         *
         * @param {int} index the item index, must be in the range `[0..getSize-1]`
         * @return {BrowserItem} the requested item object
         * @since Bitwig Studio 1.2
         */
        getItem(index?: number): BrowserItem;

        /**
         * Scrolls the filter column entries one item up.
         *
         * @since Bitwig Studio 1.2
         */
        scrollUp(): void;

        /**
         * Scrolls the filter column entries one item down.
         *
         * @since Bitwig Studio 1.2
         */
        scrollDown(): void;

        /**
         * Scrolls the filter column entries one page up.
         * For example if the column is configured with a window size of 8 entries and is currently showing items
         * [1..8], calling this method would scroll the column to show items [9..16].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageUp(): void;

        /**
         * Scrolls the filter column entries one page up.
         * For example if the column is configured with a window size of 8 entries and is currently showing items
         * [9..16], calling this method would scroll the column to show items [1..8].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageDown(): void;

        /**
         * Registers an observer that reports the current scroll position, more specifically the position of the first
         * item within the underlying list of entries, that is shown as the first entry within the window.
         *
         * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                        the scroll position, or `-1` in case the column has no content.
         * @since Bitwig Studio 1.2
         */
        addScrollPositionObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the column entries can be scrolled further up.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the column entries can be scrolled further down.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollDownObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface are used to navigate a results column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserResultsColumn extends BrowserColumn {
        /**
         * Returns the cursor result item, which can be used to navigate over the list of entries.
         *
         * @return {BrowserResultsItem} the requested filter item object
         * @since Bitwig Studio 1.2
         */
        createCursorItem(): BrowserResultsItem;

        /**
         * Returns an object that provides access to a bank of successive entries using a window configured with the
         * given size, that can be scrolled over the list of entries.
         *
         * @param {int} size the number of simultaneously accessible items
         * @return {BrowserResultsItemBank} the requested item bank object
         */
        createItemBank(size?: number): BrowserResultsItemBank;

    }

    /**
     * Instances of this interface represent entries in a browser results column.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserResultsItem extends BrowserItem {
    }

    /**
     * Instances of this interface are used to navigate the results column in the Bitwig Studio browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowserResultsItemBank extends BrowserItemBank {
        /**
         * Returns the result item for the given index.
         *
         * @param {int} index the item index, must be in the range `[0..getSize-1]`
         * @return {BrowserResultsItem} the requested results item object
         * @since Bitwig Studio 1.2
         */
        getItem(index?: number): BrowserResultsItem;

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
    class BrowsingSession {
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

    /**
     * Instances of this interface are used to navigate the available sessions in Bitwig Studio's contextual browser.
     * The sessions are shown as tabs in the graphical user interface of the browser.
     *
     * @since Bitwig Studio 1.2
     */
    class BrowsingSessionBank {
        /**
         * Returns the window size that was used to configure the session bank during creation.
         *
         * @return {int} the size of the session bank.
         * @since Bitwig Studio 1.2
         */
        getSize(): number;

        /**
         * Returns the browser session for the given index.
         *
         * @param {int} index the session index, must be in the range `[0..getSize-1]`
         * @return {GenericBrowsingSession} the requested browser session object
         * @since Bitwig Studio 1.2
         */
        getSession(index?: number): GenericBrowsingSession;

        /**
         * Scrolls the browser sessions one item up.
         *
         * @since Bitwig Studio 1.2
         */
        scrollUp(): void;

        /**
         * Scrolls the browser sessions one item down.
         *
         * @since Bitwig Studio 1.2
         */
        scrollDown(): void;

        /**
         * Scrolls the browser sessions one page up.
         * For example if the bank is configured with a window size of 8 entries and is currently showing items
         * [1..8], calling this method would scroll the window to show items [9..16].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageUp(): void;

        /**
         * Scrolls the filter columns one page up.
         * For example if the bank is configured with a window size of 8 entries and is currently showing items
         * [9..16], calling this method would scroll the window to show items [1..8].
         *
         * @since Bitwig Studio 1.2
         */
        scrollPageDown(): void;

        /**
         * Registers an observer that reports the current scroll position, more specifically the position of the first
         * item within the underlying list of browser sessions, that is shown as the first session within the window.
         *
         * @param {function} callback a callback function that receives a single integer number parameter. The parameter reflects
                        the scroll position, or `-1` in case the column has no content.
         * @since Bitwig Studio 1.2
         */
        addScrollPositionObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the browser sessions can be scrolled further up.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the browser sessions can be scrolled further down.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.2
         */
        addCanScrollDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total count of browser sessions
         * (not the size of the window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.2
         */
        addEntryCountObserver(callback?: Function): void;

    }

    /**
     * This interface defines access to the common attributes and operations of channels, such as tracks or nested
     * device channels.
     *
     * @since Bitwig Studio 1.0
     */
    class Channel extends DeviceChain {
        /**
         * Returns an object that represents the activated state of the channel.
         *
         * @return {BooleanValue} an object that provides access to the channels activated state.
         * @since Bitwig Studio 1.1.1
         */
        isActivated(): BooleanValue;

        /**
         * Gets a representation of the channels volume control.
         *
         * @return {AutomatableRangedValue} an object that provides access to the channels volume control.
         * @since Bitwig Studio 1.0
         */
        getVolume(): AutomatableRangedValue;

        /**
         * Gets a representation of the channels pan control.
         *
         * @return {AutomatableRangedValue} an object that provides access to the channels pan control.
         * @since Bitwig Studio 1.0
         */
        getPan(): AutomatableRangedValue;

        /**
         * Gets a representation of the channels mute control.
         *
         * @return {Value} an object that provides access to the channels mute control.
         * @since Bitwig Studio 1.0
         */
        getMute(): Value;

        /**
         * Gets a representation of the channels solo control.
         *
         * @return {SoloValue} an object that provides access to the channels solo control.
         * @since Bitwig Studio 1.0
         */
        getSolo(): SoloValue;

        /**
         * Registers an observer for the VU-meter of this track.
         *
         * @param {int} range the number of steps to which the reported values should be scaled. For example a range of 128 would
                     cause the callback to be called with values between 0 and 127.
         * @param {int} channel 0 for left channel, 1 for right channel, -1 for the sum of both
         * @param {boolean} peak when `true` the peak value is reported, otherwise the RMS value
         * @param {function} callback a callback function that takes a single numeric argument. The value is in the range [0..range-1].
         * @throws com.bitwig.base.control_surface.ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        addVuMeterObserver(range?: number, channel?: number, peak?: boolean, callback?: Function): void;

        /**
         * Registers an observer that reports notes when they are played on the channel.
         *
         * @param {function} callback a callback function that receives three parameters:
                        1. on/off state (boolean), 2. key (int), and 3. velocity (float).
         * @since Bitwig Studio 1.0
         */
        addNoteObserver(callback?: Function): void;

        /**
         * Registers an observer that receives notifications about the color of the channel.
         * The callback gets called at least once immediately after this function call to report the current color.
         * Additional calls are fired each time the color changes.
         *
         * @param {function} callback a callback function that receives three float parameters in the range [0..1]:
                        1. red, 2. green, and 3. blue.
         * @since Bitwig Studio 1.0
         */
        addColorObserver(callback?: Function): void;

        /**
         * Gets a representation of the channels send control at the given index.
         *
         * @param {int} index the index of the send, must be valid
         * @return {AutomatableRangedValue} an object that provides access to the requested send control.
         * @since Bitwig Studio 1.0
         */
        getSend(index?: number): AutomatableRangedValue;

        /**
         * Selects the device chain in the Bitwig Studio mixer, in case it is a selectable object.
         *
         * @since Bitwig Studio 1.1.1
         */
        selectInMixer(): void;

        /**
         * Registers an observer that reports if the device chain is selected in Bitwig Studio mixer.
         *
         * @param {function} callback a callback function that takes a single boolean parameter.
         * @since Bitwig Studio 1.1.1
         */
        addIsSelectedInMixerObserver(callback?: Function): void;

    }

    /**
     * A channel bank provides access to a range of channels in Bitwig Studio, such as tracks or device layers.
     * Instances of channel bank are typically configured with support for a fixed number of channels and
     * represent an excerpt of a larger list of channels. Various methods are provided for scrolling to different
     * sections of the channel list. It basically acts like a window moving over the list of channels.
     *
     * @since Bitwig Studio 1.0
     */
    class ChannelBank {
        /**
         * Returns the channel for the given index.
         *
         * @param {int} indexInBank the channel index within this bank, not the index within the list of all Bitwig Studio
                           channels. Must be in the range [0..sizeOfBank-1].
         * @return {Channel} the channel object
         * @since Bitwig Studio 1.0
         */
        getChannel(indexInBank?: number): Channel;

        /**
         * Sets the step size used for scrolling the channel bank.
         *
         * @param {int} stepSize the step size used for scrolling. Default is `1`.
         * @since Bitwig Studio 1.0
         */
        setChannelScrollStepSize(stepSize?: number): void;

        /**
         * Scrolls the channels one page up. For example if the channel bank is configured with a window size of
         * 8 channels and is currently showing channel [1..8], calling this method would scroll the channel bank
         * to show channel [9..16].
         *
         * @since Bitwig Studio 1.0
         */
        scrollChannelsPageUp(): void;

        /**
         * Scrolls the channels one page up. For example if the channel bank is configured with a window size of
         * 8 channels and is currently showing channel [9..16], calling this method would scroll the channel bank
         * to show channel [1..8].
         *
         * @since Bitwig Studio 1.0
         */
        scrollChannelsPageDown(): void;

        /**
         * Scrolls the channel window up by the amount specified via {@link #setChannelScrollStepSize(int)}
         * (by default one channel).
         *
         * @since Bitwig Studio 1.0
         */
        scrollChannelsUp(): void;

        /**
         * Scrolls the channel window down by the amount specified via {@link #setChannelScrollStepSize(int)}
         * (by default one channel).
         *
         * @since Bitwig Studio 1.0
         */
        scrollChannelsDown(): void;

        /**
         * Scrolls the channel bank window so that the channel at the given position becomes visible.
         *
         * @param {int} position the index of the channel within the underlying full list of channels (not the index within
                        the bank). The position is typically directly related to the layout of the channel list in
                        Bitwig Studio, starting with zero in case of the first channel.
         * @since Bitwig Studio 1.0
         */
        scrollToChannel(position?: number): void;

        /**
         * Registers an observer that reports the current scroll position, more specifically the position of the first
         * channel within the underlying list of channels, that is shown as channel zero within the bank.
         *
         * @param {function} callback a callback function that receives a single integer number parameter
         * @param {int} valueWhenUnassigned a default value for the channel position that gets reported in case the channel bank
                                   is not connected to a list of channels in Bitwig Studio.
         * @since Bitwig Studio 1.0
         */
        addChannelScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

        /**
         * Registers an observer that reports if the channel bank can be scrolled further up.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollChannelsUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the channel bank can be scrolled further down.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollChannelsDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total channel count
         * (not the number of channels available in the bank window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.0
         */
        addChannelCountObserver(callback?: Function): void;

        /**
         * Scrolls the sends one page up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollSendsPageUp(): void;

        /**
         * Scrolls the sends one page down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollSendsPageDown(): void;

        /**
         * Scrolls the sends one step up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollSendsUp(): void;

        /**
         * Scrolls the sends one step down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollSendsDown(): void;

        /**
         * Registers an observer that reports if the sends window can be scrolled further up.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollSendsUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the sends window can be scrolled further down.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollSendsDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total send count
         * (not the number of sends available in the bank window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.0
         */
        addSendCountObserver(callback?: Function): void;

    }

    /**
     * An interface that provides access to the contents of a clip in Bitwig Studio.
     *
     * The note content of the clip is exposed in terms of steps and keys, mainly targeted to x-y-grid applications
     * such as step sequencers.
     *
     * @since Bitwig Studio 1.0
     */
    class Clip {
        /**
         * Scroll the note grid so that the given key becomes visible.
         *
         * @param {int} key the key that should become visible
         * @since Bitwig Studio 1.0
         */
        scrollToKey(key?: number): void;

        /**
         * Scrolls the note grid keys one page up. For example if the note grid is configured to show 12 keys
         * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [48..59].
         *
         * @since Bitwig Studio 1.0
         */
        scrollKeysPageUp(): void;

        /**
         * Scrolls the note grid keys one page down. For example if the note grid is configured to show 12 keys
         * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [48..59].
         *
         * @since Bitwig Studio 1.0
         */
        scrollKeysPageDown(): void;

        /**
         * Scrolls the note grid keys one key up. For example if the note grid is configured to show 12 keys
         * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [37..48].
         *
         * @since Bitwig Studio 1.0
         */
        scrollKeysStepUp(): void;

        /**
         * Scrolls the note grid keys one key down. For example if the note grid is configured to show 12 keys
         * and is currently showing keys [36..47], calling this method would scroll the note grid to key range [35..46].
         *
         * @since Bitwig Studio 1.0
         */
        scrollKeysStepDown(): void;

        /**
         * Scroll the note grid so that the given step becomes visible.
         *
         * @param {int} step the step that should become visible
         * @since Bitwig Studio 1.0
         */
        scrollToStep(step?: number): void;

        /**
         * Scrolls the note grid steps one page forward. For example if the note grid is configured to show 16 steps
         * and is currently showing keys [0..15], calling this method would scroll the note grid to key range [16..31].
         *
         * @since Bitwig Studio 1.0
         */
        scrollStepsPageForward(): void;

        /**
         * Scrolls the note grid steps one page backwards. For example if the note grid is configured to show 16 steps
         * and is currently showing keys [16..31], calling this method would scroll the note grid to key range [0..16].
         *
         * @since Bitwig Studio 1.0
         */
        scrollStepsPageBackwards(): void;

        /**
         * Scrolls the note grid steps one step forward. For example if the note grid is configured to show 16 steps
         * and is currently showing keys [0..15], calling this method would scroll the note grid to key range [1..16].
         *
         * @since Bitwig Studio 1.0
         */
        scrollStepsStepForward(): void;

        /**
         * Scrolls the note grid steps one step backwards. For example if the note grid is configured to show 16 steps
         * and is currently showing keys [1..16], calling this method would scroll the note grid to key range [0..15].
         *
         * @since Bitwig Studio 1.0
         */
        scrollStepsStepBackwards(): void;

        /**
         * Registers an observer that reports if the note grid keys can be scrolled further up.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.0
         */
        addCanScrollKeysUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the note grid keys can be scrolled further down.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.0
         */
        addCanScrollKeysDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the note grid steps can be scrolled backwards.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.0
         */
        addCanScrollStepsBackwardsObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the note grid keys can be scrolled forward.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.0
         */
        addCanScrollStepsForwardObserver(callback?: Function): void;

        /**
         * Toggles the existence of a note in the note grid cell specified by the given x and y arguments.
         *
         * @param {int} x the x position within the note grid, defining the step/time of the target note
         * @param {int} y the y position within the note grid, defining the key of the target note
         * @param {int} insertVelocity the velocity of the target note in case a new note gets inserted
         * @since Bitwig Studio 1.0
         */
        toggleStep(x?: number, y?: number, insertVelocity?: number): void;

        /**
         * Creates a note in the grid cell specified by the given x and y arguments. Existing notes are overwritten.
         *
         * @param {int} x the x position within the note grid, defining the step/time of the new note
         * @param {int} y the y position within the note grid, defining the key of the new note
         * @param {int} insertVelocity the velocity of the new note
         * @param {double} insertDuration the duration of the new note
         * @since Bitwig Studio 1.0
         */
        setStep(x?: number, y?: number, insertVelocity?: number, insertDuration?: number): void;

        /**
         * Removes the note in the grid cell specified by the given x and y arguments. Calling this method does nothing
         * in case no note exists at the given x-y-coordinates.
         *
         * @param {int} x the x position within the note grid, defining the step/time of the target note
         * @param {int} y the y position within the note grid, defining the key of the target note
         * @since Bitwig Studio 1.0
         */
        clearStep(x?: number, y?: number): void;

        /**
         * Selects the note in the grid cell specified by the given x and y arguments, in case there actually is a note
         * at the given x-y-coordinates.
         *
         * @param {int} x the x position within the note grid, defining the step/time of the target note
         * @param {int} y the y position within the note grid, defining the key of the target note
         * @param {boolean} clearCurrentSelection `true` if the existing selection should be cleared,
                                     {@false} if the note should be added to the current selection.
         * @since Bitwig Studio 1.0
         */
        selectStepContents(x?: number, y?: number, clearCurrentSelection?: boolean): void;

        /**
         * Sets the beat time duration that is represented by one note grid step.
         *
         * @param {double} lengthInBeatTime the length of one note grid step in beat time.
         * @since Bitwig Studio 1.0
         */
        setStepSize(lengthInBeatTime?: number): void;

        /**
         * Registers an observer that reports which note grid steps/keys contain notes.
         *
         * @param {function} callback A callback function that receives three parameters:
                        1. the x (step) coordinate within the note grid (integer),
                        2. the y (key) coordinate within the note grid (integer), and
                        3. a boolean value that indicates if the step is enabled (`true`) or disabled (`false`).
         * @since Bitwig Studio 1.0
         */
        addStepDataObserver(callback?: Function): void;

        /**
         * Registers an observer that reports note grid cells as they get played by the sequencer.
         *
         * @param {function} callback A callback function that receives a single integer parameter, which reflects the step coordinate
                        that is played, or -1 if no step is associated with the current playback position.
         * @since Bitwig Studio 1.0
         */
        addPlayingStepObserver(callback?: Function): void;

        /**
         * Updates the name of the clip.
         *
         * @param {string} name the new clip name
         * @since Bitwig Studio 1.0
         */
        setName(name?: string): void;

        /**
         * Returns shuffle settings of the clip.
         *
         * @return {BooleanValue} the value object that represents the clips shuffle setting.
         * @since Bitwig Studio 1.0
         */
        getShuffle(): BooleanValue;

        /**
         * Returns accent setting of the clip.
         *
         * @return {RangedValue} the ranged value object that represents the clips accent setting.
         * @since Bitwig Studio 1.0
         */
        getAccent(): RangedValue;

        /**
         * Returns the start of the clip in beat time.
         *
         * @return {BeatTime} the beat time object that represents the clips start time.
         * @since Bitwig Studio 1.1
         */
        getPlayStart(): BeatTime;

        /**
         * Returns the length of the clip in beat time.
         *
         * @return {BeatTime} the beat time object that represents the duration of the clip.
         * @since Bitwig Studio 1.1
         */
        getPlayStop(): BeatTime;

        /**
         * Returns an object that provides access to the loop enabled state of the clip.
         *
         * @return {BooleanValue} a boolean value object.
         * @since Bitwig Studio 1.1
         */
        isLoopEnabled(): BooleanValue;

        /**
         * Returns the loop start time of the clip in beat time.
         *
         * @return {BeatTime} the beat time object that represents the clips loop start time.
         * @since Bitwig Studio 1.1
         */
        getLoopStart(): BeatTime;

        /**
         * Returns the loop length of the clip in beat time.
         *
         * @return {BeatTime} the beat time object that represents the clips loop length.
         * @since Bitwig Studio 1.1
         */
        getLoopLength(): BeatTime;

    }

    /**
     * Instances of this interface are used for browsing clips, including access to all filter columns and the
     * result column as shown in the 'Clips' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class ClipBrowsingSession extends BrowsingSession {
        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    /**
     * An abstract interface that represents the clip launcher scenes or slots of a single track.
     *
     * @since Bitwig Studio 1.0
     */
    class ClipLauncherScenesOrSlots {
        /**
         * Launches the scene/slot with the given index.
         *
         * @param {int} slot the index of the slot that should be launched
         * @since Bitwig Studio 1.0
         */
        launch(slot?: number): void;

        /**
         * Stops clip launcher playback for the associated track.
         *
         * @since Bitwig Studio 1.0
         */
        stop(): void;

        /**
         * Performs a return-to-arrangement operation on the related track, which caused playback to be taken over by the
         * arrangement sequencer.
         *
         * @since Bitwig Studio 1.0
         */
        returnToArrangement(): void;

        /**
         * Registers an observer that reports the names of the scenes and slots. The slot names reflect the names of
         * containing clips.
         *
         * @param {function} callback a callback function receiving two parameters:
                        1. the slot index (integer) within the configured window, and
                        2. the name of the scene/slot (string)
         * @since Bitwig Studio 1.0
         */
        addNameObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface represent a scrollable fixed-size window that is connected to a section
     * of the clip launcher slots for a specific track.
     *
     * @since Bitwig Studio 1.0
     */
    class ClipLauncherSlots extends ClipLauncherScenesOrSlots {
        /**
         * Selects the slot with the given index.
         *
         * @param {int} slot the index of the slot within the slot window.
         * @since Bitwig Studio 1.0
         */
        select(slot?: number): void;

        /**
         * Starts recording into the slot with the given index.
         *
         * @param {int} slot the index of the slot within the slot window.
         * @since Bitwig Studio 1.0
         */
        record(slot?: number): void;

        /**
         * Makes the clip content of the slot with the given index visible in the note or audio editor.
         *
         * @param {int} slot the index of the slot within the slot window.
         * @since Bitwig Studio 1.0
         */
        showInEditor(slot?: number): void;

        /**
         * Creates an new clip in the slot with the given index.
         *
         * @param {int} slot
         * @param {int} lengthInBeats
         * @since Bitwig Studio 1.0
         */
        createEmptyClip(slot?: number, lengthInBeats?: number): void;

        /**
         * Deletes the clip in the slot with the given index.
         *
         * @param {int} slot the index of the slot within the slot window.
         * @since Bitwig Studio 1.2
         */
        deleteClip(slot?: number): void;

        /**
         * Registers an observer that reports selection changes for the slots inside the window.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index is selected (`true`)
                        or not (`false`)
         * @since Bitwig Studio 1.0
         */
        addIsSelectedObserver(callback?: Function): void;

        /**
         * Registers an observer that reports which slots contain clips.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index contains a clip (`true`)
                        or not (`false`)
         * @since Bitwig Studio 1.0
         */
        addHasContentObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the playback state of clips / slots. The reported states include
         * `stopped`, `playing`, `recording`, but also `queued for stop`, `queued for playback`, `queued for recording`.
         *
         * @param {function} callback a callback function that receives three parameters:
                        1. the slot index (integer),
                        2. the queued or playback state: `0` when stopped, `1` when playing, or `2` when recording, and
                        3. a boolean parameter indicating if the second argument is referring to the queued state
                           (`true`) or the actual playback state (`false`)
         * @since Bitwig Studio 1.1
         */
        addPlaybackStateObserver(callback?: Function): void;

        /**
         * Registers an observer that reports which slots have clips that are currently playing.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index has a clip that is currently playing
                        (`true`) or not (`false`)
         * @since Bitwig Studio 1.0
         */
        addIsPlayingObserver(callback?: Function): void;

        addIsQueuedObserver(callback?: Function): void; // TODO: Missing, added manually

        /**
         * Registers an observer that reports which slots have clips that are currently recording.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index has a clip that is currently recording
                        (`true`) or not (`false`)
         * @since Bitwig Studio 1.0
         */
        addIsRecordingObserver(callback?: Function): void;

        /**
         * Add an observer if clip playback is queued on the slot.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                           for playback (`true`) or not (`false`)
         * @since Bitwig Studio 1.1
         */
        addIsPlaybackQueuedObserver(callback?: Function): void;

        /**
         * Add an observer if clip recording is queued on the slot.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                           for recording (`true`) or not (`false`)
         * @since Bitwig Studio 1.1
         */
        addIsRecordingQueuedObserver(callback?: Function): void;

        /**
         * Add an observer if clip playback is queued to stop on the slot.
         *
         * @param {function} callback a callback function that receives two parameters:
                        1. the slot index (integer), and
                        2. a boolean parameter indicating if the slot at that index has a clip that is currently queued
                           for stop (`true`) or not (`false`)
         * @since Bitwig Studio 1.1
         */
        addIsStopQueuedObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the colors of clip in the current slot window.
         *
         * @param {function} callback a callback function that receives four parameters:
                        1. the slot index (integer),
                        2. the red coordinate of the RBG color value,
                        3. the green coordinate of the RBG color value, and
                        4. the blue coordinate of the RBG color value
         * @since Bitwig Studio 1.0
         */
        addColorObserver(callback?: Function): void;

        /**
         * Specifies if the Bitwig Studio clip launcher should indicate which slots are part of the window.
         * By default indications are disabled.
         *
         * @param {boolean} shouldIndicate `true` if visual indications should be enabled, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setIndication(shouldIndicate?: boolean): void;

    }

    /**
     * A generic interface that provides the foundation for working with selections.
     *
     * Implementations of this interface can either represent custom selection cursors that are created by controller
     * scripts, or represent the cursor of user selections as shown in Bitwig Studio editors, such as the Arranger
     * track selection cursor, the note editor event selection cursor and so on.
     *
     * @since Bitwig Studio 1.1
     */
    class Cursor {
        /**
         * Select the previous item.
         *
         * @since Bitwig Studio 1.1
         */
        selectPrevious(): void;

        /**
         * Select the next item.
         *
         * @since Bitwig Studio 1.1
         */
        selectNext(): void;

        /**
         * Select the first item.
         *
         * @since Bitwig Studio 1.1
         */
        selectFirst(): void;

        /**
         * Select the last item.
         *
         * @since Bitwig Studio 1.1
         */
        selectLast(): void;

        /**
         * Registers a function with bool argument that gets called when the previous item gains or remains selectability.
         *
         * @param {function} callback
         * @since Bitwig Studio 1.1
         */
        addCanSelectPreviousObserver(callback?: Function): void;

        /**
         * Registers a function with bool argument that gets called when the next item gains or remains selectability.
         *
         * @param {function} callback
         * @since Bitwig Studio 1.1
         */
        addCanSelectNextObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface are used to navigate the filter columns of a Bitwig Studio browsing session.
     *
     * @since Bitwig Studio 1.2
     */
    class CursorBrowserFilterColumn extends BrowserFilterColumn {
    }

    /**
     * Instances of this interface represent entries in a browser filter column.
     *
     * @since Bitwig Studio 1.2
     */
    class CursorBrowserFilterItem extends BrowserFilterItem {
        /**
         * Select the parent item.
         *
         * @since Bitwig Studio 1.2
         */
        selectParent(): void;

        /**
         * Select the first child item.
         *
         * @since Bitwig Studio 1.2
         */
        selectFirstChild(): void;

        /**
         * Select the last child item.
         *
         * @since Bitwig Studio 1.2
         */
        selectLastChild(): void;

        /**
         * Select the previous item.
         *
         * @since Bitwig Studio 1.1
         */
        moveToPrevious(): void;

        /**
         * Select the next item.
         *
         * @since Bitwig Studio 1.1
         */
        moveToNext(): void;

        /**
         * Select the first item.
         *
         * @since Bitwig Studio 1.1
         */
        moveToFirst(): void;

        /**
         * Select the last item.
         *
         * @since Bitwig Studio 1.1
         */
        moveToLast(): void;

        /**
         * Select the parent item.
         *
         * @since Bitwig Studio 1.2
         */
        moveToParent(): void;

        /**
         * Move the cursor to the first child item.
         *
         * @since Bitwig Studio 1.2
         */
        moveToFirstChild(): void;

        /**
         * Move the cursor to the last child item.
         *
         * @since Bitwig Studio 1.2
         */
        moveToLastChild(): void;

    }

    /**
     * Instances of this interface represent entries in a browser filter column.
     *
     * @since Bitwig Studio 1.2
     */
    class CursorBrowserItem extends BrowserItem {
        /**
         * Returns a bank object that provides access to the siblings of the cursor item.
         * The bank will automatically scroll so that the cursor item is always visible.
         *
         * @param {int} numSiblings the number of simultaneously accessible siblings
         * @return {BrowserItemBank} the requested item bank object
         */
        createSiblingsBank(numSiblings?: number): BrowserItemBank;

    }

    /**
     * Instances of this interface represent entries in a browser column.
     *
     * @since Bitwig Studio 1.2
     */
    class CursorBrowserResultItem extends BrowserResultsItem {
    }

    /**
     * Instances of this interface are used for navigating the various browsing sessions of
     * Bitwig Studio's contextual browser.
     *
     * @since Bitwig Studio 1.2
     */
    class CursorBrowsingSession extends GenericBrowsingSession {
    }

    /**
     * A special kind of channel that follows a channel selection cursor in Bitwig Studio. The selection can either be a
     * custom selection cursor that gets created by the controller script, or represent the user selection cursor as shown
     * in the Bitwig Studio editors, such as the Arranger track selection cursor.
     *
     * @since Bitwig Studio 1.1
     */
    class CursorChannel extends Cursor {
        /**
         * Points the cursor to the given channel.
         *
         * @param {Channel} channel the channel that this channel cursor should point to
         * @since Bitwig Studio 1.2
         */
        selectChannel(channel?: Channel): void;

    }

    /**
     * A special kind of selection cursor used for devices.
     *
     * @since Bitwig Studio 1.1
     */
    class CursorDevice extends Cursor {
        /**
         * Returns the channel that this cursor device was created on.
         * Currently this will always be a track or cursor track instance.
         *
         * @return {Channel} the track or cursor track object that was used for creation of this cursor device.
         * @since Bitwig Studio 1.1
         */
        getChannel(): Channel;

        /**
         * Selects the parent device if there is any.
         *
         * @since Bitwig Studio 1.1
         */
        selectParent(): void;

        /**
         * Moves this cursor to the given device.
         *
         * @param {Device} device the device that this cursor should point to
         * @since Bitwig Studio 1.1
         */
        selectDevice(device?: Device): void;

        /**
         * Selects the first device in the given channel.
         *
         * @param {Channel} channel the channel in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectFirstInChannel(channel?: Channel): void;

        /**
         * Selects the last device in the given channel.
         *
         * @param {Channel} channel the channel in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectLastInChannel(channel?: Channel): void;

        /**
         * Selects the first device in the nested FX slot with the given name.
         *
         * @param {string} chain the name of the FX slot in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectFirstInSlot(chain?: string): void;

        /**
         * Selects the last device in the nested FX slot with the given name.
         *
         * @param {string} chain the name of the FX slot in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectLastInSlot(chain?: string): void;

        /**
         * Selects the first device in the drum pad associated with the given key.
         *
         * @param {int} key the key associated with the drum pad in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectFirstInKeyPad(key?: number): void;

        /**
         * Selects the last device in the drum pad associated with the given key.
         *
         * @param {int} key the key associated with the drum pad in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectLastInKeyPad(key?: number): void;

        /**
         * Selects the first device in the nested layer with the given index.
         *
         * @param {int} index the index of the nested layer in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectFirstInLayer(index?: number): void;

        /**
         * Selects the last device in the nested layer with the given index.
         *
         * @param {int} index the index of the nested layer in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectLastInLayer(index?: number): void;

        /**
         * Selects the first device in the nested layer with the given name.
         *
         * @param {string} name the name of the nested layer in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectFirstInLayer(name?: string): void;

        /**
         * Selects the last device in the nested layer with the given name.
         *
         * @param {string} name the name of the nested layer in which the device should be selected
         * @since Bitwig Studio 1.1
         */
        selectLastInLayer(name?: string): void;

    }

    /**
     * Instances of this interface represent the cursor item in device layer selections.
     *
     * @since Bitwig Studio 1.1
     */
    class CursorDeviceLayer extends CursorChannel {
    }

    /**
     * Instances of this interface represent the selected device slot as shown in the Bitwig Studio user interface.
     *
     * @since Bitwig Studio 1.1.6
     */
    class CursorDeviceSlot extends DeviceChain {
        /**
         * @param {string} slot
         */
        selectSlot(slot?: string): void;

    }

    /**
     * Instances of this interface represent the cursor item of track selections.
     *
     * @since Bitwig Studio 1.2
     */
    class None {
    }

    /**
     * Instances of this interface represent the cursor item of track selections.
     *
     * @since Bitwig Studio 1.1
     */
    class CursorTrack extends CursorChannel {
        /**
         * Makes the cursor track point to it's parent group track, in case it is not already pointing to the
         * root group track.
         *
         * @since Bitwig Studio 1.2
         */
        selectParent(): void;

        /**
         * Specifies the behaviour of the functions {@link #selectPrevious()}, {@link #selectNext()},
         * {@link #selectFirst()} and {@link #selectLast()}. Calling those functions can either navigate the cursor
         * within the current nesting level, or over a flat list of either all tracks or only the expanded tracks.
         * Default is CursorNavigationMode.FLAT.
         *
         * @param {CursorNavigationMode} mode
         * @since Bitwig Studio 1.2
         */
         setCursorNavigationMode(mode?): void;
        //  setCursorNavigationMode(mode?: CursorNavigationMode): void;

    }

    /**
     * This interface represents a device in Bitwig Studio, both internal devices and plugins.
     *
     * @since Bitwig Studio 1.0
     */
    class Device {
        /**
         * Returns a representation of the device chain that contains this device.
         * Possible device chain instances are tracks, device layers, drums pads, or FX slots.
         *
         * @return {DeviceChain} the requested device chain object
         * @since Bitwig Studio 1.1.6
         */
        getDeviceChain(): DeviceChain;

        /**
         * Registers an observer that reports the position of the device within the parent device chain.
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.1
         */
        addPositionObserver(callback?: Function): void;

        /**
         * Returns an object that provides access to the open state of plugin windows.
         *
         * @return {BooleanValue} a boolean value object that represents the open state of the editor window,
                in case the device features a custom editor window (such as plugins).
         * @since Bitwig Studio 1.1
         */
        isWindowOpen(): BooleanValue;

        /**
         * Returns an object that provides access to the expanded state of the device.
         *
         * @return {BooleanValue} a boolean value object that represents the expanded state of the device.
         * @since Bitwig Studio 1.1
         */
        isExpanded(): BooleanValue;

        /**
         * Returns an object that provides access to the visibility of the device macros section.
         *
         * @return {BooleanValue} a boolean value object that represents the macro section visibility.
         * @since Bitwig Studio 1.1
         */
        isMacroSectionVisible(): BooleanValue;

        /**
         * Returns an object that provides access to the visibility of the parameter page mapping editor.
         *
         * @return {BooleanValue} a boolean value object that represents visibility of the parameter page mapping editor.
         * @since Bitwig Studio 1.1
         */
        isParameterPageSectionVisible(): BooleanValue;

        /**
         * Returns the parameter with the given index in the current parameter page.
         *
         * @param {int} indexInPage the index of the parameter within the current parameter page.
         * @return {AutomatableRangedValue} an object that provides access to the requested parameter
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getParameter(indexInPage?: number): AutomatableRangedValue;

        /**
         * Returns the parameter with the given index in the envelope parameter page.
         *
         * @param {int} index the index of the parameter within the envelope parameter page.
         * @return {AutomatableRangedValue} an object that provides access to the requested parameter
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getEnvelopeParameter(index?: number): AutomatableRangedValue;

        /**
         * Returns the parameter with the given index in the common parameter page.
         *
         * @param {int} index the index of the parameter within the common parameter page.
         * @return {AutomatableRangedValue} an object that provides access to the requested parameter
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getCommonParameter(index?: number): AutomatableRangedValue;

        /**
         * Returns the modulation source at the given index.
         *
         * @param {int} index the index of the modulation source
         * @return {ModulationSource} An object that represents the requested modulation source
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getModulationSource(index?: number): ModulationSource;

        /**
         * Returns the macro control at the given index.
         *
         * @param {int} index the index of the macro control, must be in the range [0..7]
         * @return {Macro} An object that represents the requested macro control
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getMacro(index?: number): Macro;

        /**
         * Registers an observer that reports if the device is selected.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.0
         */
        addHasSelectedDeviceObserver(callback?: Function): void;

        /**
         * Selects the device in Bitwig Studio.
         *
         * @since Bitwig Studio 1.2
         */
        selectInEditor(): void;

        /**
         * Registers an observer that reports if the device is a plugin.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.2
         */
        addIsPluginObserver(callback?: Function): void;

        /**
         * Switches to the previous parameter page.
         *
         * @since Bitwig Studio 1.0
         */
        previousParameterPage(): void;

        /**
         * Switches to the next parameter page.
         *
         * @since Bitwig Studio 1.0
         */
        nextParameterPage(): void;

        /**
         * Registers an observer that reports if there is a previous parameter page.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addPreviousParameterPageEnabledObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if there is a next parameter page.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addNextParameterPageEnabledObserver(callback?: Function): void;

        /**
         * Switches to the parameter page at the given page index.
         *
         * @param {int} page the index of the desired parameter page
         * @since Bitwig Studio 1.0
         */
        setParameterPage(page?: number): void;

        /**
         * Returns an object used for browsing devices and presets.
         *
         * @param {int} numFilterColumnEntries the size of the window used to navigate the filter column entries.
         * @param {int} numResultsColumnEntries the size of the window used to navigate the results column entries.
         * @return {Browser} the requested device browser object.
         * @since Bitwig Studio 1.2
         */
        createDeviceBrowser(numFilterColumnEntries?: number, numResultsColumnEntries?: number): Browser;

        /**
         * Registers an observer that reports the name of the device.
         *
         * @param {int} len the maximum length of the name. Longer names will get truncated.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single name (string) parameter
         * @since Bitwig Studio 1.0
         */
        addNameObserver(len?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the last loaded preset name.
         *
         * @param {int} len the maximum length of the name. Longer names will get truncated.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single name (string) parameter
         * @since Bitwig Studio 1.0
         */
        addPresetNameObserver(len?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the current preset category name.
         *
         * @param {int} len the maximum length of the name. Longer names will get truncated.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single name (string) parameter
         * @since Bitwig Studio 1.0
         */
        addPresetCategoryObserver(len?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the current preset creator name.
         *
         * @param {int} len the maximum length of the name. Longer names will get truncated.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single name (string) parameter
         * @since Bitwig Studio 1.0
         */
        addPresetCreatorObserver(len?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the currently selected parameter page.
         *
         * @param {int} valueWhenUnassigned the default page index that gets reported when the device is not associated
                                   with a device instance in Bitwig Studio yet.
         * @param {function} callback a callback function that receives a single page index parameter (integer)
         * @since Bitwig Studio 1.0
         */
        addSelectedPageObserver(valueWhenUnassigned?: number, callback?: Function): void;

        /**
         * Registers an observer that reports the name of the active modulation source.
         *
         * @param {int} len the maximum length of the name. Longer names will get truncated.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single name parameter (string)
         * @since Bitwig Studio 1.0
         */
        addActiveModulationSourceObserver(len?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the names of the devices parameter pages.
         *
         * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                        parameter pages
         * @since Bitwig Studio 1.0
         */
        addPageNamesObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the names of the available presets for the device according to the
         * current configuration of preset category and creator filtering.
         *
         * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                        presets for the current category and creator filter.
         * @since Bitwig Studio 1.1
         */
        addPresetNamesObserver(callback?: Function): void;

        /**
         * Loads the preset with the index from the list provided by {@link #addPresetNamesObserver}.
         *
         * @param {int} index
         * @since Bitwig Studio 1.1
         */
        loadPreset(index?: number): void;

        /**
         * Registers an observer that reports the names of the available preset categories for the device.
         *
         * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                        preset categories
         * @since Bitwig Studio 1.0
         */
        addPresetCategoriesObserver(callback?: Function): void;

        /**
         * Sets the preset category filter with the index from the array provided by {@link #addPresetCategoriesObserver}.
         *
         * @param {int} index
         * @since Bitwig Studio 1.0
         */
        setPresetCategory(index?: number): void;

        /**
         * Registers an observer that reports the names of the available preset creators for the device.
         *
         * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                        preset creators
         * @since Bitwig Studio 1.0
         */
        addPresetCreatorsObserver(callback?: Function): void;

        /**
         * Sets the preset creator filter with the index from the list provided by {@link #addPresetCreatorsObserver}.
         *
         * @param {int} index
         * @since Bitwig Studio 1.0
         */
        setPresetCreator(index?: number): void;

        /**
         * Toggles the enabled state of the device.
         *
         * @since Bitwig Studio 1.0
         */
        toggleEnabledState(): void;

        /**
         * Registers an observer that reports if the device is enabled.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addIsEnabledObserver(callback?: Function): void;

        /**
         * Indicates if the device has nested device chains in FX slots.
         * Use {@link #addSlotsObserver(Callable) addSlotsObserver(Callable)} to get a list of available slot names,
         * and navigate to devices in those slots using the {@link CursorDevice} interface.
         *
         * @return {Value} a value object that indicates if the device has nested device chains in FX slots.
         * @since Bitwig Studio 1.1
         */
        hasSlots(): Value;

        /**
         * Registers an observer that gets notified when the list of available FX slots changes.
         *
         * @param {function} callback a callback function which takes a single string array argument that contains
                        the names of the slots.
         * @since Bitwig Studio 1.1
         */
        addSlotsObserver(callback?: Function): void;

        /**
         * Returns an object that represents the selected device slot as shown in the user interface,
         * and that provides access to the contents of slot's device chain.
         *
         * @return {DeviceSlot} the requested slot cursor object
         * @since Bitwig Studio 1.1.6
         */
        getCursorSlot(): DeviceSlot;

        /**
         * Indicates if the device is contained by another device.
         *
         * @return {BooleanValue} a value object that indicates if the device is nested
         * @since Bitwig Studio 1.1.2
         */
        isNested(): BooleanValue;

        /**
         * Indicates if the device supports nested layers.
         *
         * @return {BooleanValue} a value object that indicates if the device supports nested layers.
         * @since Bitwig Studio 1.1
         */
        hasLayers(): BooleanValue;

        /**
         * Indicates if the device has individual device chains for each note value.
         *
         * @return {BooleanValue} a value object that indicates if the device has individual device chains for each note value.
         * @since Bitwig Studio 1.1
         */
        hasDrumPads(): BooleanValue;

        /**
         * Create a bank for navigating the nested layers of the device using a fixed-size window.
         *
         * @param {int} numChannels the number of channels that the device layer bank should be configured with
         * @return {DeviceLayerBank} a device layer bank object configured with the desired number of channels
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createLayerBank(numChannels?: number): DeviceLayerBank;

        /**
         * Create a bank for navigating the nested layers of the device using a fixed-size window.
         *
         * @param {int} numPads the number of channels that the drum pad bank should be configured with
         * @return {DrumPadBank} a drum pad bank object configured with the desired number of pads
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createDrumPadBank(numPads?: number): DrumPadBank;

        /**
         * Returns a device layer instance that can be used to navigate the layers or drum pads of the device,
         * in case it has any.
         *
         * @return {CursorDeviceLayer} a cursor device layer instance
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createCursorLayer(): CursorDeviceLayer;

        /**
         * Adds an observer on a list of all parameters for the device.
         *
         * The callback always updates with an array containing all the IDs for the device.
         *
         * @param {function} callback function with the signature (String[])
         * @since Bitwig Studio 1.1
         */
        addDirectParameterIdObserver(callback?: Function): void;

        /**
         * Adds an observer for the parameter names (initial and changes) of all parameters for the device.
         *
         * @param {int} maxChars maximum length of the string sent to the observer.
         * @param {function} callback function with the signature (String ID, String name)
         * @since Bitwig Studio 1.1
         */
        addDirectParameterNameObserver(maxChars?: number, callback?: Function): void;

        /**
         * Returns an observer that reports changes of parameter display values, i.e. parameter values
         *  formatted as a string to be read by the user, for example "-6.02 dB". The returned observer object can be
         *  used to configure which parameters should be observed. By default no parameters are observed. It should
         *  be avoided to observe all parameters at the same time for performance reasons.
         *
         * @param {int} maxChars maximum length of the string sent to the observer.
         * @param {function} callback function with the signature (String ID, String valueDisplay)
         * @return {DirectParameterValueDisplayObserver} an observer object that can be used to enable or disable actual observing for certain parameters.
         * @since Bitwig Studio 1.1
         */
        addDirectParameterValueDisplayObserver(maxChars?: number, callback?: Function): DirectParameterValueDisplayObserver;

        /**
         * Adds an observer for the parameter display value (initial and changes) of all parameters for the device.
         *
         * @param {function} callback a callback function with the signature (String ID, float normalizedValue).
                        If the value is not accessible 'Number.NaN' (not-a-number) is reported, can be
                        checked with 'isNaN(value)'.
         * @since Bitwig Studio 1.1
         */
        addDirectParameterNormalizedValueObserver(callback?: Function): void;

        /**
         * Sets the parameter with the specified `id` to the given `value` according to the given `resolution`.
         *
         * @param {string} id the parameter identifier string
         * @param {number} value the new value normalized to the range [0..resolution-1]
         * @param {number} resolution the resolution of the new value
         * @since Bitwig Studio 1.1
         */
        setDirectParameterValueNormalized(id?: string, value?: number, resolution?: number): void;

        /**
         * Increases the parameter with the specified `id` by the given `increment` according to the given `resolution`.
         * To decrease the parameter value pass in a negative increment.
         *
         * @param {string} id the parameter identifier string
         * @param {number} increment the amount that the parameter value should be increased by,
                         normalized to the range [0..resolution-1]
         * @param {number} resolution the resolution of the new value
         * @since Bitwig Studio 1.1
         */
        incDirectParameterValueNormalized(id?: string, increment?: number, resolution?: number): void;

        /**
         * Registers an observer that reports the file name of the currently loaded sample,
         * in case the device is a sample container device.
         *
         * @param {int} maxChars maximum length of the string sent to the observer.
         * @param {string} textWhenUnassigned the default name that gets reported when the device is not associated
                                  with a Bitwig Studio device yet.
         * @param {function} callback a callback function that receives a single string parameter.
         */
        addSampleNameObserver(maxChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Returns an object that provides bank-wise navigation of sibling devices of the same device chain
         * (including the device instance used to create the siblings bank).
         *
         * @param {int} numDevices the number of devices that are simultaneously accessible
         * @return {DeviceBank} the requested device bank object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1.6
         */
        createSiblingsDeviceBank(numDevices?: number): DeviceBank;

    }

    /**
     * This interface is used for navigation of device chains in Bitwig Studio.
     * Instances are configured with a fixed number of devices and provide access to a excerpt
     * of the devices inside a device chain. Various methods are provided for scrolling to different sections
     * of the device chain. It basically acts like a window moving over the devices.
     *
     * To receive an instance of DeviceBank call {@link Track#createDeviceBank}.
     *
     * @see {@link Track#createDeviceBank}
     * @since Bitwig Studio 1.1
     */
    class DeviceBank {
        /**
         * Returns the object that was used to instantiate this device bank.
         * Possible device chain instances are tracks, device layers, drums pads, or FX slots.
         *
         * @return {DeviceChain} the requested device chain object
         * @since Bitwig Studio 1.1
         */
        getDeviceChain(): DeviceChain;

        /**
         * Returns the device at the given index within the bank.
         *
         * @param {int} indexInBank the device index within this bank, not the position within the device chain.
                           Must be in the range [0..sizeOfBank-1].
         * @return {Device} the requested device object
         * @since Bitwig Studio 1.1
         */
        getDevice(indexInBank?: number): Device;

        /**
         * Scrolls the device window one page up.
         *
         * @since Bitwig Studio 1.1
         */
        scrollPageUp(): void;

        /**
         * Scrolls the device window one page down.
         *
         * @since Bitwig Studio 1.1
         */
        scrollPageDown(): void;

        /**
         * Scrolls the device window one device up.
         *
         * @since Bitwig Studio 1.1
         */
        scrollUp(): void;

        /**
         * Scrolls the device window one device down.
         *
         * @since Bitwig Studio 1.1
         */
        scrollDown(): void;

        /**
         * Makes the device with the given position visible in the track bank.
         *
         * @param {int} position the position of the device within the device chain
         * @since Bitwig Studio 1.1
         */
        scrollTo(position?: number): void;

        /**
         * Registers an observer that reports the current device scroll position.
         *
         * @param {function} callback a callback function that takes a single integer parameter
         * @param {int} valueWhenUnassigned the default value that gets reports when the device chain is not yet connected
                                   to a Bitwig Studio document
         * @since Bitwig Studio 1.1
         */
        addScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

        /**
         * Registers an observer that reports if the device window can be scrolled further up.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.1
         */
        addCanScrollUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the device window can be scrolled further down.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.1
         */
        addCanScrollDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the total device count of the device chain
         * (not the number of devices accessible through the bank window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.1
         */
        addDeviceCountObserver(callback?: Function): void;

    }

    /**
     * Instances of this interface are used for browsing devices, including access to all filter columns and the
     * result column as shown in the 'Devices' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class DeviceBrowsingSession extends BrowsingSession {
        /**
         * Returns the category filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested category filter object.
         * @since Bitwig Studio 1.2
         */
        getCategoryFilter(): BrowserFilterColumn;

        /**
         * Returns the device type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested device type filter object.
         * @since Bitwig Studio 1.2
         */
        getDeviceTypeFilter(): BrowserFilterColumn;

        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    /**
     * The foundation of all interfaces that contain devices, such as tracks, device layers, drum pads or FX slots.
     *
     * @since Bitwig Studio 1.1
     */
    class DeviceChain {
        /**
         * Returns a value object that indicates if the device chain exists, or if it has content.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        exists(): BooleanValue;

        /**
         * Selects the device chain in Bitwig Studio, in case it is a selectable object.
         *
         * @since Bitwig Studio 1.1
         */
        selectInEditor(): void;

        /**
         * Registers an observer that reports the name of the device chain, such as the track name or the drum pad name.
         *
         * @param {int} numChars the maximum number of characters used for the reported name
         * @param {string} textWhenUnassigned the default text that gets reported when the device chain is not associated with
                                  an object in Bitwig Studio yet.
         * @param {function} callback a callback function that receives a single name parameter (string).
         * @since Bitwig Studio 1.0
         */
        addNameObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports if the device chain is selected in Bitwig Studio editors.
         *
         * @param {function} callback a callback function that takes a single boolean parameter.
         * @since Bitwig Studio 1.1
         */
        addIsSelectedInEditorObserver(callback?: Function): void;

        /**
         * Returns an object that provides bank-wise navigation of devices.
         *
         * @param {int} numDevices the number of devices should be accessible simultaneously
         * @return {DeviceBank} the requested device bank object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createDeviceBank(numDevices?: number): DeviceBank;

    }

    /**
     * Instances of this interface represent device layers in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class DeviceLayer extends Channel {
    }

    /**
     * Devices layers are features of special Bitwig Studio devices, more specifically the Layer Instrument and
     * Layer FX devices, and are also shown as sub-channels in the mixer panel.
     *
     * Instances of device layer bank are configured with a fixed number of channels and represent an excerpt
     * of underlying complete list of channels. Various methods are provided for scrolling to different sections
     * of the underlying list. It basically acts like a one-dimensional window moving over the device layers.
     *
     * To receive an instance of device layer bank call {@link Device#createLayerBank(int numChannels)}.
     *
     * @see {@link Device#createLayerBank}
     * @since Bitwig Studio 1.1
     */
    class DeviceLayerBank extends ChannelBank {
        /**
         * Returns the device layer at the given index.
         *
         * @param {int} indexInBank the device layer index within this bank, not the index within the list of all device layers
                           as shown in Bitwig Studio layer devices. Must be in the range [0..sizeOfBank-1].
         * @return {DeviceLayer} the device layer object
         * @since Bitwig Studio 1.1
         */
        getChannel(indexInBank?: number): DeviceLayer;

    }

    /**
     * Instances of this interface represent nested FX slots in devices.
     *
     * @since Bitwig Studio 1.1
     */
    class DeviceSlot extends DeviceChain {
    }

    /**
     * This interface is used to configure observation of pretty-printed device parameter values.
     *
     * @since Bitwig Studio 1.1.5
     */
    class DirectParameterValueDisplayObserver {
        /**
         * Starts observing the parameters according to the given parameter ID array, or stops observing
         * in case `null` is passed in for the parameter ID array.
         *
         * @param {String[]} parameterIds the array of parameter IDs or `null` to stop observing parameter display values.
         * @since Bitwig Studio 1.1.5
         */
        setObservedParameterIds(parameterIds?: String[]): void;

    }

    /**
     * This interface is used to save custom script settings inside Bitwig Studio documents.
     * The settings are shown to the user in the `Studio IO` panel of Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class DocumentState extends Settings {
    }

    /**
     * Instances of this interface are special kind of channel objects that represent the pads of a drum machine instrument.
     * Drum pads are typically associated to channel objects via note keys.
     *
     * @since Bitwig Studio 1.1
     */
    class DrumPad extends Channel {
    }

    /**
     * Drum pads are features of special Bitwig Studio devices (currently only the Bitwig Drum Machine instrument),
     * and are also shown as sub-channels in the mixer panel.
     *
     * Instances of drum pad bank are configured with a fixed number of pads/channels and represent an excerpt
     * of underlying complete list of channels. Various methods are provided for scrolling to different sections
     * of the underlying list. It basically acts like a one-dimensional window moving over the drum pad channels.
     *
     * To receive an instance of drum pad bank call {@link Device#createDrumPadBank(int numChannels)}.
     *
     * @see {@link Device#createDrumPadBank}
     * @since Bitwig Studio 1.1
     */
    class DrumPadBank extends ChannelBank {
        /**
         * Specifies if the Drum Machine should visualize which pads are part of the window.
         * By default indications are enabled.
         *
         * @param {boolean} shouldIndicate `true` if visual indications should be enabled, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setIndication(shouldIndicate?: boolean): void;

    }

    /**
     * Instances of this interface represent enumeration values. Enum values work similar to string values,
     * but are limited to a fixed set of value options.
     *
     * @since Bitwig Studio 1.0
     */
    class EnumValue extends Value {
        /**
         * Sets the value to the enumeration item with the given name.
         *
         * @param {string} name the name of the new enum item
         * @since Bitwig Studio 1.0
         */
        set(name?: string): void;

    }

    /**
     * Instances of this interface are used for browsing material with bank-wise access to the filter columns.
     *
     * @see com.bitwig.base.control_surface.iface.BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class GenericBrowsingSession extends BrowsingSession {
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

    /**
     * An interface representing the global groove settings of the project.
     *
     * @since Bitwig Studio 1.0
     */
    class Groove {
        /**
         * Returns the enabled state of the groove.
         *
         * @return {AutomatableRangedValue} an object that provides access to the groove on/off setting
         * @since Bitwig Studio 1.0
         */
        getEnabled(): AutomatableRangedValue;

        /**
         * Returns the object that represents the shuffle amount in Bitwig Studio.
         *
         * @return {AutomatableRangedValue} an ranged value object that provides access to the shuffle amount
         * @since Bitwig Studio 1.0
         */
        getShuffleAmount(): AutomatableRangedValue;

        /**
         * Returns the object that represents the shuffle rate in Bitwig Studio.
         *
         * @return {AutomatableRangedValue} an ranged value object that provides access to the shuffle rate
         * @since Bitwig Studio 1.0
         */
        getShuffleRate(): AutomatableRangedValue;

        /**
         * Returns the object that represents the accent amount in Bitwig Studio.
         *
         * @return {AutomatableRangedValue} an ranged value object that provides access to the accent amount
         * @since Bitwig Studio 1.0
         */
        getAccentAmount(): AutomatableRangedValue;

        /**
         * Returns the object that represents the accent rate in Bitwig Studio.
         *
         * @return {AutomatableRangedValue} an ranged value object that provides access to the accent rate
         * @since Bitwig Studio 1.0
         */
        getAccentRate(): AutomatableRangedValue;

        /**
         * Returns the object that represents the accent phase in Bitwig Studio.
         *
         * @return {AutomatableRangedValue} an ranged value object that provides access to the accent phase
         * @since Bitwig Studio 1.0
         */
        getAccentPhase(): AutomatableRangedValue;

    }

    /**
     * An interface representing the host application to the script. A singleton instance of this interface is available
     * in the global scope of each script. The methods provided by this interface can be divided in different categories:
     *
     * 1. functions for registering the script in Bitwig Studio, so that it can be listed, detected and configured in
     *    the controller preferences. The methods that belong to this group are {@link #defineController},
     *    {@link #defineMidiPorts}, {@link #defineSysexIdentityReply} and {@link #addDeviceNameBasedDiscoveryPair}.
     * 2. functions for creating objects that provide access to the various areas of Bitwig Studio to the script. The
     *    name of those methods typically start with `create...`
     * 3. functions for printing to the Control Surface Console, which can be opened from the `View` menu of Bitwig Studio.
     * 4. functions for determining the name of the host application, API version, the host operating system and such.
     *
     * The first group of methods should be called on the global scope of the script. The function in the second and third
     * group are typically called from the init method of the script or other handler functions. The last group is probably
     * only required in rare cases and can be called any time.
     *
     * @mainpage Introduction
     *
     * Welcome to the Bitwig Control Surface API.<br/>
     *
     * The pages shown here include the reference documentation for the various interfaces and functions provided
     * by the API.<br/>
     *
     * The best starting point for becoming familiar with the API within these pages is the documentation of the
     * {@link Host} interface. A singleton instance of that interface is available in the scope of each script.
     * In addition it is highly recommended to also walk through the <b>Control Surface Scripting Guide</b> that is
     * available from the @em Help menu in Bitwig Studio.
     * @include api-changes
     * @since Bitwig Studio 1.0
     */
    class Host {
        /**
         * Registers a controller script with the given parameters.
         * This function must be called once at the global scope of the script.
         *
         * @param {string} vendor the name of the hardware vendor.
                      Must not be <code>null</code>.
         * @param {string} name the name of the controller script as listed in the user interface of Bitwig Studio.
                    Must not be <code>null</code>.
         * @param {string} version the version of the controller script. Must not be <code>null</code>.
         * @param {string} uuid a universal unique identifier (UUID) string that is used to distinguish one script from another,
                    for example `550e8400-e29b-11d4-a716-446655440000`. Must not be <code>null</code>.
                    For generating random UUID strings several free web tools are available.
         * @param {string} author the name of the script author
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        defineController(vendor?: string, name?: string, version?: string, uuid?: string, author?: string): void;

        /**
         * Defines the number of MIDI ports for input and output that the device uses. This method should be called once
         * in the global scope if the script is supposed to exchange MIDI messages with the device, or if the script adds
         * entries to the MIDI input/output choosers in Bitwig Studio. After calling this method the individual port objects
         * can be accessed using {@link #getMidiInPort(int index)} and {@link #getMidiInPort(int index)}.
         *
         * @param {int} numInports the number of input ports
         * @param {int} numOutports the number of output ports
         * @since Bitwig Studio 1.0
         */
        defineMidiPorts(numInports?: number, numOutports?: number): void;

        /**
         * Returns the MIDI input port with the given index.
         *
         * @param {int} index the index of the MIDI input port, must be valid.
         * @return {MidiIn} the requested MIDI input port
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getMidiInPort(index?: number): MidiIn;

        /**
         * Returns the MIDI output port with the given index.
         *
         * @param {int} index the index of the MIDI output port, must be valid.
         * @return {MidiOut} the requested MIDI output port
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        getMidiOutPort(index?: number): MidiOut;

        /**
         * Registers patterns which are used to automatically detect hardware devices that can be used with the
         * script.<br/>
         *
         * When the user clicks on the `detect` button in the Bitwig Studio controller preferences
         * dialog, Bitwig Studio searches for connected controller hardware by comparing the parameters passed into
         * this function are compared with the port names of the available MIDI drivers. Found controller scripts
         * are automatically added with their input/output ports configured.<br/>
         *
         * Calling this function is optional, but can also be called multiple times in the global script scope
         * in order to support alternative driver names.
         *
         * @param {String[]} inputs the array of strings used to detect MIDI input ports, must not be `null`.
         * @param {String[]} outputs the array of strings used to detect MIDI output ports, must not be `null`.
         * @since Bitwig Studio 1.0
         */
        addDeviceNameBasedDiscoveryPair(inputs?: String[], outputs?: String[]): void;

        /**
         * Registers the `Identity Reply Universal SysEx` message (if any) that the MIDI device sends after
         * receiving the `Identity Request Universal SysEx` message (`F0 7E 7F 06 01 F7`), as defined
         * in the MIDI standard.<br/>
         *
         * This function may be called at the global scope of the script, but is optional.
         * Please note that this function is only applicable to scripts with one MIDI input and one MIDI output.
         * Also note that not all MIDI hardware supports SysEx identity messages.
         *
         * @param {string} reply the `Identity Reply Universal SysEx` message. Must not be <code>null</code>
         * @since Bitwig Studio 1.0
         */
        defineSysexIdentityReply(reply?: string): void;

        /**
         * Creates a preferences object that can be used to insert settings
         * into the Controller Preferences panel in Bitwig Studio.
         *
         * @return {Preferences} an object that provides access to custom controller preferences
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getPreferences(): Preferences;

        /**
         * Creates a document state object that can be used to insert settings
         * into the Studio I/O Panel in Bitwig Studio.
         *
         * @return {DocumentState} an object that provides access to custom document settings
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getDocumentState(): DocumentState;

        /**
         * Returns an object that is used to configure automatic notifications.
         * Bitwig Studio supports automatic visual feedback from controllers that shows up as popup notifications.
         * For example when the selected track or the current device preset was changed on the controller these
         * notifications are shown, depending on your configuration.
         *
         * @return {NotificationSettings} a configuration object used to enable/disable the various automatic notifications
                supported by Bitwig Studio
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getNotificationSettings(): NotificationSettings;

        /**
         * Returns an object for controlling various aspects of the currently selected project.
         *
         * @return {Project}
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1.5
         */
        getProject(): Project;

        /**
         * Returns an object for controlling and monitoring the elements of the `Transport` section in Bitwig Studio.
         * This function should be called once during initialization of the script if transport access is desired.
         *
         * @return {Transport} an object that represents the `Transport` section in Bitwig Studio.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createTransport(): Transport;

        /**
         * Returns an object for controlling and monitoring the `Groove` section in Bitwig Studio.
         * This function should be called once during initialization of the script if groove control is desired.
         *
         * @return {Groove} an object that represents the `Groove` section in Bitwig Studio.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createGroove(): Groove;

        /**
         * Returns an object that provides access to general application functionality, including global view settings,
         * the list of open projects, and other global settings that are not related to a certain document.
         *
         * @return {Application} an application object.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createApplication(): Application;

        /**
         * Returns an object which provides access to the `Arranger` panel of Bitwig Studio. Calling this function
         * is equal to `createArranger(-1)`.
         *
         * @return {Arranger} an arranger object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createArranger(): Arranger;

        /**
         * Returns an object which provides access to the `Arranger` panel inside the specified window.
         *
         * @param {int} window the index of the window where the arranger panel is shown,
                      or -1 in case the first arranger panel found on any window should be taken
         * @return {Arranger} an arranger object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createArranger(window?: number): Arranger;

        /**
         * Returns an object which provides access to the `Mixer` panel of Bitwig Studio. Calling this function
         * is equal to `createMixer(-1, null)`.
         *
         * @return {Mixer} a `Mixer` object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMixer(): Mixer;

        /**
         * Returns an object which provides access to the `Mixer` panel that belongs to the specified panel layout.
         * Calling this function is equal to `createMixer(-1, panelLayout)`.
         *
         * @param {string} panelLayout the name of the panel layout that contains the mixer panel, or `null` in case the
                           selected panel layout in Bitwig Studio should be followed. Empty strings or invalid
                           names are treated the same way as `null`. To receive the list of available panel
                           layouts see {@link Application#addPanelLayoutObserver}.
         * @return {Mixer} a `Mixer` object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMixer(panelLayout?: string): Mixer;

        /**
         * Returns an object which provides access to the `Mixer` panel inside the specified window. Calling this function
         * is equal to `createMixer(window, null)`.
         *
         * @param {int} window the index of the window where the mixer panel is shown,
                      or -1 in case the first mixer panel found on any window should be taken
         * @return {Mixer} a `Mixer` object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMixer(window?: number): Mixer;

        /**
         * Returns an object which provides access to the `Mixer` panel that matches the specified parameters.
         *
         * @param {string} panelLayout the name of the panel layout that contains the mixer panel, or `null` in case the
                           selected panel layout in Bitwig Studio should be followed. Empty strings or invalid
                           names are treated the same way as `null`. To receive the list of available panel
                           layouts see {@link Application#addPanelLayoutObserver}.
         * @param {int} window the index of the window where the mixer panel is shown,
                      or -1 in case the first mixer panel found on any window should be taken
         * @return {Mixer} a `Mixer` object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMixer(panelLayout?: string, window?: number): Mixer;

        /**
         * Returns a track bank with the given number of tracks, sends and scenes.<br/>
         *
         * A track bank can be seen as a fixed-size window onto the list of tracks in the current document including
         * their sends and scenes, that can be scrolled in order to access different parts of the track list.
         * For example a track bank configured for 8 tracks can show track 1-8, 2-9, 3-10 and so on.<br/>
         *
         * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
         * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
         * dynamic list of tracks, most likely more tracks than the hardware can control simultaneously. The track bank
         * returned by this function provides a convenient interface for controlling which tracks are currently shown on
         * the hardware.<br/>
         *
         * Creating a track bank using this method will consider all tracks in the document, including effect tracks
         * and the master track. Use {@link #createMainTrackBank} or {@link #createEffectTrackBank} in case you are only
         * interested in tracks of a certain kind.
         *
         * @param {int} numTracks the number of tracks spanned by the track bank
         * @param {int} numSends the number of sends spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createTrackBank(numTracks?: number, numSends?: number, numScenes?: number): TrackBank;

        /**
         * Returns a track bank with the given number of tracks, sends and scenes. Only audio tracks, instrument tracks and
         * hybrid tracks are considered. For more information about track banks and the `bank pattern` in general,
         * see the documentation for {@link #createTrackBank}.
         *
         * @param {int} numTracks the number of tracks spanned by the track bank
         * @param {int} numSends the number of sends spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMainTrackBank(numTracks?: number, numSends?: number, numScenes?: number): TrackBank;

        /**
         * Returns a track bank with the given number of effect tracks and scenes. Only effect tracks are considered.
         * For more information about track banks and the `bank pattern` in general, see the documentation for
         * {@link #createTrackBank}.
         *
         * @param {int} numTracks the number of tracks spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createEffectTrackBank(numTracks?: number, numScenes?: number): TrackBank;

        /**
         * Returns an object that represents the master track of the document.
         *
         * @param {int} numScenes the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
         * @return {Track} an object representing the master track.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createMasterTrack(numScenes?: number): Track;

        /**
         * Returns an object that represents the cursor item of the arranger track selection.
         *
         * @param {int} numSends the number of sends for bank-wise navigation of the sends that are associated
                        with the track selection
         * @param {int} numScenes the number of scenes for bank-wise navigation of the clip launcher slots
                         that are associated with the track selection
         * @return {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks)
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createArrangerCursorTrack(numSends?: number, numScenes?: number): CursorTrack;

        /**
         * Returns an object that represents a named cursor track, that is independent from the arranger or mixer
         * track selection in the user interface of Bitwig Studio.
         *
         * @param {string} name the name of the track cursor
         * @param {int} numSends the number of sends for bank-wise navigation of the sends that are associated
                        with the track selection
         * @param {int} numScenes the number of scenes for bank-wise navigation of the clip launcher slots
                         that are associated with the track selection
         * @return {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks).
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createCursorTrack(name?: string, numSends?: number, numScenes?: number): CursorTrack;

        /**
         * Returns a scene bank with the given number of scenes.<br/>
         *
         * A scene bank can be seen as a fixed-size window onto the list of scenes in the current document,
         * that can be scrolled in order to access different parts of the scene list.
         * For example a scene bank configured for 8 scenes can show scene 1-8, 2-9, 3-10 and so on.<br/>
         *
         * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
         * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
         * dynamic list of scenes, most likely more scenes than the hardware can control simultaneously. The scene bank
         * returned by this function provides a convenient interface for controlling which scenes are currently shown on
         * the hardware.<br/>
         *
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @return {SceneBank} an object for bank-wise navigation of scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createSceneBank(numScenes?: number): SceneBank;

        /**
         * Returns an object that represents the cursor device in devices selections made by the user in Bitwig Studio.
         * Calling this method is equal to the following code:
         * {@code
         * var cursorTrack = createArrangerCursorTrack(numSends, numScenes);
         * var cursorDevice = cursorTrack.createCursorDevice();
         * }
         * To create a custom device selection that is not connected to the main device selection in the user interface,
         * call {@link Track#createCursorDevice(String) cursorTrack.createCursorDevice(String name)}.
         *
         * @return {CursorDevice} an object representing the currently selected device.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createEditorCursorDevice(): CursorDevice;

        /**
         * Returns an object that represents the cursor device in devices selections made by the user in Bitwig Studio.
         * Calling this method is equal to the following code:
         * {@code
         * var cursorTrack = createArrangerCursorTrack(numSends, numScenes);
         * var cursorDevice = cursorTrack.createCursorDevice();
         * }
         * To create a custom device selection that is not connected to the main device selection in the user interface,
         * call {@link Track#createCursorDevice(String) cursorTrack.createCursorDevice(String name)}.
         *
         * @param {int} numSends the number of sends that are simultaneously accessible in nested channels.
         * @return {CursorDevice} an object representing the currently selected device.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1.6
         */
        createEditorCursorDevice(numSends?: number): CursorDevice;

        /**
         * Returns a clip object that represents the cursor of the launcher clip selection. The gridWidth and gridHeight
         * parameters specify the grid dimensions used to access the note content of the clip.
         *
         * @param {int} gridWidth the number of steps spanned by one page of the note content grid.
         * @param {int} gridHeight the number of keys spanned by one page of the note content grid.
         * @return {Clip} an object representing the currently selected cursor clip
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createCursorClip(gridWidth?: number, gridHeight?: number): Clip;

        /**
         * Returns an object that is used to define a bank of custom user controls. These controls are available to the user
         * for free controller assignments and are typically used when bank-wise navigation is inconvenient.
         *
         * @param {int} numControllers the number of controls that are available for free assignments
         * @return {UserControlBank} An object that represents a set of custom user controls.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createUserControls(numControllers?: number): UserControlBank;

        /**
         * Schedules the given callback function for execution after the given delay.
         * For timer applications call this method once initially and then from within the callback function.
         *
         * @param {function} callback the callback function that will be called
         * @param {Object[]} args that array of arguments that gets passed into the callback function, may be `null`
         * @param {long} delay the duration after which the callback function will be called in milliseconds
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        scheduleTask(callback?: Function, args?: Array<any>, delay?: number): void;

        /**
         * Returns the latest supported API version of the host application.
         *
         * @return {int} the latest supported API version of the host application
         * @since Bitwig Studio 1.0
         */
        getHostApiVersion(): number;

        /**
         * Returns the vendor of the host application.
         *
         * @return {string} the vendor of the host application
         * @since Bitwig Studio 1.0
         */
        getHostVendor(): string;

        /**
         * Returns the product name of the host application.
         *
         * @return {string} the product name of the host application
         * @since Bitwig Studio 1.0
         */
        getHostProduct(): string;

        /**
         * Returns the version number of the host application.
         *
         * @return {string} the version number of the host application
         * @since Bitwig Studio 1.0
         */
        getHostVersion(): string;

        /**
         * Indicates if the host platform is Windows.
         *
         * @return {boolean} `true` if the host platform is Windows, `false` otherwise.
         * @since Bitwig Studio 1.0
         */
        platformIsWindows(): boolean;

        /**
         * Indicates if the host platform is Apple Mac OS X.
         *
         * @return {boolean} `true` if the host platform is Mac, `false` otherwise.
         * @since Bitwig Studio 1.0
         */
        platformIsMac(): boolean;

        /**
         * Indicates if the host platform is Linux.
         *
         * @return {boolean} `true` if the host platform is Linux, `false` otherwise.
         * @since Bitwig Studio 1.0
         */
        platformIsLinux(): boolean;

        /**
         * Prints the given string in the control surface console window.
         * The console window can be opened in the view menu of Bitwig Studio.
         *
         * @param {string} s the string to be printed
         * @since Bitwig Studio 1.0
         */
        println(s?: string): void;

        /**
         * Prints the given string in the control surface console window using a text style that highlights the string
         * as error. The console window can be opened in the view menu of Bitwig Studio.
         *
         * @param {string} s the error string to be printed
         * @since Bitwig Studio 1.0
         */
        errorln(s?: string): void;

        /**
         * Shows a temporary text overlay on top of the application GUI, that will fade-out after a short interval.
         * If the overlay is already shown, it will get updated with the given text.
         *
         * @param {string} text the text to be shown
         * @since Bitwig Studio 1.0
         */
        showPopupNotification(text?: string): void;

        /**
         * Opens a TCP (Transmission Control Protocol) host socket for allowing network connections
         * from other hardware and software.
         *
         * @param {string} name a meaningful name that describes the purpose of this connection.
         * @param {int} defaultPort the port that should be used for the connection. If the port is already in use, then another
                           port will be used. Check {@link RemoteSocket#getPort()} on the returned object to be sure.
         * @return {RemoteSocket} the object that represents the socket
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createRemoteConnection(name?: string, defaultPort?: number): RemoteSocket;

        /**
         * Connects to a remote TCP (Transmission Control Protocol) socket.
         *
         * @param {string} host the host name or IP address to connect to.
         * @param {int} port the port to connect to
         * @param {function} callback the callback function that gets called when the connection gets established. A single
                        {@link RemoteConnection} parameter is passed into the callback function.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        connectToRemoteHost(host?: string, port?: number, callback?: Function): void;

        /**
         * Sends a UDP (User Datagram Protocol) packet with the given data to the specified host.
         *
         * @param {string} host the destination host name or IP address
         * @param {int} port the destination port
         * @param {byte[]} data the data to be send. When creating a numeric byte array in JavaScript, the byte values must be
                    signed (in the range -128..127).
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0.11
         */
        sendDatagramPacket(host?: string, port?: number, data?: number[]): void;

        /**
         * Adds an observer for incoming UDP (User Datagram Protocol) packets on the selected port.
         *
         * @param {string} name a meaningful name that describes the purpose of this observer.
         * @param {int} port the port that should be used
         * @param {function} callback the callback function that gets called when data arrives. The function receives a single
                        parameter that contains the data byte array.
         * @return {boolean} {@true} if was possible to bind the port, false otherwise
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0.11
         */
        addDatagramPacketObserver(name?: string, port?: number, callback?: Function): boolean;

    }

    /**
     * Instances of this interface represent integer values.
     *
     * @since Bitwig Studio 1.0
     */
    class IntegerValue extends Value {
        /**
         * Sets the internal value.
         *
         * @param {int} value the new integer value.
         * @since Bitwig Studio 1.1
         */
        set(value?: number): void;

        /**
         * Increases/decrease the internal value by the given amount.
         *
         * @param {int} amount the integer amount to increase
         * @since Bitwig Studio 1.1
         */
        inc(amount?: number): void;

    }

    /**
     * Instances of this interface are used to represent macro controls in Bitwig Studio to controllers.
     *
     * @since Bitwig Studio 1.0
     */
    class Macro {
        /**
         * Returns an object that provides access to the control value of the macro.
         *
         * @return {AutomatableRangedValue} a ranged value object.
         * @since Bitwig Studio 1.0
         */
        getAmount(): AutomatableRangedValue;

        /**
         * Returns an object that provides access to the modulation source of the macro.
         *
         * @return {ModulationSource} a modulation source object.
         * @since Bitwig Studio 1.0
         */
        getModulationSource(): ModulationSource;

        /**
         * Registers an observer that reports the label of the macro control.
         *
         * @param {int} numChars the maximum number of characters of the reported label
         * @param {string} textWhenUnassigned the default text that is reported when the macro is not connected to a
                                  Bitwig Studio macro control.
         * @param {function} callback a callback function that receives a single string parameter.
         */
        addLabelObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    }

    /**
     * A special kind of track that represents the master track in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class MasterTrack extends Track {
    }

    /**
     * Instances of this interface are used to setup handler functions for incoming MIDI messages
     * from a specific MIDI hardware.
     *
     * @since Bitwig Studio 1.0
     */
    class MidiIn {
        /**
         * Registers a callback for receiving short (normal) MIDI messages on this MIDI input port.
         *
         * @param {function} callback a callback function that receives three integer parameters:
                        1. the status byte
                        2. the data1 value
                        2. the data2 value
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setMidiCallback(callback?: Function): void;

        /**
         * Registers a callback for receiving sysex MIDI messages on this MIDI input port.
         *
         * @param {function} callback a callback function that takes a single string argument
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setSysexCallback(callback?: Function): void;

        /**
         * Creates a note input that appears in the track input choosers in Bitwig Studio.
         * This method must be called within the `init()` function of the script.
         * The messages matching the given mask parameter will be fed directly to the application, and are not processed
         * by the script.
         *
         * @param {string} name the name of the note input as it appears in the track input choosers in Bitwig Studio
         * @param {string} masks a filter string formatted as hexadecimal value with `?` as wildcard. For example
                     `80????` would match note-off on channel 1 (0). When this parameter is {@null},
                     a standard filter will be used to forward note-related messages on channel 1 (0).
         * @return {NoteInput} the object representing the requested note input
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        createNoteInput(name?: string, ...masks: string[]): NoteInput;

    }

    /**
     * Instances of this interface are used to send MIDI messages to a specific MIDI hardware.
     *
     * @since Bitwig Studio 1.0
     */
    class MidiOut {
        /**
         * Sends a MIDI message to the hardware device.
         *
         * @param {int} status the status byte of the MIDI message
         * @param {int} data1 the data1 part of the MIDI message
         * @param {int} data2 the data2 part of the MIDI message
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        sendMidi(status?: number, data1?: number, data2?: number): void;

        /**
         * Sends a MIDI SysEx message to the hardware device.
         *
         * @param {string} hexString the sysex message formatted as hexadecimal value string
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        sendSysex(hexString?: string): void;

        /**
         * Enables or disables sending MIDI beat clock messages to the hardware depending on the given parameter.
         * Typically MIDI devices that run an internal sequencer such as hardware step sequencers would be interested
         * in MIDI clock messages.
         *
         * @param {boolean} shouldSendClock `true` in case the hardware should receive MIDI clock messages,
                               `false` otherwise
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setShouldSendMidiBeatClock(shouldSendClock?: boolean): void;

    }

    /**
     * An interface used to access various commands that can be performed on the Bitwig Studio mixer panel.<br/>
     *
     * To get an instance of the mixer interface call {@link Host#createMixer}.
     *
     * @since Bitwig Studio 1.0
     */
    class Mixer {
        /**
         * Gets an object that allows to show/hide the meter section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the meter section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the meter section visibility
         * @since Bitwig Studio 1.1
         */
        isMeterSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the io section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the io section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the io section visibility
         * @since Bitwig Studio 1.1
         */
        isIoSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the sends section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the sends section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the sends section visibility
         * @since Bitwig Studio 1.1
         */
        isSendSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the clip launcher section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the clip launcher section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the clip launcher section visibility
         * @since Bitwig Studio 1.1
         */
        isClipLauncherSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the devices section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the devices section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the devices section visibility
         * @since Bitwig Studio 1.1
         */
        isDeviceSectionVisible(): BooleanValue;

        /**
         * Gets an object that allows to show/hide the cross-fade section of the mixer panel. Observers can be registered on
         * the returned object for receiving notifications when the cross-fade section switches between shown and hidden state.
         *
         * @return {BooleanValue} a boolean value object that represents the cross-fade section visibility
         * @since Bitwig Studio 1.1
         */
        isCrossFadeSectionVisible(): BooleanValue;

    }

    /**
     * This interface represents a modulation source in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    class ModulationSource {
        /**
         * Registers an observer the reports when the modulation source is in mapping mode.
         *
         * @param {function} callback a callback function that receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addIsMappingObserver(callback?: Function): void;

        /**
         * Toggles the modulation source between mapping mode and normal control functionality.
         *
         * @since Bitwig Studio 1.0
         */
        toggleIsMapping(): void;

        /**
         * Registers an observer the reports the name of the modulation source.
         *
         * @param {int} numChars the maximum number of character the reported name should be long
         * @param {string} textWhenUnassigned the default text that gets reported if the modulation source is not connected to
                                  to a modulation source in Bitwig Studio yet
         * @param {function} callback a callback function that receives a single string parameter
         * @since Bitwig Studio 1.0
         */
        addNameObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

    }

    /**
     * Instances of this interface are used for browsing multi-samples, including access to all filter columns
     * and the result column as shown in the 'Multi-Samples' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class MultiSampleBrowsingSession extends BrowsingSession {
        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    /**
     * Instances of this interface are used for browsing music files, including access to all filter columns
     * and the result column as shown in the 'Music' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class MusicBrowsingSession extends BrowsingSession {
        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    enum NoteExpression {
        NONE = 0,
        PITCH_DOWN = 1,
        PITCH_UP = 2,
        GAIN_DOWN = 3,
        GAIN_UP = 4,
        PAN_LEFT = 5,
        PAN_RIGHT = 6,
        TIMBRE_DOWN = 7,
        TIMBRE_UP = 8,
    }
    /**
     * Instances of this interface implement note input functionality used for recording notes in Bitwig Studio and for
     * playing the instruments in tracks on hardware keyboards. In Bitwig Studio the note inputs are shown int the input
     * choosers of Bitwig Studio tracks.
     *
     * @since Bitwig Studio 1.0
     */
    class NoteInput {
        NoteExpression: NoteExpression;
        /**
         * Specifies if the note input should consume MIDI notes, or in other words if it should prevent forwarding incoming
         * notes to the MIDI callback registered in {@link MidiIn#setMidiCallback}. This setting is `true` by default.
         *
         * @param {boolean} shouldConsumeEvents `true` if note events should be consumed, `false` of the events should be
                                   additionally sent to the callback registered via {@link MidiIn#setMidiCallback}
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setShouldConsumeEvents(shouldConsumeEvents?: boolean): void;

        /**
         * Specifies a translation table which defines the actual key value (0-127) of notes arriving in Bitwig Studio
         * for each note key potentially received from the hardware. This is used for note-on/off and polyphonic
         * aftertouch events. Specifying a value of `-1` for a key means that notes with the key value will be
         * filtered out.
         *
         * Typically this method is used to implement transposition or scale features in controller scripts.
         * By default an identity transform table is configured, which means that all incoming MIDI notes keep their
         * original key value when being sent into Bitwig Studio.
         *
         * @param {Object[]} table an array which should contain 128 entries. Each entry should be a note value in the range [0..127]
                     or -1 in case of filtering.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setKeyTranslationTable(table?: Array<any>): void;

        /**
         * Specifies a translation table which defines the actual velocity value (0-127) of notes arriving in Bitwig Studio
         * for each note velocity potentially received from the hardware. This is used for note-on events only.
         *
         * Typically this method is used to implement velocity curves or fixed velocity mappings in controller scripts.
         * By default an identity transform table is configured, which means that all incoming MIDI notes keep their
         * original velocity when being sent into Bitwig Studio.
         *
         * @param {Object[]} table an array which should contain 128 entries. Each entry should be a note value in the range [0..127]
                     or -1 in case of filtering.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setVelocityTranslationTable(table?: Array<any>): void;

        /**
         * Assigns polyphonic aftertouch MIDI messages to the specified note expression.
         * Multi-dimensional control is possible by calling this method several times with different MIDI channel parameters.
         * If a key translation table is configured by calling {@link #setKeyTranslationTable}, that table is used
         * for polyphonic aftertouch as well.
         *
         * @param {int} channel the MIDI channel to map, range [0..15]
         * @param {NoteInput.NoteExpression} expression the note-expression to map for the given MIDI channel
         * @param {int} pitchRange the pitch mapping range in semitones, values must be in the range [1..24].
                          This parameter is ignored for non-pitch expressions.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        assignPolyphonicAftertouchToExpression(channel?: number, expression?: NoteExpression, pitchRange?: number): void;

        /**
         * Enables use of Expressive MIDI mode. (note-per-channel)
         *
         * @param {boolean} useExpressiveMidi enabled/disable the MPE mode for this note-input
         * @param {int} baseChannel which channel (must be either 0 or 15) which is used as the base for this note-input
         * @param {int} pitchBendRange initial pitch bend range used
         * @throws ControlSurfaceException
         */
        setUseExpressiveMidi(useExpressiveMidi?: boolean, baseChannel?: number, pitchBendRange?: number): void;

        /**
         * Sends MIDI data directly to the note input. This will bypass both the event filter and translation tables.
         * The MIDI channel of the message will be ignored.
         *
         * @param {int} status the status byte of the MIDI message
         * @param {int} data0 the data0 part of the MIDI message
         * @param {int} data1 the data1 part of the MIDI message
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        sendRawMidiEvent(status?: number, data0?: number, data1?: number): void;

    }

    /**
     * Instances of this interface are used to access the notes for a specific note key.
     *
     * @since Bitwig Studio 1.0
     */
    class NoteLane {
        /**
         * Registers an observer for the note value, which is either the note pitch represented
         * by this lane, or in case of audio a lane index (currently always 0 in that case).
         *
         * @param {function} callback
         * @since Bitwig Studio 1.0
         */
        addNoteValueObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the name of the note lane. Typically the name of a note lane is either
         * equal to the title of an associated drum pad, or reflects the pitch of the note, e.g. "C#3".
         *
         * @param {int} numChars the maximum number of characters used for the reported name
         * @param {string} textWhenUnassigned the default name that gets reported when the lane is not yet associated
                                  with a note lane in Bitwig Studio
         * @param {function} callback a callback function that receives a single string argument
         * @since Bitwig Studio 1.0
         */
        addNameObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports the color of the note lane. By default the reported color will be the
         * track color, or in case an associated drum pad has a custom color it will be the color of that pad
         * (currently not implemented).
         *
         * @param {function} callback a callback function that receives three arguments which from an RGB color:
                        1. the red dimension of the color value,
                        2. the green dimension of the color value, and
                        3. the blue dimension of the color value
         * @since Bitwig Studio 1.0
         */
        addColorObserver(callback?: Function): void;

        /**
         * Plays a note with the key of the note lane and the provided velocity parameter.
         *
         * @param {double} velocity the velocity the note should be played with
         * @since Bitwig Studio 1.0
         */
        play(velocity?: number): void;

    }

    /**
     * Bitwig Studio supports automatic visual feedback from controllers that shows up as popup notifications.
     * For example when the selected track or the current device preset was changed on the controller, these
     * notifications are shown, depending on the configuration.
     *
     * It depends both on the users preference and the capabilities of the controller hardware if a certain
     * notification should be shown. This interface provides functions for enabling/disabling the various kinds
     * of automatic notifications from the hardware point of view. Typically, controllers that include an
     * advanced display don't need to show many notifications additionally on screen. For other controllers
     * that do not include a display it might be useful to show all notifications.
     * By default all notifications are disabled.
     *
     * In addition, the user can enable or disable all notifications the have been enabled using this interface in the
     * preferences dialog of Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class NotificationSettings {
        /**
         * Returns an object that reports if user notifications are enabled and that allows to enable/disable
         * user notifications from the control surface. If user notifications are disabled, no automatic notifications
         * will be shown in the Bitwig Studio user interface. If user notifications are enabled, all automatic
         * notifications will be shown that are enabled using the methods of this interface.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.1
         */
        getUserNotificationsEnabled(): BooleanValue;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowSelectionNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowChannelSelectionNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowTrackSelectionNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowDeviceSelectionNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowDeviceLayerSelectionNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowPresetNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowMappingNotifications(shouldShowNotifications?: boolean): void;

        /**
         * Specifies if user notification related to selection changes should be shown. Please note that this setting
         * only applies when user notifications are enabled in general, otherwise no notification are shown.
         * By default this setting is `false`.
         *
         * @param {boolean} shouldShowNotifications `true` in case selection notifications should be shown,
                                       `false` otherwise.
         * @since Bitwig Studio 1.1
         */
        setShouldShowValueNotifications(shouldShowNotifications?: boolean): void;

    }

    /**
     * This interface is used to store custom controller settings into the Bitwig Studio preferences.
     * The settings are shown to the user in the controller preferences dialog of Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class Preferences extends Settings {
    }

    /**
     * Instances of this interface are used for browsing presets, including access to all filter columns and the
     * result column as shown in the 'Presets' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class PresetBrowsingSession extends BrowsingSession {
        /**
         * Returns the category filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested category filter object.
         * @since Bitwig Studio 1.2
         */
        getCategoryFilter(): BrowserFilterColumn;

        /**
         * Returns the preset type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested preset type filter object.
         * @since Bitwig Studio 1.2
         */
        getPresetTypeFilter(): BrowserFilterColumn;

        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    enum DeviceType {
        ANY = 0,
    }

    enum ChainLocation {
        FIRST = 0,
        NEXT = 1,
        PREVIOUS = 2,
        LAST = 3,
    }

    /**
     * A special kind of device that represents the primary device of a track.
     *
     * @since Bitwig Studio 1.0
     */
    class PrimaryDevice extends Device {
        /**
         * Makes the device with the given type and location the new primary device.
         *
         * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
         * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
         * @since Bitwig Studio 1.0
         */
        switchToDevice(deviceType?: DeviceType, chainLocation?: ChainLocation): void;

        /**
         * Registers an observer that reports if navigation to another device with the provided characteristics is possible.
         *
         * @param {PrimaryDevice.DeviceType} deviceType the requested device type of the new primary device
         * @param {PrimaryDevice.ChainLocation} chainLocation the requested chain location of the new primary device
         * @param {function} callback a callback function the receives a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanSwitchToDeviceObserver(deviceType?: DeviceType, chainLocation?: ChainLocation, callback?: Function): void;

    }

    /**
     * An interface for representing the current project.
     *
     * @since Bitwig Studio 1.1.5
     */
    class Project {
        /**
         * Returns an object that represents the root track group of the active Bitwig Studio project.
         *
         * @return {Track} the root track group of the currently active project
         * @since Bitwig Studio 1.2
         */
        getRootTrackGroup(): Track;

        /**
         * Returns an object that represents the top level track group as shown in the arranger/mixer
         * of the active Bitwig Studio project.
         *
         * @return {Track} the shown top level track group of the currently active project
         * @since Bitwig Studio 1.2
         */
        getShownTopLevelTrackGroup(): Track;

        /**
         * Creates a new scene (using an existing empty scene if possible) from the clips that are currently
         * playing in the clip launcher.
         *
         * @since Bitwig Studio 1.1.5
         */
        createSceneFromPlayingLauncherClips(): void;

    }

    /**
     * Instances of this interface represent numeric values that have an upper and lower limit.
     *
     * @since Bitwig Studio 1.0
     */
    class RangedValue {
        /**
         * Adds an observer which receives the normalized value of the parameter as an integer number
         * within the range [0..range-1].
         *
         * @param {int} range the range used to scale the value when reported to the callback
         * @param {function} callback a callback function that receives a single integer parameter
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        addValueObserver(range?: number, callback?: Function): void;

        /**
         * Sets the value in an absolute fashion. The value will be scaled according to the given resolution.
         *
         * Typically the resolution would be specified as the amount of steps the hardware control provides
         * (for example 128) and just pass the integer value as it comes from the MIDI device. The host application
         * will take care of scaling it.
         *
         * @param {number} value integer number in the range [0 .. resolution-1]
         * @param {number} resolution the resolution used for scaling
         * @throws ControlSurfaceException if passed-in parameters are null
         * @since Bitwig Studio 1.0
         */
        set(value?: number, resolution?: number): void;

        /**
         * Increments or decrements the value according to the given increment and resolution parameters.
         *
         * Typically the resolution would be specified as the amount of steps the hardware control provides
         * (for example 128) and just pass the integer value as it comes from the MIDI device. The host application
         * will take care of scaling it.
         *
         * @param {number} increment the amount that the current value is increased by
         * @param {number} resolution the resolution used for scaling
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        inc(increment?: number, resolution?: number): void;

        /**
         * Add an observer which receives the internal raw of the parameter as floating point.
         *
         * @param {function} callback a callback function that receives a single numeric parameter with double precision.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        addRawValueObserver(callback?: Function): void;

        /**
         * Set the internal (raw) value.
         *
         * @param {double} value the new value with double precision. Range is undefined.
         * @since Bitwig Studio 1.1
         */
        setRaw(value?: number): void;

        /**
         * Increments / decrements the internal (raw) value.
         *
         * @param {double} delta the amount that the current internal value get increased by.
         * @since Bitwig Studio 1.1
         */
        incRaw(delta?: number): void;

    }

    /**
     * Instances of this interface are reported to the supplied script callback when connecting to a remote
     * TCP socket via {@link Host#connectToRemoteHost}.
     *
     * @see {@link Host#connectToRemoteHost}
     * @since Bitwig Studio 1.0
     */
    class RemoteConnection {
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

    /**
     * Instances of this interface represent a TCP socket that other network clients can connect to,
     * typically created by calling {@link Host#createRemoteConnection}.
     *
     * @see {@link Host#createRemoteConnection}
     * @since Bitwig Studio 1.0
     */
    class RemoteSocket {
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

    /**
     * Instances of this interface are used for browsing samples, including access to all filter columns and the
     * result column as shown in the 'Samples' tab of Bitwig Studio's contextual browser window.
     *
     * @see BrowsingSession
     * @since Bitwig Studio 1.2
     */
    class SampleBrowsingSession extends BrowsingSession {
        /**
         * Returns the file type filter as shown in the category column of the browser.
         *
         * @return {BrowserFilterColumn} the requested file type filter object.
         * @since Bitwig Studio 1.2
         */
        getFileTypeFilter(): BrowserFilterColumn;

    }

    /**
     * Instances of this interface represent scenes in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    class Scene {
        /**
         * Returns a value object that indicates if the scene exists.
         *
         * @return {Value} a boolean value object
         * @since Bitwig Studio 1.1
         */
        exists(): Value;

        /**
         * Launches the scene.
         *
         * @since Bitwig Studio 1.1
         */
        launch(): void;

        /**
         * Returns an object that provides access to the name of the scene.
         *
         * @return {StringValue} a string value object that represents the scene name.
         * @since Bitwig Studio 1.1
         */
        getName(): StringValue;

        /**
         * Registers an observer that reports the position of the scene within the list of Bitwig Studio scenes.
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.1
         */
        addPositionObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the scene is selected in Bitwig Studio.
         *
         * @param {function} callback a callback function that takes a single boolean parameter.
         * @since Bitwig Studio 1.1
         */
        addIsSelectedInEditorObserver(callback?: Function): void;

        /**
         * Selects the scene in Bitwig Studio.
         *
         * @since Bitwig Studio 1.1
         */
        selectInEditor(): void;

        /**
         * Makes the scene visible in the Bitwig Studio user interface.
         *
         * @since Bitwig Studio 1.1
         */
        showInEditor(): void;

    }

    /**
     * A scene bank provides access to a range of scenes in Bitwig Studio.
     * Instances of scene bank are configured with a fixed number of scenes and represent an excerpt
     * of a larger list of scenes. Various methods are provided for scrolling to different sections
     * of the scene list. It basically acts like a window moving over the list of underlying scenes.
     *
     * To receive an instance of scene bank call {@link com.bitwig.base.control_surface.iface.Host#createSceneBank}.
     *
     * @see {@link com.bitwig.base.control_surface.iface.Host#createSceneBank}
     * @since Bitwig Studio 1.1
     */
    class SceneBank {
        /**
         * Returns the scene at the given index within the bank.
         *
         * @param {int} indexInBank the scene index within this bank, not the index within the list of all Bitwig Studio
                           scenes. Must be in the range [0..sizeOfBank-1].
         * @return {Scene} the requested scene object
         * @since Bitwig Studio 1.1
         */
        getScene(indexInBank?: number): Scene;

        /**
         * Scrolls the scenes one page up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollPageUp(): void;

        /**
         * Scrolls the scenes one page down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollPageDown(): void;

        /**
         * Scrolls the scenes one scene up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollUp(): void;

        /**
         * Scrolls the scenes one scene down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollDown(): void;

        /**
         * Makes the scene with the given position visible in the track bank.
         *
         * @param {int} position the position of the scene within the underlying full list of scenes
         * @since Bitwig Studio 1.0
         */
        scrollTo(position?: number): void;

        /**
         * Registers an observer that reports the current scene scroll position.
         *
         * @param {function} callback a callback function that takes a single integer parameter
         * @param {int} valueWhenUnassigned the default value that gets reports when the track bank is not yet connected
                                   to a Bitwig Studio document
         * @since Bitwig Studio 1.0
         */
        addScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

        /**
         * Registers an observer that reports if the scene window can be scrolled further up.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the scene window can be scrolled further down.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total scene count
         * (not the number of scenes available in the bank window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.0
         */
        addSceneCountObserver(callback?: Function): void;

        /**
         * Launches the scene with the given bank index.
         *
         * @param {int} indexInWindow the scene index within the bank, not the position of the scene withing the underlying full
                             list of scenes.
         * @since Bitwig Studio 1.0
         */
        launchScene(indexInWindow?: number): void;

    }

    /**
     * A common base interface for labeled and categorized settings.
     *
     * @since Bitwig Studio 1.1
     */
    class Setting {
        /**
         * Returns the category name of the setting.
         *
         * @return {string} a string value containing the category name
         * @since Bitwig Studio 1.1
         */
        getCategory(): string;

        /**
         * Returns the label text of the setting.
         *
         * @return {string} a string value containing the label text
         * @since Bitwig Studio 1.1
         */
        getLabel(): string;

        /**
         * Marks the settings as enabled in Bitwig Studio. By default the setting is enabled.
         *
         * @since Bitwig Studio 1.1
         */
        enable(): void;

        /**
         * Marks the settings as disabled in Bitwig Studio. By default the setting is enabled.
         *
         * @since Bitwig Studio 1.1
         */
        disable(): void;

        /**
         * Shows the setting in Bitwig Studio. By default the setting is shown.
         *
         * @since Bitwig Studio 1.1
         */
        show(): void;

        /**
         * Hides the setting in Bitwig Studio. By default the setting is shown.
         *
         * @since Bitwig Studio 1.1
         */
        hide(): void;

    }

    /**
     * This interface builds the foundation for storing custom settings in Bitwig Studio documents or in the
     * Bitwig Studio preferences.
     *
     * @since Bitwig Studio 1.1
     */
    class Settings {
        /**
         * Returns a signal setting object, which is shown a push button with the given label in Bitwig Studio.
         *
         * @param {string} label the name of the setting, must not be `null`
         * @param {string} category the name of the category, may be `null`
         * @param {string} action the action string as displayed on the related Bitwig Studio button, must not be `null`
         * @return {Signal} the object that encapsulates the requested signal
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getSignalSetting(label?: string, category?: string, action?: string): Signal;

        /**
         * Returns a numeric setting that is shown a number field in Bitwig Studio.
         *
         * @param {string} label the name of the setting, must not be `null`
         * @param {string} category the name of the category, may be `null`
         * @param {double} minValue the minimum value that the user is allowed to enter
         * @param {double} maxValue the minimum value that the user is allowed to enter
         * @param {double} stepResolution the step resolution used for the number field
         * @param {string} unit the string that should be used to display the unit of the number
         * @param {double} initialValue the initial numeric value of the setting
         * @return {RangedValue} the object that encapsulates the requested numeric setting
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getNumberSetting(label?: string, category?: string, minValue?: number, maxValue?: number, stepResolution?: number, unit?: string, initialValue?: number): RangedValue;

        /**
         * Returns an enumeration setting that is shown either as a chooser or as a button group in Bitwig Studio,
         * depending on the number of provided options.
         *
         * @param {string} label the name of the setting, must not be `null`
         * @param {string} category the name of the category, may be `null`
         * @param {String[]} options the string array that defines the allowed options for the button group or chooser
         * @param {string} initialValue the initial string value, must be one of the items specified with the option argument
         * @return {EnumValue} the object that encapsulates the requested enum setting
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getEnumSetting(label?: string, category?: string, options?: String[], initialValue?: string): EnumValue;

        /**
         * Returns a textual setting that is shown as a text field in the Bitwig Studio user interface.
         *
         * @param {string} label the name of the setting, must not be `null`
         * @param {string} category the name of the category, may be `null`
         * @param {int} numChars the maximum number of character used for the text value
         * @param {string} initialText the initial text value of the setting
         * @return {StringValue} the object that encapsulates the requested string setting
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        getStringSetting(label?: string, category?: string, numChars?: number, initialText?: string): StringValue;

    }

    /**
     * A generic interface used to implement actions or events that are not associated with a value.
     *
     * @since Bitwig Studio 1.1
     */
    class Signal {
        /**
         * Registers an observer that gets notified when the signal gets fired.
         *
         * @param {function} callback a callback function that does not receive any argument.
         * @since Bitwig Studio 1.1
         */
        addSignalObserver(callback?: Function): void;

        /**
         * Fires the action or event represented by the signal object.
         *
         * @since Bitwig Studio 1.1
         */
        fire(): void;

    }

    /**
     * Instances of this interface represent the state of a solo button.
     *
     * @since Bitwig Studio 1.1
     */
    class SoloValue extends BooleanValue {
        /**
         * Toggles the current solo state.
         *
         * @param {boolean} exclusive specifies if solo on other channels should be disabled
                         automatically ('true') or not ('false').
         * @since Bitwig Studio 1.1
         */
        toggle(exclusive?: boolean): void;

    }

    /**
     * Instance of this class represent sources selectors in Bitwig Studio, which are shown as choosers in the user
     * interface and contain entries for either note inputs or audio inputs or both.
     *
     * The most prominent source selector in Bitwig Studio is the one shown in the track IO section,
     * which can be accessed via the API by calling {@link Track#getSourceSelector()}.
     *
     * @since Bitwig Studio 1.0
     */
    class SourceSelector {
        /**
         * Returns an object that indicates if the source selector has note inputs enabled.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        getHasNoteInputSelected(): BooleanValue;

        /**
         * Returns an object that indicates if the source selector has audio inputs enabled.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        getHasAudioInputSelected(): BooleanValue;

    }

    /**
     * Instances of this interface implement the {@link Value} interface for string values.
     *
     * @since Bitwig Studio 1.1
     */
    class StringValue extends Value {
        /**
         * Sets the value object to the given string.
         *
         * @param {string} value the new value string
         * @since Bitwig Studio 1.1
         */
        set(value?: string): void;

    }

    /**
     * Instances of this interface represent time signature values.
     *
     * @since Bitwig Studio 1.1
     */
    class TimeSignatureValue extends Value {
        /**
         * Updates the time signature according to the given string.
         *
         * @param {string} name a textual representation of the new time signature value, formatted as
                    `numerator/denominator[, ticks]`
         * @since Bitwig Studio 1.1
         */
        set(name?: string): void;

        /**
         * Returns an object that provides access to the time signature numerator.
         *
         * @return {IntegerValue} an integer value object that represents the time signature numerator.
         * @since Bitwig Studio 1.1
         */
        getNumerator(): IntegerValue;

        /**
         * Returns an object that provides access to the time signature denominator.
         *
         * @return {IntegerValue} an integer value object that represents the time signature denominator.
         * @since Bitwig Studio 1.1
         */
        getDenominator(): IntegerValue;

        /**
         * Returns an object that provides access to the time signature tick subdivisions.
         *
         * @return {IntegerValue} an integer value object that represents the time signature ticks.
         * @since Bitwig Studio 1.1
         */
        getTicks(): IntegerValue;

    }

    /**
     * Instances of this interface represent tracks in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    class Track extends Channel {
        select(): void;
        /**
         * Registers an observer that reports the position of the track within the list of Bitwig Studio tracks.
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.1
         */
        addPositionObserver(callback?: Function): void;

        /**
         * Returns an object that can be used to access the clip launcher slots of the track.
         *
         * @return {ClipLauncherSlots} an object that represents the clip launcher slots of the track
         * @since Bitwig Studio 1.0
         */
        getClipLauncherSlots(): ClipLauncherSlots;

        /**
         * Registers an observer that reports if the clip launcher slots are queued for stop.
         *
         * @param {function} callback a callback function that receives a single boolean argument.
         * @since Bitwig Studio 1.1
         */
        addIsQueuedForStopObserver(callback?: Function): void;

        /**
         * Returns an object that provides access to the arm state of the track.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        getArm(): BooleanValue;

        /**
         * Returns an object that provides access to the monitoring state of the track.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.1
         */
        getMonitor(): BooleanValue;

        /**
         * Returns an object that provides access to the auto-monitoring state of the track.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.1
         */
        getAutoMonitor(): BooleanValue;

        /**
         * Returns an object that provides access to the cross-fade mode of the track.
         *
         * @return {EnumValue} an enum value object that has three possible states: "A", "B", or "AB"
         * @since Bitwig Studio 1.1
         */
        getCrossFadeMode(): EnumValue;

        /**
         * Returns a value object that provides access to the clip launcher playback state of the track.
         *
         * @return {BooleanValue} a boolean value object that indicates if the clip launcher is stopped for this track
         * @since Bitwig Studio 1.0
         */
        getIsMatrixStopped(): BooleanValue;

        /**
         * Returns a value object that provides access to the clip launcher's queue-for-stop state on this track.
         * A clip is considered to be queued for stop when playback has been requested to be stopped on that clip,
         * but the playback has not stopped yet due to the current launch quantization settings.
         *
         * @return {BooleanValue} a boolean value object that indicates if the clip launcher slots have been queued for stop
         * @since Bitwig Studio 1.0
         */
        getIsMatrixQueuedForStop(): BooleanValue;

        /**
         * Returns the source selector for the track, which is shown in the IO section of the track in Bitwig Studio
         * and lists either note or audio sources or both depending on the track type.
         *
         * @return {SourceSelector} a source selector object
         * @since Bitwig Studio 1.0
         */
        getSourceSelector(): SourceSelector;

        /**
         * Stops playback of the track.
         *
         * @since Bitwig Studio 1.0
         */
        stop(): void;

        /**
         * Calling this method causes the arrangement sequencer to take over playback.
         *
         * @since Bitwig Studio 1.0
         */
        returnToArrangement(): void;

        /**
         * Updates the name of the track.
         *
         * @param {string} name the new track name
         * @since Bitwig Studio 1.0
         */
        setName(name?: string): void;

        /**
         * Registers an observer that reports names for note key values on this track.
         * The track might provide special names for certain keys if it contains instruments that support that
         * features, such as the Bitwig Drum Machine.
         *
         * @param {function} callback a callback function that receives two arguments:
                        1. the key value in the range [0..127], and 2. the name string
         * @since Bitwig Studio 1.0
         */
        addPitchNamesObserver(callback?: Function): void;

        /**
         * Plays a note on the track with a default duration and the given key and velocity.
         *
         * @param {int} key the key value of the played note
         * @param {int} velocity the velocity of the played note
         * @since Bitwig Studio 1.0
         */
        playNote(key?: number, velocity?: number): void;

        /**
         * Starts playing a note on the track with the given key and velocity.
         *
         * @param {int} key the key value of the played note
         * @param {int} velocity the velocity of the played note
         * @since Bitwig Studio 1.0
         */
        startNote(key?: number, velocity?: number): void;

        /**
         * Stops playing a currently played note.
         *
         * @param {int} key the key value of the playing note
         * @param {int} velocity the note-off velocity
         * @since Bitwig Studio 1.0
         */
        stopNote(key?: number, velocity?: number): void;

        /**
         * Registers an observer that reports the track type.
         * Possible reported track types are `Group`, `Instrument`, `Audio`, `Hybrid`, `Effect` or `Master`.
         *
         * @param {int} numChars the maximum number of characters used for the reported track type
         * @param {string} textWhenUnassigned the default text that gets reported when the track is not yet associated with
                                  a Bitwig Studio track.
         * @param {function} callback a callback function that receives a single track type parameter (string).
         * @since Bitwig Studio 1.0
         */
        addTrackTypeObserver(numChars?: number, textWhenUnassigned?: string, callback?: Function): void;

        /**
         * Registers an observer that reports if the track may contain child tracks, which is the case for group tracks.
         *
         * @param {function} callback a callback function that receives a single boolean parameter.
         * @since Bitwig Studio 1.2
         */
        addIsGroupObserver(callback?: Function): void;

        /**
         * Returns an object that indicates if the track may contain notes.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        getCanHoldNoteData(): BooleanValue;

        /**
         * Returns an object that indicates if the track may contain audio events.
         *
         * @return {BooleanValue} a boolean value object
         * @since Bitwig Studio 1.0
         */
        getCanHoldAudioData(): BooleanValue;

        /**
         * Returns an object that provides access to the cursor item of the track's device selection as shown in
         * the Bitwig Studio user interface.
         *
         * @return {CursorDevice} the requested device selection cursor object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createCursorDevice(): CursorDevice;

        /**
         * Creates a named device selection cursor that is independent from the device selection in the Bitwig Studio
         * user interface, assuming the name parameter is not null. When `name` is `null` the result is equal to
         * calling {@link Track#createCursorDevice}.
         *
         * @param {string} name the name of the custom device selection cursor, for example "Primary", or `null` to refer to
                    the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
                    interface.
         * @return {CursorDevice} the requested device selection cursor object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1
         */
        createCursorDevice(name?: string): CursorDevice;

        /**
         * Creates a named device selection cursor that is independent from the device selection in the Bitwig Studio
         * user interface, assuming the name parameter is not null. When `name` is `null` the result is equal to
         * calling {@link Track#createCursorDevice}.
         *
         * @param {string} name the name of the custom device selection cursor, for example "Primary", or `null` to refer to
                    the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
                    interface.
         * @param {int} numSends the number of sends that are simultaneously accessible in nested channels.
         * @return {CursorDevice} the requested device selection cursor object
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.1.6
         */
        createCursorDevice(name?: string, numSends?: number): CursorDevice;

        /**
         * Returns a track bank with the given number of child tracks, sends and scenes. The track bank will only
         * have content if the connected track is a group track.<br/>
         *
         * A track bank can be seen as a fixed-size window onto the list of tracks in the connected track group
         * including their sends and scenes, that can be scrolled in order to access different parts of the track list.
         * For example a track bank configured for 8 tracks can show track 1-8, 2-9, 3-10 and so on.<br/>
         *
         * The idea behind the `bank pattern` is that hardware typically is equipped with a fixed amount of channel
         * strips or controls, for example consider a mixing console with 8 channels, but Bitwig Studio documents contain a
         * dynamic list of tracks, most likely more tracks than the hardware can control simultaneously. The track bank
         * returned by this function provides a convenient interface for controlling which tracks are currently shown on
         * the hardware.<br/>
         *
         * Creating a track bank using this method will consider all tracks in the document, including effect tracks
         * and the master track. Use {@link #createMainTrackBank} or {@link #createEffectTrackBank} in case you are only
         * interested in tracks of a certain kind.
         *
         * @param {int} numTracks the number of child tracks spanned by the track bank
         * @param {int} numSends the number of sends spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                                child tracks or only on the direct child tracks of the connected group track.
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.2
         */
        createTrackBank(numTracks?: number, numSends?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

        /**
         * Returns a track bank with the given number of child tracks, sends and scenes. Only audio tracks, instrument
         * tracks and hybrid tracks are considered. The track bank will only have content if the connected track is
         * a group track.
         * For more information about track banks and the `bank pattern` in general,
         * see the documentation for {@link #createTrackBank}.
         *
         * @param {int} numTracks the number of child tracks spanned by the track bank
         * @param {int} numSends the number of sends spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                                child tracks or only on the direct child tracks of the connected group track.
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.2
         */
        createMainTrackBank(numTracks?: number, numSends?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

        /**
         * Returns a track bank with the given number of child effect tracks and scenes.
         * Only effect tracks are considered. The track bank will only have content if the connected track is
         * a group track.
         * For more information about track banks and the `bank pattern` in general, see the documentation for
         * {@link #createTrackBank}.
         *
         * @param {int} numTracks the number of child tracks spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @param {boolean} hasFlatTrackList specifies whether the track bank should operate on a flat list of all nested
                                child tracks or only on the direct child tracks of the connected group track.
         * @return {TrackBank} an object for bank-wise navigation of tracks, sends and scenes
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.2
         */
        createEffectTrackBank(numTracks?: number, numScenes?: number, hasFlatTrackList?: boolean): TrackBank;

        /**
         * Returns an object that represents the master track of the connected track group.
         * The returned object will only have content if the connected track is a group track.
         *
         * @param {int} numScenes the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
         * @return {Track} an object representing the master track of the connected track group.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.2
         */
        createMasterTrack(numScenes?: number): Track;

        /**
         * Returns a bank of sibling tracks with the given number of tracks, sends and scenes.
         * For more information about track banks and the `bank pattern` in general,
         * see the documentation for {@link #createTrackBank}.
         *
         * @param {int} numTracks the number of child tracks spanned by the track bank
         * @param {int} numSends the number of sends spanned by the track bank
         * @param {int} numScenes the number of scenes spanned by the track bank
         * @param {boolean} shouldIncludeEffectTracks specifies whether effect tracks should be included
         * @param {boolean} shouldIncludeMasterTrack specifies whether the master should be included
         * @return {TrackBank} an object for bank-wise navigation of sibling tracks
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.2
         */
        createSiblingsTrackBank(numTracks?: number, numSends?: number, numScenes?: number, shouldIncludeEffectTracks?: boolean, shouldIncludeMasterTrack?: boolean): TrackBank;

    }

    /**
     * A track bank provides access to a range of tracks and their scenes (clip launcher slots) in Bitwig Studio.
     * Instances of track bank are configured with a fixed number of tracks and scenes and represent an excerpt
     * of a larger list of tracks and scenes. Various methods are provided for scrolling to different sections
     * of the track/scene list. It basically acts like a 2-dimensional window moving over the grid of tracks
     * and scenes.
     *
     * To receive an instance of track bank that supports all kinds of tracks call {@link Host#createTrackBank}.
     * Additional methods are provided in the {@link Host} interface to create track banks that include only main
     * tracks ({@link Host#createMainTrackBank}) or only effect tracks ({@link Host#createEffectTrackBank}).
     *
     * @see {@link Host#createTrackBank}
     * @see {@link Host#createMainTrackBank}
     * @see {@link Host#createEffectTrackBank}
     * @since Bitwig Studio 1.0
     */
    class TrackBank extends ChannelBank {
        /**
         * Returns the track at the given index within the bank.
         *
         * @param {int} indexInBank the track index within this bank, not the index within the list of all Bitwig Studio
                           tracks. Must be in the range [0..sizeOfBank-1].
         * @return {Track} the requested track object
         * @since Bitwig Studio 1.0
         */
        getChannel(indexInBank?: number): Track;

        /**
         * Scrolls the scenes one page up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollScenesPageUp(): void;

        /**
         * Scrolls the scenes one page down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollScenesPageDown(): void;

        /**
         * Scrolls the scenes one step up.
         *
         * @since Bitwig Studio 1.0
         */
        scrollScenesUp(): void;

        /**
         * Scrolls the scenes one step down.
         *
         * @since Bitwig Studio 1.0
         */
        scrollScenesDown(): void;

        /**
         * Makes the scene with the given position visible in the track bank.
         *
         * @param {int} position the position of the scene within the underlying full list of scenes
         * @since Bitwig Studio 1.0
         */
        scrollToScene(position?: number): void;

        /**
         * Registers an observer that reports the current scene scroll position.
         *
         * @param {function} callback a callback function that takes a single integer parameter
         * @param {int} valueWhenUnassigned the default value that gets reports when the track bank is not yet connected
                                   to a Bitwig Studio document
         * @since Bitwig Studio 1.0
         */
        addSceneScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

        /**
         * Registers an observer that reports if the scene window can be scrolled further up.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollScenesUpObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the scene window can be scrolled further down.
         *
         * @param {function} callback a callback function that takes a single boolean parameter
         * @since Bitwig Studio 1.0
         */
        addCanScrollScenesDownObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the underlying total scene count
         * (not the number of scenes available in the bank window).
         *
         * @param {function} callback a callback function that receives a single integer parameter
         * @since Bitwig Studio 1.0
         */
        addSceneCountObserver(callback?: Function): void;

        /**
         * Returns an object that provides access to the clip launcher scenes of the track bank.
         *
         * @return {ClipLauncherScenesOrSlots} an object that provides access to the clip launcher scenes of the track bank.
         * @since Bitwig Studio 1.0
         */
        getClipLauncherScenes(): ClipLauncherScenesOrSlots;

        /**
         * Launches the scene with the given bank index.
         *
         * @param {int} indexInWindow the scene index within the bank, not the position of the scene withing the underlying full
                             list of scenes.
         * @since Bitwig Studio 1.0
         */
        launchScene(indexInWindow?: number): void;

    }

    /**
     * An interface representing the transport section in Bitwig Studio.
     *
     * @since Bitwig Studio 1.0
     */
    class Transport {
        /**
         * Starts playback in the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        play(): void;

        /**
         * Stops playback in the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        stop(): void;

        /**
         * Toggles the transport playback state between playing and stopped.
         *
         * @since Bitwig Studio 1.0
         */
        togglePlay(): void;

        /**
         * When the transport is stopped, calling this function starts transport playback, otherwise the transport is
         * first stopped and the playback is restarted from the last play-start position.
         *
         * @since Bitwig Studio 1.0
         */
        restart(): void;

        /**
         * Starts recording in the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        record(): void;

        /**
         * Rewinds the Bitwig Studio transport to the beginning of the arrangement.
         *
         * @since Bitwig Studio 1.0
         */
        rewind(): void;

        /**
         * Calling this function is equivalent to pressing the fast forward button in the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        fastForward(): void;

        /**
         * When calling this function multiple times, the timing of those calls gets evaluated and causes adjustments
         * to the project tempo.
         *
         * @since Bitwig Studio 1.1
         */
        tapTempo(): void;

        /**
         * Registers an observer that reports if the Bitwig Studio transport is playing.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if playing,
                        `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addIsPlayingObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the Bitwig Studio transport is recording.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if recording,
                        `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addIsRecordingObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if over-dubbing is enabled in Bitwig Studio.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if over-dubbing
                        is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addOverdubObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if clip launcher over-dubbing is enabled in Bitwig Studio.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if clip launcher
                        over-dubbing is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addLauncherOverdubObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the current automation write mode.
         *
         * @param {function} callback a callback function that receives a single string argument.
                        Possible values are `"latch"`, `"touch"` or `"write"`.
         * @since Bitwig Studio 1.0
         */
        addAutomationWriteModeObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if Bitwig Studio is currently writing arranger automation.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when arranger
                        automation write is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addIsWritingArrangerAutomationObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if Bitwig Studio is currently writing clip launcher automation.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when clip launcher
                        automation write is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addIsWritingClipLauncherAutomationObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if automation is overridden in Bitwig Studio.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if overridden,
                        `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addAutomationOverrideObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if arranger looping is enabled in Bitwig Studio.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when enabled,
                        `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addIsLoopActiveObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if punch-in is enabled in the Bitwig Studio transport.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-in
                        is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addPunchInObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if punch-out is enabled in the Bitwig Studio transport.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when punch-out
                        is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addPunchOutObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the metronome is enabled in Bitwig Studio.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` when the metronome
                        is enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addClickObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the metronome has tick playback enabled.
         *
         * @param {function} callback a callback function that receives a single boolean argument (`true` if metronome ticks,
                        are enabled, `false` otherwise).
         * @since Bitwig Studio 1.0
         */
        addMetronomeTicksObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the metronome volume.
         *
         * @param {function} callback a callback function that receives a single numeric argument.
         * @since Bitwig Studio 1.0
         */
        addMetronomeVolumeObserver(callback?: Function): void;

        /**
         * Registers an observer that reports if the metronome is audible during pre-roll.
         *
         * @param {function} callback a callback function that receives a single boolean argument.
         * @since Bitwig Studio 1.2
         */
        addPreRollClickObserver(callback?: Function): void;

        /**
         * Registers an observer that reports the current pre-roll setting.
         *
         * @param {function} callback a callback function that receives a single string argument. Possible values are
                        `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
         * @since Bitwig Studio 1.0
         */
        addPreRollObserver(callback?: Function): void;

        /**
         * Toggles the enabled state of the arranger loop in Bitwig Studio.
         *
         * @since Bitwig Studio 1.0
         */
        toggleLoop(): void;

        /**
         * Enables of disables the arranger loop according to the given parameter.
         *
         * @param {boolean} isEnabled `true` to enable the arranger loop, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setLoop(isEnabled?: boolean): void;

        /**
         * Toggles the punch-in enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        togglePunchIn(): void;

        /**
         * Toggles the punch-out enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        togglePunchOut(): void;

        /**
         * Toggles the metronome enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        toggleClick(): void;

        /**
         * Enables of disables the metronome according to the given parameter.
         *
         * @param {boolean} isEnabled `true` to enable the metronome, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setClick(isEnabled?: boolean): void;

        /**
         * Toggles the enabled state of the metronome ticks.
         *
         * @since Bitwig Studio 1.0
         */
        toggleMetronomeTicks(): void;

        /**
         * Toggles the enabled state of the metronome during pre-roll.
         *
         * @since Bitwig Studio 1.2
         */
        toggleMetronomeDuringPreRoll(): void;

        /**
         * Updates the transport pre-roll setting according to the given parameter.
         *
         * @param {string} value the new pre-roll setting, either `"none"`, `"one_bar"`, `"two_bars"`, or `"four_bars"`.
         * @since Bitwig Studio 1.2
         */
        setPreRoll(value?: string): void;

        /**
         * Sets the metronome volume.
         *
         * @param {number} amount the new metronome volume relative to the specified range.
                      Values should be in the range [0..range-1].
         * @param {number} range the range of the provided amount value
         * @since Bitwig Studio 1.0
         */
        setMetronomeValue(amount?: number, range?: number): void;

        /**
         * Toggles the over-dubbing enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        toggleOverdub(): void;

        /**
         * Enables of disables arranger over-dubbing according to the given parameter.
         *
         * @param {boolean} isEnabled `true` to enable over-dubbing, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setOverdub(isEnabled?: boolean): void;

        /**
         * Toggles clip launcher overdubbing in Bitwig Studio.
         *
         * @since Bitwig Studio 1.0
         */
        toggleLauncherOverdub(): void;

        /**
         * Enables of disables clip launcher over-dubbing according to the given parameter.
         *
         * @param {boolean} isEnabled `true` to enable the over-dubbing, `false` otherwise
         * @since Bitwig Studio 1.0
         */
        setLauncherOverdub(isEnabled?: boolean): void;

        /**
         * Sets the automation write mode.
         *
         * @param {string} mode the string that identifies the new automation write mode.
                    Possible values are `"latch"`, `"touch"` or `"write"`.
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        setAutomationWriteMode(mode?: string): void;

        /**
         * Toggles the latch automation write mode in the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        toggleLatchAutomationWriteMode(): void;

        /**
         * Toggles the arranger automation write enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        toggleWriteArrangerAutomation(): void;

        /**
         * Toggles the clip launcher automation write enabled state of the Bitwig Studio transport.
         *
         * @since Bitwig Studio 1.0
         */
        toggleWriteClipLauncherAutomation(): void;

        /**
         * Resets any automation overrides in Bitwig Studio.
         *
         * @since Bitwig Studio 1.0
         */
        resetAutomationOverrides(): void;

        /**
         * Switches playback to the arrangement sequencer on all tracks.
         *
         * @since Bitwig Studio 1.0
         */
        returnToArrangement(): void;

        /**
         * Returns an object that provides access to the project tempo.
         *
         * @return {AutomatableRangedValue} the requested tempo value object
         * @since Bitwig Studio 1.0
         */
        getTempo(): AutomatableRangedValue;

        /**
         * Increases the project tempo value by the given amount, which is specified relative to the given range.
         *
         * @param {number} amount the new tempo value relative to the specified range.
                      Values should be in the range [0..range-1].
         * @param {number} range the range of the provided amount value
         * @throws ControlSurfaceException
         * @since Bitwig Studio 1.0
         */
        increaseTempo(amount?: number, range?: number): void;

        /**
         * Returns an object that provides access to the transport position in Bitwig Studio.
         *
         * @return {BeatTime} a beat time object that represents the transport position
         * @since Bitwig Studio 1.0
         */
        getPosition(): BeatTime;

        /**
         * Sets the transport playback position to the given beat time value.
         *
         * @param {double} beats the new playback position in beats
         * @since Bitwig Studio 1.0
         */
        setPosition(beats?: number): void;

        /**
         * Increases the transport position value by the given number of beats, which is specified relative to the given range.
         *
         * @param {double} beats the beat time value that gets added to the current transport position.
                     Values have double precision and can be positive or negative.
         * @param {boolean} snap when `true` the actual new transport position will be quantized to the beat grid, when
                    `false` the position will be increased exactly by the specified beat time
         * @since Bitwig Studio 1.0
         */
        incPosition(beats?: number, snap?: boolean): void;

        /**
         * Returns an object that provides access to the punch-in position in the Bitwig Studio transport.
         *
         * @return {BeatTime} a beat time object that represents the punch-in position
         * @since Bitwig Studio 1.0
         */
        getInPosition(): BeatTime;

        /**
         * Returns an object that provides access to the punch-out position in the Bitwig Studio transport.
         *
         * @return {BeatTime} a beat time object that represents the punch-out position
         * @since Bitwig Studio 1.0
         */
        getOutPosition(): BeatTime;

        /**
         * Returns an object that provides access to the cross-fader, used for mixing between A/B-channels as specified
         * on the Bitwig Studio tracks.
         *
         * @return {AutomatableRangedValue}
         * @since Bitwig Studio 1.1
         */
        getCrossfade(): AutomatableRangedValue;

        /**
         * Returns an object that provides access to the transport time signature.
         *
         * @return {TimeSignatureValue} the time signature value object that represents the transport time signature.
         * @since Bitwig Studio 1.1
         */
        getTimeSignature(): TimeSignatureValue;

    }

    /**
     * Instances of this interface represent a bank of custom controls that can be manually
     * learned to device parameters by the user.
     *
     * @since Bitwig Studio 1.0
     */
    class UserControlBank {
        /**
         * Gets the user control at the given bank index.
         *
         * @param {int} index the index of the control within the bank
         * @return {AutomatableRangedValue} the requested user control object
         * @since Bitwig Studio 1.0
         */
        getControl(index?: number): AutomatableRangedValue;

    }

    /**
     * The common interface that is shared by all value objects in the controller API.
     *
     * @since Bitwig Studio 1.1
     */
    class Value {
        /**
         * Registers an observer that reports the current value.
         *
         * @param {function} callback a callback function that receives a single parameter
         * @since Bitwig Studio 1.0
         */
        addValueObserver(callback?: Function): void;

    }
}
