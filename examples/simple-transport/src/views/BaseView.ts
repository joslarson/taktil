import { document, View } from 'typewig';
import { controls } from '../controllers/TransportController';

import * as components from '../components';


export default class BaseView extends View {
    constructor() {
        super();
        this.registerComponent(components.PlayToggle, controls.PLAY);
        this.registerComponent(components.MetronomeToggle, controls.PLAY, 'SHIFT');
        this.registerComponent(components.PreRollToggle, controls.REC, 'SHIFT');
        this.registerComponent(components.RestartButton, controls.RESTART);
        this.registerComponent(components.OverwriteToggle, controls.REC);
        this.registerComponent(components.ShiftModeGate, controls.SHIFT);
        this.registerComponent(components.LoopToggle, controls.RESTART, 'SHIFT');
    }
}
