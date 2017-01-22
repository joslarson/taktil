import { session, AbstractManualButton, AbstractView } from 'typewig';
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


export abstract class AbstractViewButton extends AbstractManualButton {
    abstract View: typeof AbstractView;

    onRegister() {
        session.on('setActiveView', (View: typeof AbstractView) => {
            this.setState(View === this.View);
        });
    }
    onPress() {
        session.setActiveView(this.View);
    }
}


export class BaseViewButton extends AbstractViewButton {
    View = BaseView;
}

export class OtherViewButton extends AbstractViewButton {
    View = OtherView;
}

export class OtherView2Button extends AbstractViewButton {
    View = OtherView2;
}

export class OtherView3Button extends AbstractViewButton {
    View = OtherView3;
}