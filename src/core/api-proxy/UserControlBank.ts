import ApiProxy from './ApiProxy';
import AutomatableRangedValue from './AutomatableRangedValue';


class UserControlBank extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getControl': AutomatableRangedValue,
        });
    }
}


/**
 * Instances of this interface represent a bank of custom controls that can be manually
 * learned to device parameters by the user.
 *
 * @since Bitwig Studio 1.0
 */
declare interface UserControlBank {
    /**
     * Gets the user control at the given bank index.
     *
     * @param {int} index the index of the control within the bank
     * @return {AutomatableRangedValue} the requested user control object
     * @since Bitwig Studio 1.0
     */
    getControl(index?: number): AutomatableRangedValue;

}


export default UserControlBank;
