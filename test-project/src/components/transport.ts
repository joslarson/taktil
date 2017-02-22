import { AbstractButton } from 'typewig';
import * as components from 'typewig/contrib/components';

import bitwig from 'apistore';


export class PlayToggle extends components.AbstractPlayToggle {
    transport = bitwig.transport;
}

export class MetronomeToggle extends components.AbstractMetronomeToggle {
    state = { ...this.state, color: { r: 0.3, g: 0, b: 1 } };
    transport = bitwig.transport;
}

export class PreRollToggle extends components.AbstractPreRollToggle {
    state = { ...this.state, color: { r: 0.3, g: 0, b: 1 } };
    transport = bitwig.transport;
}

export class RestartButton extends components.AbstractRestartButton {
    transport = bitwig.transport;
}

export class OverwriteToggle extends components.AbstractOverwriteToggle {
    transport = bitwig.transport;
}

export abstract class ArmToggle extends AbstractButton {
    abstract track = bitwig.cursorTrack;

    onRegister() {
        this.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.track.getArm().set(!this.track.getArm().get());
    }
}

export class LoopToggle extends components.AbstractLoopToggle {
    transport = bitwig.transport;
}
