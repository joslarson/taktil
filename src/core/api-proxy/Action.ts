import ApiProxy from './ApiProxy';

import ActionCategory from './ActionCategory';


class Action extends ApiProxy {
    constructor (target) {
        super(target);
        this._extendMethodClassMap({
            'getCategory': ActionCategory,
        });
    }
}


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
declare interface Action {
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


export default Action;