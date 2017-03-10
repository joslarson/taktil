import * as components from 'taktil/contrib/components';

import { SceneView, PatternView, PadMidiView, NavigateView } from 'views';


export class SceneViewButton extends components.AbstractViewButton {
    View = SceneView;

    setState(state) {
        super.setState(state);
    }

    updateControlState(control) {
        super.updateControlState(control);
    }
}

export class PatternViewButton extends components.AbstractViewButton {
    View = PatternView;
}

export class PadMidiViewButton extends components.AbstractViewButton {
    View = PadMidiView;
}

export class NavigateViewButton extends components.AbstractViewButton {
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