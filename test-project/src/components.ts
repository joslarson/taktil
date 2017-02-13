import { session, AbstractButton, AbstractView } from 'typewig';
import * as components from 'typewig/contrib/components'
import apiStore from './apistore';
import { BaseView, OtherView, OtherView2, OtherView3 } from './views';


export class ShiftModeGate extends components.AbstractModeGate {
    mode = 'SHIFT';
}

export class PlayToggle extends components.AbstractPlayToggle {
    transport = apiStore.transport;
}

export class MetronomeToggle extends components.AbstractMetronomeToggle {
    state = { ...this.state, color: { r: 0.3, g: 0, b: 1} };
    transport = apiStore.transport;
}

export class PreRollToggle extends components.AbstractPreRollToggle {
    state = { ...this.state, color: { r: 0.3, g: 0, b: 1} };
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

export class BaseViewButton extends components.AbstractViewButton {
    View = BaseView;
}

export class OtherViewButton extends components.AbstractViewButton {
    View = OtherView;
}

export class OtherView2Button extends components.AbstractViewButton {
    View = OtherView2;
}

export class OtherView3Button extends components.AbstractViewButton {
    View = OtherView3;
}