import ApiProxy from './ApiProxy';
import AutomatableRangedValue from './AutomatableRangedValue';
import ModulationSource from './ModulationSource';


class Macro extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getAmount': AutomatableRangedValue,
            'getModulationSource': ModulationSource,
        });
    }
}


/**
 * Instances of this interface are used to represent macro controls in Bitwig Studio to devices.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Macro {
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


export default Macro;
