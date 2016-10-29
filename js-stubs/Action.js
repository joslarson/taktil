/* API Version - 1.3.13 */

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
function Action() {}

/**
 * Returns a string the identifies this action uniquely.
 *
 * @return {string} the identifier string
 * @since Bitwig Studio 1.1
 */
Action.prototype.getId = function() {};

/**
 * Returns the name of this action.
 *
 * @return {string} the name string
 * @since Bitwig Studio 1.1
 */
Action.prototype.getName = function() {};

/**
 * Returns the category of this action.
 *
 * @return {ActionCategory} the category string
 * @since Bitwig Studio 1.1
 */
Action.prototype.getCategory = function() {};

/**
 * Returns the text that is displayed in menu items associated with this action.
 *
 * @return {string} the menu item text
 * @since Bitwig Studio 1.1
 */
Action.prototype.getMenuItemText = function() {};

/**
 * Invokes the action.
 *
 * @since Bitwig Studio 1.1
 */
Action.prototype.invoke = function() {};
