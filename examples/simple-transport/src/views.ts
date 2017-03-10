import { AbstractView } from 'taktil';
import midiControls from './midicontrols';
import * as components from './components';


export class BaseView extends AbstractView {
    // parent = ParentView
    onRegister() {
        this.registerComponent(components.PlayToggle, midiControls.PLAY);
        this.registerComponent(components.MetronomeToggle, midiControls.PLAY, 'SHIFT');
        this.registerComponent(components.PreRollToggle, midiControls.REC, 'SHIFT');
        this.registerComponent(components.RestartButton, midiControls.RESTART);
        this.registerComponent(components.OverwriteToggle, midiControls.REC);
        this.registerComponent(components.ShiftModeGate, midiControls.SHIFT);
        this.registerComponent(components.LoopToggle, midiControls.RESTART, 'SHIFT');
    }
}
