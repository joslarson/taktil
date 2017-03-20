import { AbstractView, AbstractComponent } from 'taktil';
import { ModeGate, ViewToggle } from 'taktil/contrib/components';
import controls from './controls';
import * as components from './components';
import store from './store';

export class BaseView extends AbstractView {
    // Top Left
    arrangeLayoutButton = new components.ArrangeLayoutButton(controls.ARRANGE);
    mixLayoutButton = new components.MixLayoutButton(controls.MIX);
    toggleBrowserButton = new components.ToggleBrowser(controls.BROWSE);
    editLayoutButton = new components.EditLayoutButton(controls.SAMPLING);

    // Performance
    tempoButton = new components.TempoButton(controls.TAP);

    // Groups
    trackAButton = new components.TrackButton(controls.GROUP_A, { index: 0 });
    trackBButton = new components.TrackButton(controls.GROUP_B, { index: 1 });
    trackCButton = new components.TrackButton(controls.GROUP_C, { index: 2 });
    trackDButton = new components.TrackButton(controls.GROUP_D, { index: 3 });
    trackEButton = new components.TrackButton(controls.GROUP_E, { index: 4 });
    trackFButton = new components.TrackButton(controls.GROUP_F, { index: 5 });
    trackGButton = new components.TrackButton(controls.GROUP_G, { index: 6 });
    trackHButton = new components.TrackButton(controls.GROUP_H, { index: 7 });

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
    undoButton = new components.UndoButton(controls.UNDO);
    redoButton = new components.RedoButton(controls.REDO);
    copyButton = new components.CopyButton(controls.COPY);
    pasteButton = new components.PasteButton(controls.PASTE);
    deleteButton = new components.DeleteButton(controls.CLEAR);
    toggleBrowserRing = new components.ToggleBrowser(controls.JOG_RING);
    tempoRing = new components.TempoRing(controls.JOG_RING, 'TEMPO');
    browserExitButton = new components.BrowserExitButton(controls.BACK);
}

export class SceneView extends AbstractView {
    static parent = BaseView;

    sceneButton1 = new components.SceneButton(controls.PAD_1, { index: 0 });
    sceneButton2 = new components.SceneButton(controls.PAD_2, { index: 1 });
    sceneButton3 = new components.SceneButton(controls.PAD_3, { index: 2 });
    sceneButton4 = new components.SceneButton(controls.PAD_4, { index: 3 });
    sceneButton5 = new components.SceneButton(controls.PAD_5, { index: 4 });
    sceneButton6 = new components.SceneButton(controls.PAD_6, { index: 5 });
    sceneButton7 = new components.SceneButton(controls.PAD_7, { index: 6 });
    sceneButton8 = new components.SceneButton(controls.PAD_8, { index: 7 });
    sceneButton9 = new components.SceneButton(controls.PAD_9, { index: 8 });
    sceneButton10 = new components.SceneButton(controls.PAD_10, { index: 9 });
    sceneButton11 = new components.SceneButton(controls.PAD_11, { index: 10 });
    sceneButton12 = new components.SceneButton(controls.PAD_12, { index: 11 });
    sceneButton13 = new components.SceneButton(controls.PAD_13, { index: 12 });
    sceneButton14 = new components.SceneButton(controls.PAD_14, { index: 13 });
    sceneButton15 = new components.SceneButton(controls.PAD_15, { index: 14 });
    sceneButton16 = new components.SceneButton(controls.PAD_16, { index: 15 });
}

export class PatternView extends AbstractView {
    static parent = BaseView;

    clipSlotButton0 = new components.ClipSlotButton(controls.PAD_1, { index: 0 });
    clipSlotButton1 = new components.ClipSlotButton(controls.PAD_2, { index: 1 });
    clipSlotButton2 = new components.ClipSlotButton(controls.PAD_3, { index: 2 });
    clipSlotButton3 = new components.ClipSlotButton(controls.PAD_4, { index: 3 });
    clipSlotButton4 = new components.ClipSlotButton(controls.PAD_5, { index: 4 });
    clipSlotButton5 = new components.ClipSlotButton(controls.PAD_6, { index: 5 });
    clipSlotButton6 = new components.ClipSlotButton(controls.PAD_7, { index: 6 });
    clipSlotButton7 = new components.ClipSlotButton(controls.PAD_8, { index: 7 });
    clipSlotButton8 = new components.ClipSlotButton(controls.PAD_9, { index: 8 });
    clipSlotButton9 = new components.ClipSlotButton(controls.PAD_10, { index: 9 });
    clipSlotButton10 = new components.ClipSlotButton(controls.PAD_11, { index: 10 });
    clipSlotButton11 = new components.ClipSlotButton(controls.PAD_12, { index: 11 });
    clipSlotButton12 = new components.ClipSlotButton(controls.PAD_13, { index: 12 });
    clipSlotButton13 = new components.ClipSlotButton(controls.PAD_14, { index: 13 });
    clipSlotButton14 = new components.ClipSlotButton(controls.PAD_15, { index: 14 });
    clipSlotButton15 = new components.ClipSlotButton(controls.PAD_16, { index: 15 });
}

export class PadMidiView extends AbstractView {
    static parent = BaseView;
}

export class NavigateView extends AbstractView {
    static parent = BaseView;
}
