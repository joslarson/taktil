import { AbstractView, AbstractComponent } from 'taktil';
import { ModeGate, ViewToggle } from 'taktil/contrib/components';
import controls from './controls';
import * as components from './components';
import store from './store';

export class BaseView extends AbstractView {
    // Top Left
    arrangeLayoutButton = new components.LayoutButton(controls.ARRANGE, { layout: 'ARRANGE'});
    mixLayoutButton = new components.LayoutButton(controls.MIX, { layout: 'MIX'});
    editLayoutButton = new components.LayoutButton(controls.SAMPLING, { layout: 'EDIT'});
    toggleBrowserButton = new components.BrowserToggle(controls.BROWSE);

    // Performance
    tempoButton = new components.TempoButton(controls.TAP);

    // Groups
    trackButtons = [
        controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
        controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
    ].map((control, index) => new components.TrackButton(control, { index }));

    trackNavButtons = [
        controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
        controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
    ].map((control, index) => new components.TrackBankNavigationButton(control, 'SHIFT', { index }));

    volumeKnobs = [
        controls.VOL_A, controls.VOL_B, controls.VOL_C, controls.VOL_D,
        controls.VOL_E, controls.VOL_F, controls.VOL_G, controls.VOL_H,
    ].map((control, index) => new components.VolumeRange(control, { track: store.trackBank.getChannel(index) as API.Track }));

    volumeKnobsTouch = [
        controls.VOL_TOUCH_A, controls.VOL_TOUCH_B, controls.VOL_TOUCH_C, controls.VOL_TOUCH_D,
        controls.VOL_TOUCH_E, controls.VOL_TOUCH_F, controls.VOL_TOUCH_G, controls.VOL_TOUCH_H,
    ].map((control, index) => new components.VolumeKnobTouch(control, { index }));

    masterVolume = new components.VolumeRange(controls.KNOB, { track: store.masterTrack });

    // Transport
    restartButton = new components.RestartButton(controls.RESTART);
    loopToggle = new components.LoopToggle(controls.RESTART, 'SHIFT');
    metronomeToggle = new components.MetronomeToggle(controls.METRO);
    shiftModeGate = new ModeGate(controls.GRID, { mode: 'SHIFT' });
    playToggle = new components.PlayToggle(controls.PLAY);
    armToggle = new components.ArmToggle(controls.REC);
    preRollToggle = new components.PreRollToggle(controls.REC, 'SHIFT');

    // Pads
    sceneViewButton = new ViewToggle(controls.SCENE, { view: SceneView });
    patternViewButton = new ViewToggle(controls.PATTERN, { view: PatternView });
    padMidiViewButton = new ViewToggle(controls.PAD_MODE, { view: PadMidiView });
    navigateViewButton = new ViewToggle(controls.NAVIGATE, { view: NavigateView });
    duplicateModeGate = new ModeGate(controls.DUPLICATE, { mode: 'DUPLICATE' });
    selectModeGate = new ModeGate(controls.SELECT, { mode: 'SELECT' });
    soloModeGate = new ModeGate(controls.SOLO, { mode: 'SOLO' });
    muteModeGate = new ModeGate(controls.MUTE, { mode: 'MUTE' });

    // Edit
    undoButton = new components.ActionButton(controls.UNDO, { action: 'undo' });
    redoButton = new components.ActionButton(controls.REDO, { action: 'redo' });
    copyButton = new components.ActionButton(controls.COPY, { action: 'copy' });
    pasteButton = new components.ActionButton(controls.PASTE, { action: 'paste' });
    deleteButton = new components.ActionButton(controls.CLEAR, { action: 'delete' });
    toggleBrowserRing = new components.BrowserToggle(controls.JOG_RING);
    tempoRing = new components.TempoRing(controls.JOG_RING, 'TEMPO');
    browserExitButton = new components.BrowserExitButton(controls.BACK);
}

export class SceneView extends AbstractView {
    static parent = BaseView;
    sceneButtons = [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ].map((control, index) => new components.SceneButton(control, { index }));
}

export class PatternView extends AbstractView {
    static parent = BaseView;

    clipSlotButtons = [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ].map((control, index) => new components.ClipSlotButton(control, { index }));
}

export class PadMidiView extends AbstractView {
    static parent = BaseView;
}

export class NavigateView extends AbstractView {
    static parent = BaseView;
}
