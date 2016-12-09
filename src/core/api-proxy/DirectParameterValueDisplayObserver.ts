import ApiProxy from './ApiProxy';


class DirectParameterValueDisplayObserver extends ApiProxy {

}


/**
 * This interface is used to configure observation of pretty-printed device parameter values.
 *
 * @since Bitwig Studio 1.1.5
 */
declare interface DirectParameterValueDisplayObserver {
    /**
     * Starts observing the parameters according to the given parameter ID array, or stops observing
     * in case `null` is passed in for the parameter ID array.
     *
     * @param {String[]} parameterIds the array of parameter IDs or `null` to stop observing parameter display values.
     * @since Bitwig Studio 1.1.5
     */
    setObservedParameterIds(parameterIds?: string[]): void;

}


export default DirectParameterValueDisplayObserver;
