/* API Version - 1.3.13 */

/**
 * A special kind of selection cursor used for controllers.
 *
 * @since Bitwig Studio 1.1
 */
function CursorController() {}

CursorController.prototype = new Cursor();
CursorController.prototype.constructor = CursorController;

/**
 * Returns the channel that this cursor controller was created on.
 * Currently this will always be a track or cursor track instance.
 *
 * @return {Channel} the track or cursor track object that was used for creation of this cursor controller.
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.getChannel = function() {};

/**
 * Selects the parent controller if there is any.
 *
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectParent = function() {};

/**
 * Moves this cursor to the given controller.
 *
 * @param {Controller} controller the controller that this cursor should point to
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectController = function(controller) {};

/**
 * Selects the first controller in the given channel.
 *
 * @param {Channel} channel the channel in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectFirstInChannel = function(channel) {};

/**
 * Selects the last controller in the given channel.
 *
 * @param {Channel} channel the channel in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectLastInChannel = function(channel) {};

/**
 * Selects the first controller in the nested FX slot with the given name.
 *
 * @param {string} chain the name of the FX slot in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectFirstInSlot = function(chain) {};

/**
 * Selects the last controller in the nested FX slot with the given name.
 *
 * @param {string} chain the name of the FX slot in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectLastInSlot = function(chain) {};

/**
 * Selects the first controller in the drum pad associated with the given key.
 *
 * @param {int} key the key associated with the drum pad in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectFirstInKeyPad = function(key) {};

/**
 * Selects the last controller in the drum pad associated with the given key.
 *
 * @param {int} key the key associated with the drum pad in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectLastInKeyPad = function(key) {};

/**
 * Selects the first controller in the nested layer with the given index.
 *
 * @param {int} index the index of the nested layer in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectFirstInLayer = function(index) {};

/**
 * Selects the last controller in the nested layer with the given index.
 *
 * @param {int} index the index of the nested layer in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectLastInLayer = function(index) {};

/**
 * Selects the first controller in the nested layer with the given name.
 *
 * @param {string} name the name of the nested layer in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectFirstInLayer = function(name) {};

/**
 * Selects the last controller in the nested layer with the given name.
 *
 * @param {string} name the name of the nested layer in which the controller should be selected
 * @since Bitwig Studio 1.1
 */
CursorController.prototype.selectLastInLayer = function(name) {};
