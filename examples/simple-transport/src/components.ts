import { session} from 'taktil';
import * as components from 'taktil/contrib/components'
import apiStore from './apistore';


export class ShiftModeGate extends components.AbstractModeGate {
    mode = 'SHIFT';
}

export class PlayToggle extends components.AbstractPlayToggle {
    transport = apiStore.transport;
}

export class MetronomeToggle extends components.AbstractMetronomeToggle {
    transport = apiStore.transport;
}

export class PreRollToggle extends components.AbstractPreRollToggle {
    transport = apiStore.transport;
}

export class RestartButton extends components.AbstractRestartButton {
    transport = apiStore.transport;
}

export class OverwriteToggle extends components.AbstractOverwriteToggle {
    transport = apiStore.transport;
}

export class LoopToggle extends components.AbstractLoopToggle {
    transport = apiStore.transport;
}
