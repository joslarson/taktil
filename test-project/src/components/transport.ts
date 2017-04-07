import { session, AbstractButton } from 'taktil';
import * as components from 'taktil/contrib/components';

import store from 'store';


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

export class ArmToggle extends AbstractButton {
    track = store.cursorTrack;

    onInit() {
        this.track.getArm().addValueObserver(isArmed => {
            this.setState({ ...this.state, on: isArmed });
        });
    }

    onPress() {
        this.track.getArm().set(!this.track.getArm().get());
    }
}

export class LoopToggle extends components.AbstractLoopToggle {
    transport = store.transport;
}

export class TempoButton extends AbstractButton {
    transport = store.transport;

    onPress() {
        this.setState({ ...this.state, on: true });
        this.transport.tapTempo();
        session.activateMode('TEMPO');
    }

    onRelease() {
        session.deactivateMode('TEMPO');
        this.setState({ ...this.state, on: false });
    }
}

export class TempoRing extends AbstractButton {
    transport = store.transport;

    onInit() {
        session.on('activateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: true });
        });
        session.on('deactivateMode', mode => {
            if (mode === 'TEMPO') this.setState({ ...this.state, on: false });
        });
    }
}