import ApiProxy from './ApiProxy';
import Track from './Track';


class Project extends ApiProxy {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getRootTrackGroup': Track,
            'getShownTopLevelTrackGroup': Track,
        });
    }
}


/**
 * An interface for representing the current project.
 *
 * @since Bitwig Studio 1.1.5
 */
declare interface Project {
    /**
     * Returns an object that represents the root track group of the active Bitwig Studio project.
     *
     * @return {Track} the root track group of the currently active project
     * @since Bitwig Studio 1.2
     */
    getRootTrackGroup(): Track;

    /**
     * Returns an object that represents the top level track group as shown in the arranger/mixer
     * of the active Bitwig Studio project.
     *
     * @return {Track} the shown top level track group of the currently active project
     * @since Bitwig Studio 1.2
     */
    getShownTopLevelTrackGroup(): Track;

    /**
     * Creates a new scene (using an existing empty scene if possible) from the clips that are currently
     * playing in the clip launcher.
     *
     * @since Bitwig Studio 1.1.5
     */
    createSceneFromPlayingLauncherClips(): void;

}


export default Project;
