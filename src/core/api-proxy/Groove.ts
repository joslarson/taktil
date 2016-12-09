import ApiProxy from './ApiProxy';
import AutomatableRangedValue from './AutomatableRangedValue';


class Groove extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getEnabled': AutomatableRangedValue,
            'getShuffleAmount': AutomatableRangedValue,
            'getShuffleRate': AutomatableRangedValue,
            'getAccentAmount': AutomatableRangedValue,
            'getAccentRate': AutomatableRangedValue,
            'getAccentPhase': AutomatableRangedValue,
        });
    }
}


/**
 * An interface representing the global groove settings of the project.
 *
 * @since Bitwig Studio 1.0
 */
declare interface Groove {
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


export default Groove;
