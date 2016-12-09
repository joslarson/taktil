import ApiProxy from './ApiProxy';
import DeviceChain from './DeviceChain';
import DeviceLayerBank from './DeviceLayerBank';
import DeviceSlot from './DeviceSlot';
import ModulationSource from './ModulationSource';
import DeviceBank from './DeviceBank';
import CursorDeviceLayer from './CursorDeviceLayer';
import DirectParameterValueDisplayObserver from './DirectParameterValueDisplayObserver';
import AutomatableRangedValue from './AutomatableRangedValue';
import Macro from './Macro';
import Value from './Value';
import BooleanValue from './BooleanValue';
import DrumPadBank from './DrumPadBank';
import Browser from './Browser';


class Device extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getDeviceChain': DeviceChain,
            'getParameter': AutomatableRangedValue,
            'getEnvelopeParameter': AutomatableRangedValue,
            'getCommonParameter': AutomatableRangedValue,
            'getModulationSource': ModulationSource,
            'getMacro': Macro,
            'createDeviceBrowser': Browser,
            // 'getCursorSlot': DeviceSlot,
            'getCursorSlot': DeviceChain,
            'createLayerBank': DeviceLayerBank,
            'createDrumPadBank': DrumPadBank,
            'createCursorLayer': CursorDeviceLayer,
            'createSiblingsDeviceBank': DeviceBank,
        });
    }
}


/**
 * This interface represents a device in Bitwig Studio, both internal devices and plugins.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Device {
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


export default Device;
