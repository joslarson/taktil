import ApiProxy from './ApiProxy';


import Action from './Action';


class ActionCategory extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getActions': Action,
        });
    }
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
declare interface ActionCategory {
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


export default ActionCategory;
