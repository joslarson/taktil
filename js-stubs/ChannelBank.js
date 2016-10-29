/* API Version - 1.3.13 */

/**
 * A channel bank provides access to a range of channels in Bitwig Studio, such as tracks or controller layers.
 * Instances of channel bank are typically configured with support for a fixed number of channels and
 * represent an excerpt of a larger list of channels. Various methods are provided for scrolling to different
 * sections of the channel list. It basically acts like a window moving over the list of channels.
 *
 * @since Bitwig Studio 1.0
 */
function ChannelBank() {}

/**
 * Returns the channel for the given index.
 *
 * @param {int} indexInBank the channel index within this bank, not the index within the list of all Bitwig Studio
                   channels. Must be in the range [0..sizeOfBank-1].
 * @return {Channel} the channel object
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.getChannel = function(indexInBank) {};

/**
 * Sets the step size used for scrolling the channel bank.
 *
 * @param {int} stepSize the step size used for scrolling. Default is `1`.
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.setChannelScrollStepSize = function(stepSize) {};

/**
 * Scrolls the channels one page up. For example if the channel bank is configured with a window size of
 * 8 channels and is currently showing channel [1..8], calling this method would scroll the channel bank
 * to show channel [9..16].
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollChannelsPageUp = function() {};

/**
 * Scrolls the channels one page up. For example if the channel bank is configured with a window size of
 * 8 channels and is currently showing channel [9..16], calling this method would scroll the channel bank
 * to show channel [1..8].
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollChannelsPageDown = function() {};

/**
 * Scrolls the channel window up by the amount specified via {@link #setChannelScrollStepSize(int)}
 * (by default one channel).
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollChannelsUp = function() {};

/**
 * Scrolls the channel window down by the amount specified via {@link #setChannelScrollStepSize(int)}
 * (by default one channel).
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollChannelsDown = function() {};

/**
 * Scrolls the channel bank window so that the channel at the given position becomes visible.
 *
 * @param {int} position the index of the channel within the underlying full list of channels (not the index within
                the bank). The position is typically directly related to the layout of the channel list in
                Bitwig Studio, starting with zero in case of the first channel.
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollToChannel = function(position) {};

/**
 * Registers an observer that reports the current scroll position, more specifically the position of the first
 * channel within the underlying list of channels, that is shown as channel zero within the bank.
 *
 * @param {function} callback a callback function that receives a single integer number parameter
 * @param {int} valueWhenUnassigned a default value for the channel position that gets reported in case the channel bank
                           is not connected to a list of channels in Bitwig Studio.
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addChannelScrollPositionObserver = function(callback, valueWhenUnassigned) {};

/**
 * Registers an observer that reports if the channel bank can be scrolled further up.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addCanScrollChannelsUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the channel bank can be scrolled further down.
 *
 * @param {function} callback a callback function that receives a single boolean parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addCanScrollChannelsDownObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total channel count
 * (not the number of channels available in the bank window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addChannelCountObserver = function(callback) {};

/**
 * Scrolls the sends one page up.
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollSendsPageUp = function() {};

/**
 * Scrolls the sends one page down.
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollSendsPageDown = function() {};

/**
 * Scrolls the sends one step up.
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollSendsUp = function() {};

/**
 * Scrolls the sends one step down.
 *
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.scrollSendsDown = function() {};

/**
 * Registers an observer that reports if the sends window can be scrolled further up.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addCanScrollSendsUpObserver = function(callback) {};

/**
 * Registers an observer that reports if the sends window can be scrolled further down.
 *
 * @param {function} callback a callback function that takes a single boolean parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addCanScrollSendsDownObserver = function(callback) {};

/**
 * Registers an observer that reports the underlying total send count
 * (not the number of sends available in the bank window).
 *
 * @param {function} callback a callback function that receives a single integer parameter
 * @since Bitwig Studio 1.0
 */
ChannelBank.prototype.addSendCountObserver = function(callback) {};
