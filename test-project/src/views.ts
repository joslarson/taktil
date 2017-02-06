import { AbstractView } from 'typewig';
import midiControls from './midicontrols';
import * as components from './components';


export class BaseView extends AbstractView {
    // parent = ParentView
    onRegister() {
        this.registerComponent(components.PlayToggle, midiControls.PLAY);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_A);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_B);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_C);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_D);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_E);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_F);
        this.registerComponent(components.PlayToggle, midiControls.GROUP_G);
        // this.registerComponent(components.PlayToggle, midiControls.GROUP_H);

        this.registerComponent(components.PlayToggle, midiControls.PAD_1);
        this.registerComponent(components.PlayToggle, midiControls.PAD_2);
        this.registerComponent(components.PlayToggle, midiControls.PAD_3);
        this.registerComponent(components.PlayToggle, midiControls.PAD_4);
        this.registerComponent(components.PlayToggle, midiControls.PAD_5);
        this.registerComponent(components.PlayToggle, midiControls.PAD_6);
        this.registerComponent(components.PlayToggle, midiControls.PAD_7);
        this.registerComponent(components.PlayToggle, midiControls.PAD_8);
        this.registerComponent(components.PlayToggle, midiControls.PAD_9);
        this.registerComponent(components.PlayToggle, midiControls.PAD_10);
        this.registerComponent(components.PlayToggle, midiControls.PAD_11);
        this.registerComponent(components.PlayToggle, midiControls.PAD_12);
        this.registerComponent(components.PlayToggle, midiControls.PAD_13);
        this.registerComponent(components.PlayToggle, midiControls.PAD_14);
        this.registerComponent(components.PlayToggle, midiControls.PAD_15);
        // this.registerComponent(components.PlayToggle, midiControls.PAD_16);
        this.registerComponent(components.MetronomeToggle, midiControls.PLAY, 'SHIFT');
        this.registerComponent(components.PreRollToggle, midiControls.REC, 'SHIFT');
        // this.registerComponent(components.RestartButton, midiControls.RESTART);
        this.registerComponent(components.OverwriteToggle, midiControls.REC);
        this.registerComponent(components.ShiftModeGate, midiControls.GRID);
        this.registerComponent(components.LoopToggle, midiControls.RESTART, 'SHIFT');
        // View Buttons
        this.registerComponent(components.BaseViewButton, midiControls.SCENE);
        this.registerComponent(components.OtherViewButton, midiControls.PATTERN);
        this.registerComponent(components.OtherView2Button, midiControls.PAD_MODE);
        this.registerComponent(components.OtherView3Button, midiControls.NAVIGATE);
    }
}

export class OtherView extends AbstractView {
    parent = BaseView;
    onRegister() {
        this.registerComponent(components.LoopToggle, midiControls.RESTART);
    }
}

export class OtherView2 extends AbstractView {
    parent = OtherView;
    onRegister() {
        this.registerComponent(components.LoopToggle, midiControls.RESTART);
        this.registerComponent(components.MetronomeToggle, midiControls.PLAY);
    }
}

export class OtherView3 extends AbstractView {
    parent = OtherView2;
    onRegister() {
        this.registerComponent(components.LoopToggle, midiControls.RESTART);
        this.registerComponent(components.MetronomeToggle, midiControls.PLAY);
        this.registerComponent(components.PreRollToggle, midiControls.REC);
    }
}