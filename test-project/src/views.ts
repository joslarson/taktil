import { AbstractView } from 'typewig';
import controls from './controls';
import * as components from './components';


export class BaseView extends AbstractView {
    onRegister() {
        this.registerComponent(components.PlayToggle, controls.PLAY);
        this.registerComponent(components.PlayToggle, controls.GROUP_A);
        this.registerComponent(components.PlayToggle, controls.GROUP_B);
        this.registerComponent(components.PlayToggle, controls.GROUP_C);
        this.registerComponent(components.PlayToggle, controls.GROUP_D);
        this.registerComponent(components.PlayToggle, controls.GROUP_E);
        this.registerComponent(components.PlayToggle, controls.GROUP_F);
        this.registerComponent(components.PlayToggle, controls.GROUP_G);
        this.registerComponent(components.MetronomeToggle, controls.GROUP_H);

        this.registerComponent(components.PlayToggle, controls.PAD_1, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_2, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_3, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_4, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_5, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_6, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_7, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_8, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_9, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_10, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_11, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_12, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_13, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_14, 'SHIFT');
        this.registerComponent(components.PlayToggle, controls.PAD_15, 'SHIFT');
        this.registerComponent(components.MetronomeToggle, controls.PAD_16);


        this.registerComponent(components.MetronomeToggle, controls.PLAY, 'SHIFT');
        this.registerComponent(components.PreRollToggle, controls.REC, 'SHIFT');
        // this.registerComponent(components.RestartButton, midiControls.RESTART);
        this.registerComponent(components.OverwriteToggle, controls.REC);
        this.registerComponent(components.ShiftModeGate, controls.GRID);
        this.registerComponent(components.LoopToggle, controls.RESTART, 'SHIFT');
        // View Buttons
        this.registerComponent(components.BaseViewButton, controls.SCENE);
        this.registerComponent(components.OtherViewButton, controls.PATTERN);
        this.registerComponent(components.OtherView2Button, controls.PAD_MODE);
        this.registerComponent(components.OtherView3Button, controls.NAVIGATE);
    }
}

export class OtherView extends AbstractView {
    parent = BaseView;
    onRegister() {
        this.registerComponent(components.LoopToggle, controls.RESTART);
    }
}

export class OtherView2 extends AbstractView {
    parent = OtherView;
    onRegister() {
        this.registerComponent(components.LoopToggle, controls.RESTART);
        this.registerComponent(components.MetronomeToggle, controls.PLAY);
    }
}

export class OtherView3 extends AbstractView {
    parent = OtherView2;
    onRegister() {
        this.registerComponent(components.LoopToggle, controls.RESTART);
        this.registerComponent(components.MetronomeToggle, controls.PLAY);
        this.registerComponent(components.PreRollToggle, controls.REC);
    }
}