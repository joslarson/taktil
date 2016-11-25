import ApiProxy from './ApiProxy';


/**
 * Instances of this interface represent the cursor item of track selections.
 *
 * @since Bitwig Studio 1.2
 */
class CursorNavigationMode extends ApiProxy {
    static NESTED = 0;
    static FLAT = 1;
    static GUI = 2;
}


export default CursorNavigationMode;
