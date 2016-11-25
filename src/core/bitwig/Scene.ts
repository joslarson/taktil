import ApiProxy from './ApiProxy';
import StringValue from './StringValue';
import Value from './Value';


class Scene extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getName': StringValue,
        });
    }
}


/**
 * Instances of this interface represent scenes in Bitwig Studio.
 *
 * @since Bitwig Studio 1.1
 */
declare interface Scene {
    /**
     * Returns a value object that indicates if the scene exists.
     *
     * @return {Value} a boolean value object
     * @since Bitwig Studio 1.1
     */
    exists(): Value;

    /**
     * Launches the scene.
     *
     * @since Bitwig Studio 1.1
     */
    launch(): void;

    /**
     * Returns an object that provides access to the name of the scene.
     *
     * @return {StringValue} a string value object that represents the scene name.
     * @since Bitwig Studio 1.1
     */
    getName(): StringValue;

    /**
     * Registers an observer that reports the position of the scene within the list of Bitwig Studio scenes.
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.1
     */
    addPositionObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the scene is selected in Bitwig Studio.
     *
     * @param {function} callback a callback function that takes a single boolean parameter.
     * @since Bitwig Studio 1.1
     */
    addIsSelectedInEditorObserver(callback?: Function): void;

    /**
     * Selects the scene in Bitwig Studio.
     *
     * @since Bitwig Studio 1.1
     */
    selectInEditor(): void;

    /**
     * Makes the scene visible in the Bitwig Studio user interface.
     *
     * @since Bitwig Studio 1.1
     */
    showInEditor(): void;

}


export default Scene;
