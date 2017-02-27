import { AbstractView } from 'typewig';
import controls from './controls';
import * as components from './components';


export class BaseView extends AbstractView {
    onRegister() {
        // Top Left
        this.registerComponent(components.ArrangeLayoutButton, controls.ARRANGE);
        this.registerComponent(components.MixLayoutButton, controls.MIX);
        this.registerComponent(components.ToggleBrowser, controls.BROWSE);
        this.registerComponent(components.EditLayoutButton, controls.SAMPLING);

        // Groups
        this.registerComponent(components.TrackButtonBank, [
            controls.GROUP_A, controls.GROUP_B, controls.GROUP_C, controls.GROUP_D,
            controls.GROUP_E, controls.GROUP_F, controls.GROUP_G, controls.GROUP_H,
        ]);

        // Transport
        this.registerComponent(components.RestartButton, controls.RESTART);
        this.registerComponent(components.LoopToggle, controls.RESTART, 'SHIFT');
        this.registerComponent(components.MetronomeToggle, controls.METRO);
        this.registerComponent(components.ShiftModeGate, controls.GRID);
        this.registerComponent(components.PlayToggle, controls.PLAY);
        this.registerComponent(components.ArmToggle, controls.REC);
        this.registerComponent(components.PreRollToggle, controls.REC, 'SHIFT');

        // Pads
        this.registerComponent(components.SceneViewButton, controls.SCENE);
        this.registerComponent(components.PatternViewButton, controls.PATTERN);
        this.registerComponent(components.PadMidiViewButton, controls.PAD_MODE);
        this.registerComponent(components.NavigateViewButton, controls.NAVIGATE);
        this.registerComponent(components.DuplicateModeGate, controls.DUPLICATE);
        this.registerComponent(components.SelectModeGate, controls.SELECT);
        this.registerComponent(components.SoloModeGate, controls.SOLO);
        this.registerComponent(components.MuteModeGate, controls.MUTE);

        // Edit
        this.registerComponent(components.UndoButton, controls.UNDO);
        this.registerComponent(components.RedoButton, controls.REDO);
        this.registerComponent(components.CopyButton, controls.COPY);
        this.registerComponent(components.PasteButton, controls.PASTE);
        this.registerComponent(components.DeleteButton, controls.CLEAR);
        this.registerComponent(components.ToggleBrowser, controls.JOG_RING);
        this.registerComponent(components.BrowserExitButton, controls.BACK);
    }
}

export class SceneView extends AbstractView {
    parent = BaseView;

    onRegister() {
        this.registerComponent(components.SceneButtonBank, [
            controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
            controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
            controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
            controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
        ]);
    }
}

export class PatternView extends AbstractView {
    parent = BaseView;

    onRegister() {
        this.registerComponent(components.ClipSlotButtonBank, [
            controls.PAD_1,  controls.PAD_2,  controls.PAD_3,  controls.PAD_4,
            controls.PAD_5,  controls.PAD_6,  controls.PAD_7,  controls.PAD_8,
            controls.PAD_9,  controls.PAD_10, controls.PAD_11, controls.PAD_12,
            controls.PAD_13, controls.PAD_14, controls.PAD_15, controls.PAD_16,
        ]);
    }
}

export class PadMidiView extends AbstractView {
    parent = BaseView;

    onRegister() {
        // ...
    }
}

export class NavigateView extends AbstractView {
    parent = BaseView;

    onRegister() {
        // ...
    }
}