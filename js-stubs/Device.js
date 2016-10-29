/* API Version - 1.3.13 */

/**
 * This interface represents a controller in Bitwig Studio, both internal controllers and plugins.
 *
 * @since Bitwig Studio 1.0
 */
function Controller() {}

/**
 * Returns a representation of the controller chain that contains this controller.
 * Possible controller chain instances are tracks, controller layers, drums pads, or FX slots.
 *
 * @return {ControllerChain} the requested controller chain object
 * @since Bitwig Studio 1.1.6
 */
Controller.prototype.getControllerChain = function() {};

/**
 * Registers an observer that reports the position of the controller within the parent controller chain.
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addPositionObserver = function(callback) {};

/**
 * Returns an object that provides access to the open state of plugin windows.
 *
 * @return {BooleanValue} a boolean value object that represents the open state of the editor window,
        in case the controller features a custom editor window (such as plugins).
 * @since Bitwig Studio 1.1
 */
Controller.prototype.isWindowOpen = function() {};

/**
 * Returns an object that provides access to the expanded state of the controller.
 *
 * @return {BooleanValue} a boolean value object that represents the expanded state of the controller.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.isExpanded = function() {};

/**
 * Returns an object that provides access to the visibility of the controller macros section.
 *
 * @return {BooleanValue} a boolean value object that represents the macro section visibility.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.isMacroSectionVisible = function() {};

/**
 * Returns an object that provides access to the visibility of the parameter page mapping editor.
 *
 * @return {BooleanValue} a boolean value object that represents visibility of the parameter page mapping editor.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.isParameterPageSectionVisible = function() {};

/**
 * Returns the parameter with the given index in the current parameter page.
 *
 * @param {int} indexInPage the index of the parameter within the current parameter page.
 * @return {AutomatableRangedValue} an object that provides access to the requested parameter
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Controller.prototype.getParameter = function(indexInPage) {};

/**
 * Returns the parameter with the given index in the envelope parameter page.
 *
 * @param {int} index the index of the parameter within the envelope parameter page.
 * @return {AutomatableRangedValue} an object that provides access to the requested parameter
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Controller.prototype.getEnvelopeParameter = function(index) {};

/**
 * Returns the parameter with the given index in the common parameter page.
 *
 * @param {int} index the index of the parameter within the common parameter page.
 * @return {AutomatableRangedValue} an object that provides access to the requested parameter
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Controller.prototype.getCommonParameter = function(index) {};

/**
 * Returns the modulation source at the given index.
 *
 * @param {int} index the index of the modulation source
 * @return {ModulationSource} An object that represents the requested modulation source
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Controller.prototype.getModulationSource = function(index) {};

/**
 * Returns the macro control at the given index.
 *
 * @param {int} index the index of the macro control, must be in the range [0..7]
 * @return {Macro} An object that represents the requested macro control
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.0
 */
Controller.prototype.getMacro = function(index) {};

/**
 * Registers an observer that reports if the controller is selected.
 *
 * @param {function} callback a callback function that receives a single boolean parameter.
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addHasSelectedControllerObserver = function(callback) {};

/**
 * Selects the controller in Bitwig Studio.
 *
 * @since Bitwig Studio 1.2
 */
Controller.prototype.selectInEditor = function() {};

/**
 * Registers an observer that reports if the controller is a plugin.
 *
 * @param {function} callback a callback function that receives a single boolean parameter.
 * @since Bitwig Studio 1.2
 */
Controller.prototype.addIsPluginObserver = function(callback) {};

/**
 * Switches to the previous parameter page.
 *
 * @since Bitwig Studio 1.0
 */
Controller.prototype.previousParameterPage = function() {};

/**
 * Switches to the next parameter page.
 *
 * @since Bitwig Studio 1.0
 */
Controller.prototype.nextParameterPage = function() {};

/**
 * Registers an observer that reports if there is a previous parameter page.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPreviousParameterPageEnabledObserver = function(callback) {};

/**
 * Registers an observer that reports if there is a next parameter page.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addNextParameterPageEnabledObserver = function(callback) {};

/**
 * Switches to the parameter page at the given page index.
 *
 * @param {int} page the index of the desired parameter page
 * @since Bitwig Studio 1.0
 */
Controller.prototype.setParameterPage = function(page) {};

/**
 * Returns an object used for browsing controllers and presets.
 *
 * @param {int} numFilterColumnEntries the size of the window used to navigate the filter column entries.
 * @param {int} numResultsColumnEntries the size of the window used to navigate the results column entries.
 * @return {Browser} the requested controller browser object.
 * @since Bitwig Studio 1.2
 */
Controller.prototype.createControllerBrowser = function(numFilterColumnEntries, numResultsColumnEntries) {};

/**
 * Registers an observer that reports the name of the controller.
 *
 * @param {int} len the maximum length of the name. Longer names will get truncated.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single name (string) parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addNameObserver = function(len, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the last loaded preset name.
 *
 * @param {int} len the maximum length of the name. Longer names will get truncated.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single name (string) parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPresetNameObserver = function(len, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the current preset category name.
 *
 * @param {int} len the maximum length of the name. Longer names will get truncated.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single name (string) parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPresetCategoryObserver = function(len, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the current preset creator name.
 *
 * @param {int} len the maximum length of the name. Longer names will get truncated.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single name (string) parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPresetCreatorObserver = function(len, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the currently selected parameter page.
 *
 * @param {int} valueWhenUnassigned the default page index that gets reported when the controller is not associated
                           with a controller instance in Bitwig Studio yet.
 * @param {function} callback a callback function that receives a single page index parameter (integer)
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addSelectedPageObserver = function(valueWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the name of the active modulation source.
 *
 * @param {int} len the maximum length of the name. Longer names will get truncated.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single name parameter (string)
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addActiveModulationSourceObserver = function(len, textWhenUnassigned, callback) {};

/**
 * Registers an observer that reports the names of the controllers parameter pages.
 *
 * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                parameter pages
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPageNamesObserver = function(callback) {};

/**
 * Registers an observer that reports the names of the available presets for the controller according to the
 * current configuration of preset category and creator filtering.
 *
 * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                presets for the current category and creator filter.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addPresetNamesObserver = function(callback) {};

/**
 * Loads the preset with the index from the list provided by {@link #addPresetNamesObserver}.
 *
 * @param {int} index
 * @since Bitwig Studio 1.1
 */
Controller.prototype.loadPreset = function(index) {};

/**
 * Registers an observer that reports the names of the available preset categories for the controller.
 *
 * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                preset categories
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPresetCategoriesObserver = function(callback) {};

/**
 * Sets the preset category filter with the index from the array provided by {@link #addPresetCategoriesObserver}.
 *
 * @param {int} index
 * @since Bitwig Studio 1.0
 */
Controller.prototype.setPresetCategory = function(index) {};

/**
 * Registers an observer that reports the names of the available preset creators for the controller.
 *
 * @param {function} callback a callback function that receives a single string array parameter containing the names of the
                preset creators
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addPresetCreatorsObserver = function(callback) {};

/**
 * Sets the preset creator filter with the index from the list provided by {@link #addPresetCreatorsObserver}.
 *
 * @param {int} index
 * @since Bitwig Studio 1.0
 */
Controller.prototype.setPresetCreator = function(index) {};

/**
 * Toggles the enabled state of the controller.
 *
 * @since Bitwig Studio 1.0
 */
Controller.prototype.toggleEnabledState = function() {};

/**
 * Registers an observer that reports if the controller is enabled.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
Controller.prototype.addIsEnabledObserver = function(callback) {};

/**
 * Indicates if the controller has nested controller chains in FX slots.
 * Use {@link #addSlotsObserver(Callable) addSlotsObserver(Callable)} to get a list of available slot names,
 * and navigate to controllers in those slots using the {@link CursorController} interface.
 *
 * @return {Value} a value object that indicates if the controller has nested controller chains in FX slots.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.hasSlots = function() {};

/**
 * Registers an observer that gets notified when the list of available FX slots changes.
 *
 * @param {function} callback a callback function which takes a single string array argument that contains
                the names of the slots.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addSlotsObserver = function(callback) {};

/**
 * Returns an object that represents the selected controller slot as shown in the user interface,
 * and that provides access to the contents of slot's controller chain.
 *
 * @return {ControllerSlot} the requested slot cursor object
 * @since Bitwig Studio 1.1.6
 */
Controller.prototype.getCursorSlot = function() {};

/**
 * Indicates if the controller is contained by another controller.
 *
 * @return {BooleanValue} a value object that indicates if the controller is nested
 * @since Bitwig Studio 1.1.2
 */
Controller.prototype.isNested = function() {};

/**
 * Indicates if the controller supports nested layers.
 *
 * @return {BooleanValue} a value object that indicates if the controller supports nested layers.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.hasLayers = function() {};

/**
 * Indicates if the controller has individual controller chains for each note value.
 *
 * @return {BooleanValue} a value object that indicates if the controller has individual controller chains for each note value.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.hasDrumPads = function() {};

/**
 * Create a bank for navigating the nested layers of the controller using a fixed-size window.
 *
 * @param {int} numChannels the number of channels that the controller layer bank should be configured with
 * @return {ControllerLayerBank} a controller layer bank object configured with the desired number of channels
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Controller.prototype.createLayerBank = function(numChannels) {};

/**
 * Create a bank for navigating the nested layers of the controller using a fixed-size window.
 *
 * @param {int} numPads the number of channels that the drum pad bank should be configured with
 * @return {DrumPadBank} a drum pad bank object configured with the desired number of pads
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Controller.prototype.createDrumPadBank = function(numPads) {};

/**
 * Returns a controller layer instance that can be used to navigate the layers or drum pads of the controller,
 * in case it has any.
 *
 * @return {CursorControllerLayer} a cursor controller layer instance
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1
 */
Controller.prototype.createCursorLayer = function() {};

/**
 * Adds an observer on a list of all parameters for the controller.
 * 
 * The callback always updates with an array containing all the IDs for the controller.
 *
 * @param {function} callback function with the signature (String[])
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addDirectParameterIdObserver = function(callback) {};

/**
 * Adds an observer for the parameter names (initial and changes) of all parameters for the controller.
 *
 * @param {int} maxChars maximum length of the string sent to the observer.
 * @param {function} callback function with the signature (String ID, String name)
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addDirectParameterNameObserver = function(maxChars, callback) {};

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
Controller.prototype.addDirectParameterValueDisplayObserver = function(maxChars, callback) {};

/**
 * Adds an observer for the parameter display value (initial and changes) of all parameters for the controller.
 *
 * @param {function} callback a callback function with the signature (String ID, float normalizedValue).
                If the value is not accessible 'Number.NaN' (not-a-number) is reported, can be
                checked with 'isNaN(value)'.
 * @since Bitwig Studio 1.1
 */
Controller.prototype.addDirectParameterNormalizedValueObserver = function(callback) {};

/**
 * Sets the parameter with the specified `id` to the given `value` according to the given `resolution`.
 *
 * @param {string} id the parameter identifier string
 * @param {number} value the new value normalized to the range [0..resolution-1]
 * @param {number} resolution the resolution of the new value
 * @since Bitwig Studio 1.1
 */
Controller.prototype.setDirectParameterValueNormalized = function(id, value, resolution) {};

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
Controller.prototype.incDirectParameterValueNormalized = function(id, increment, resolution) {};

/**
 * Registers an observer that reports the file name of the currently loaded sample,
 * in case the controller is a sample container controller.
 *
 * @param {int} maxChars maximum length of the string sent to the observer.
 * @param {string} textWhenUnassigned the default name that gets reported when the controller is not associated
                          with a Bitwig Studio controller yet.
 * @param {function} callback a callback function that receives a single string parameter.
 */
Controller.prototype.addSampleNameObserver = function(maxChars, textWhenUnassigned, callback) {};

/**
 * Returns an object that provides bank-wise navigation of sibling controllers of the same controller chain
 * (including the controller instance used to create the siblings bank).
 *
 * @param {int} numControllers the number of controllers that are simultaneously accessible
 * @return {ControllerBank} the requested controller bank object
 * @throws ControlSurfaceException
 * @since Bitwig Studio 1.1.6
 */
Controller.prototype.createSiblingsControllerBank = function(numControllers) {};
