import { AbstractView } from 'taktil';
import controls from './controls';
import * as components from './components';


export class BaseView extends AbstractView {
    // Top Left
    arrangeLayoutButton = { component: components.ArrangeLayoutButton, controls: [controls.ARRANGE] };
    mixLayoutButton = { component: components.MixLayoutButton, controls: [controls.MIX] };
    toggleBrowser = { component: components.ToggleBrowser, controls: [controls.BROWSE] };
    editLayoutButton = { component: components.EditLayoutButton, controls: [controls.SAMPLING] };

    // Performance
    tempoButton = { component: components.TempoButton, controls: [controls.TAP] };

    // Groups
    trackButtonBank = { component: components.TrackButtonBank, controls: [
        controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
        controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
    ] };

    // Transport
    restartButton = { component: components.RestartButton, controls: [controls.RESTART] };
    loopToggle = { component: components.LoopToggle, controls: [controls.RESTART], mode: 'SHIFT' };
    metronomeToggle = { component: components.MetronomeToggle, controls: [controls.METRO] };
    shiftModeGate = { component: components.ShiftModeGate, controls: [controls.GRID] };
    playToggle = { component: components.PlayToggle, controls: [controls.PLAY] };
    armToggle = { component: components.ArmToggle, controls: [controls.REC] };
    preRollToggle = { component: components.PreRollToggle, controls: [controls.REC], mode: 'SHIFT' };

    // Pads
    sceneViewButton = { component: components.SceneViewButton, controls: [controls.SCENE] };
    patternViewButton = { component: components.PatternViewButton, controls: [controls.PATTERN] };
    padMidiViewButton = { component: components.PadMidiViewButton, controls: [controls.PAD_MODE] };
    navigateViewButton = { component: components.NavigateViewButton, controls: [controls.NAVIGATE] };
    duplicateModeGate = { component: components.DuplicateModeGate, controls: [controls.DUPLICATE] };
    selectModeGate = { component: components.SelectModeGate, controls: [controls.SELECT] };
    soloModeGate = { component: components.SoloModeGate, controls: [controls.SOLO] };
    muteModeGate = { component: components.MuteModeGate, controls: [controls.MUTE] };

    // Edit
    undoButton = { component: components.UndoButton, controls: [controls.UNDO] };
    redoButton = { component: components.RedoButton, controls: [controls.REDO] };
    copyButton = { component: components.CopyButton, controls: [controls.COPY] };
    pasteButton = { component: components.PasteButton, controls: [controls.PASTE] };
    deleteButton = { component: components.DeleteButton, controls: [controls.CLEAR] };
    toggleBrowserRing = { component: components.ToggleBrowser, controls: [controls.JOG_RING] };
    tempoRing = { component: components.TempoRing, controls: [controls.JOG_RING], mode: 'TEMPO' };
    browserExitButton = { component: components.BrowserExitButton, controls: [controls.BACK] };
}

export class SceneView extends AbstractView {
    static parent = BaseView;

    sceneButtonBank = { component: components.SceneButtonBank, controls: [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ] };
}

export class PatternView extends AbstractView {
    static parent = BaseView;

    clipSlotButtonBank = { component: components.ClipSlotButtonBank, controls: [
        controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
        controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
        controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
        controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
    ] };
}

export class PadMidiView extends AbstractView {
    static parent = BaseView;
}

export class NavigateView extends AbstractView {
    static parent = BaseView;
}