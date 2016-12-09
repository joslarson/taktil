import ApiProxy from './ApiProxy';


import Track from './Track';
import ChannelBank from './ChannelBank';
import ClipLauncherScenesOrSlots from './ClipLauncherScenesOrSlots';


class TrackBank extends ChannelBank {
    constructor(target) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': Track,
            'getClipLauncherScenes': ClipLauncherScenesOrSlots,
        });
    }
}


/**
 * A track bank provides access to a range of tracks and their scenes (clip launcher slots) in Bitwig Studio.
 * Instances of track bank are configured with a fixed number of tracks and scenes and represent an excerpt
 * of a larger list of tracks and scenes. Various methods are provided for scrolling to different sections
 * of the track/scene list. It basically acts like a 2-dimensional window moving over the grid of tracks
 * and scenes.
 *
 * To receive an instance of track bank that supports all kinds of tracks call {@link Host#createTrackBank}.
 * Additional methods are provided in the {@link Host} interface to create track banks that include only main
 * tracks ({@link Host#createMainTrackBank}) or only effect tracks ({@link Host#createEffectTrackBank}).
 *
 * @see {@link Host#createTrackBank}
 * @see {@link Host#createMainTrackBank}
 * @see {@link Host#createEffectTrackBank}
 * @since Bitwig Studio 1.0
 */
declare interface TrackBank extends ChannelBank {
    /**
     * Returns the track at the given index within the bank.
     *
     * @param {int} indexInBank the track index within this bank, not the index within the list of all Bitwig Studio
                       tracks. Must be in the range [0..sizeOfBank-1].
     * @return {Track} the requested track object
     * @since Bitwig Studio 1.0
     */
    getChannel(indexInBank?: number): Track;

    /**
     * Scrolls the scenes one page up.
     *
     * @since Bitwig Studio 1.0
     */
    scrollScenesPageUp(): void;

    /**
     * Scrolls the scenes one page down.
     *
     * @since Bitwig Studio 1.0
     */
    scrollScenesPageDown(): void;

    /**
     * Scrolls the scenes one step up.
     *
     * @since Bitwig Studio 1.0
     */
    scrollScenesUp(): void;

    /**
     * Scrolls the scenes one step down.
     *
     * @since Bitwig Studio 1.0
     */
    scrollScenesDown(): void;

    /**
     * Makes the scene with the given position visible in the track bank.
     *
     * @param {int} position the position of the scene within the underlying full list of scenes
     * @since Bitwig Studio 1.0
     */
    scrollToScene(position?: number): void;

    /**
     * Registers an observer that reports the current scene scroll position.
     *
     * @param {function} callback a callback function that takes a single integer parameter
     * @param {int} valueWhenUnassigned the default value that gets reports when the track bank is not yet connected
                               to a Bitwig Studio document
     * @since Bitwig Studio 1.0
     */
    addSceneScrollPositionObserver(callback?: Function, valueWhenUnassigned?: number): void;

    /**
     * Registers an observer that reports if the scene window can be scrolled further up.
     *
     * @param {function} callback a callback function that takes a single boolean parameter
     * @since Bitwig Studio 1.0
     */
    addCanScrollScenesUpObserver(callback?: Function): void;

    /**
     * Registers an observer that reports if the scene window can be scrolled further down.
     *
     * @param {function} callback a callback function that takes a single boolean parameter
     * @since Bitwig Studio 1.0
     */
    addCanScrollScenesDownObserver(callback?: Function): void;

    /**
     * Registers an observer that reports the underlying total scene count
     * (not the number of scenes available in the bank window).
     *
     * @param {function} callback a callback function that receives a single integer parameter
     * @since Bitwig Studio 1.0
     */
    addSceneCountObserver(callback?: Function): void;

    /**
     * Returns an object that provides access to the clip launcher scenes of the track bank.
     *
     * @return {ClipLauncherScenesOrSlots} an object that provides access to the clip launcher scenes of the track bank.
     * @since Bitwig Studio 1.0
     */
    getClipLauncherScenes(): ClipLauncherScenesOrSlots;

    /**
     * Launches the scene with the given bank index.
     *
     * @param {int} indexInWindow the scene index within the bank, not the position of the scene withing the underlying full
                         list of scenes.
     * @since Bitwig Studio 1.0
     */
    launchScene(indexInWindow?: number): void;

}


export default TrackBank;
