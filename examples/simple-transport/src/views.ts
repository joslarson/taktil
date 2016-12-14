import { AbstractView } from 'typewig';
import { controls } from './controller';
import * as components from './components';


export class BaseView extends AbstractView {
    // parent = BaseView;

    onRegister() {
        this.registerComponent(components.PlayToggle, controls.PLAY);
        this.registerComponent(components.MetronomeToggle, controls.PLAY, 'SHIFT');
        this.registerComponent(components.PreRollToggle, controls.REC, 'SHIFT');
        this.registerComponent(components.RestartButton, controls.RESTART);
        this.registerComponent(components.OverwriteToggle, controls.REC);
        this.registerComponent(components.ShiftModeGate, controls.SHIFT);
        this.registerComponent(components.LoopToggle, controls.RESTART, 'SHIFT');
    }
}
