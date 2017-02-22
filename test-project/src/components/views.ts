import * as components from 'typewig/contrib/components';

import { BaseView, PatternView, PadMidiView, NavigateView } from 'views';


export class BaseViewButton extends components.AbstractViewButton {
    View = BaseView;
}

export class OtherViewButton extends components.AbstractViewButton {
    View = PatternView;
}

export class OtherView2Button extends components.AbstractViewButton {
    View = PadMidiView;
}

export class OtherView3Button extends components.AbstractViewButton {
    View = NavigateView;
}

export class ShiftModeGate extends components.AbstractModeGate {
    mode = 'SHIFT';
}

export class DuplicateModeGate extends components.AbstractModeGate {
    mode = 'DUPLICATE';
}

export class SelectModeGate extends components.AbstractModeGate {
    mode = 'SELECT';
}

export class SoloModeGate extends components.AbstractModeGate {
    mode = 'SOLO';
}

export class MuteModeGate extends components.AbstractModeGate {
    mode = 'MUTE';
}