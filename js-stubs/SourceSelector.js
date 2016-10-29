/* API Version - 1.3.13 */

/**
 * Instance of this class represent sources selectors in Bitwig Studio, which are shown as choosers in the user
 * interface and contain entries for either note inputs or audio inputs or both.
 * 
 * The most prominent source selector in Bitwig Studio is the one shown in the track IO section,
 * which can be accessed via the API by calling {@link Track#getSourceSelector()}.
 *
 * @since Bitwig Studio 1.0
 */
function SourceSelector() {}

/**
 * Returns an object that indicates if the source selector has note inputs enabled.
 *
 * @return {BooleanValue} a boolean value object
 * @since Bitwig Studio 1.0
 */
SourceSelector.prototype.getHasNoteInputSelected = function() {};

/**
 * Returns an object that indicates if the source selector has audio inputs enabled.
 *
 * @return {BooleanValue} a boolean value object
 * @since Bitwig Studio 1.0
 */
SourceSelector.prototype.getHasAudioInputSelected = function() {};
