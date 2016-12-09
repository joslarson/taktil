import { document} from 'typewig';
import * as components from 'typewig/contrib/components'
import store from './store';


export class ShiftModeGate extends components.ModeGate {
    mode = 'SHIFT';
}

export class PlayToggle extends components.PlayToggle {
    transport = store.transport;
}

export class MetronomeToggle extends components.MetronomeToggle {
    transport = store.transport;
}

export class PreRollToggle extends components.PreRollToggle {
    transport = store.transport;
}

export class RestartButton extends components.RestartButton {
    transport = store.transport;
}

export class OverwriteToggle extends components.OverwriteToggle {
    transport = store.transport;
}

export class LoopToggle extends components.LoopToggle {
    transport = store.transport;
}
