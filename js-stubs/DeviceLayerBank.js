/* API Version - 1.3.13 */

/**
 * Controllers layers are features of special Bitwig Studio controllers, more specifically the Layer Instrument and
 * Layer FX controllers, and are also shown as sub-channels in the mixer panel.
 * 
 * Instances of controller layer bank are configured with a fixed number of channels and represent an excerpt
 * of underlying complete list of channels. Various methods are provided for scrolling to different sections
 * of the underlying list. It basically acts like a one-dimensional window moving over the controller layers.
 * 
 * To receive an instance of controller layer bank call {@link Controller#createLayerBank(int numChannels)}.
 *
 * @see {@link Controller#createLayerBank}
 * @since Bitwig Studio 1.1
 */
function ControllerLayerBank() {}

ControllerLayerBank.prototype = new ChannelBank();
ControllerLayerBank.prototype.constructor = ControllerLayerBank;

/**
 * Returns the controller layer at the given index.
 *
 * @param {int} indexInBank the controller layer index within this bank, not the index within the list of all controller layers
                   as shown in Bitwig Studio layer controllers. Must be in the range [0..sizeOfBank-1].
 * @return {ControllerLayer} the controller layer object
 * @since Bitwig Studio 1.1
 */
ControllerLayerBank.prototype.getChannel = function(indexInBank) {};
