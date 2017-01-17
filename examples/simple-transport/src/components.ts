import { session} from 'typewig';
import * as components from 'typewig/contrib/components'
import store from './store';


export class ShiftModeGate extends components.AbstractModeGate {
    mode = 'SHIFT';
}

export class PlayToggle extends components.AbstractPlayToggle {
    transport = store.transport;
}

export class MetronomeToggle extends components.AbstractMetronomeToggle {
    transport = store.transport;
}

export class PreRollToggle extends components.AbstractPreRollToggle {
    transport = store.transport;
}

export class RestartButton extends components.AbstractRestartButton {
    transport = store.transport;
}

export class OverwriteToggle extends components.AbstractOverwriteToggle {
    transport = store.transport;
}

export class LoopToggle extends components.AbstractLoopToggle {
    transport = store.transport;
}
