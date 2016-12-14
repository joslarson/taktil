import { GateButton, ToggleButton } from '../core/component/button';
import session from '../session';
import * as api from 'bitwig-api-proxy';


export abstract class ModeGate extends GateButton {
    abstract mode: string;

    onPress() {
        session.activateMode(this.mode);
    }

    onRelease() {
        session.deactivateMode(this.mode);
    }
}


export abstract class PlayToggle extends ToggleButton {
    abstract transport: api.Transport;

    onRegister() {
        this.transport.addIsPlayingObserver(
            isPlaying => this.setState(isPlaying)
        );
    }

    onToggleOn() {
        this.transport.play();
    }

    onToggleOff() {
        this.transport.stop();
    }
}


export abstract class MetronomeToggle extends ToggleButton {
    abstract transport: api.Transport;

    onRegister() {
        this.transport.addClickObserver((isOn) => {
            this.setState(isOn);
        });
    }

    onToggleOn() {
        this.transport.setClick(true);
    }

    onToggleOff() {
        this.transport.setClick(false);
    }
}


export abstract class PreRollToggle extends ToggleButton {
    abstract transport: api.Transport;

    onRegister() {
        this.transport.addPreRollObserver((state) => {
            this.setState(state != 'none');
        });
    }

    onToggleOn() {
        this.transport.setPreRoll('one_bar');
    }

    onToggleOff() {
        this.transport.setPreRoll('none');
    }
}


export abstract class RestartButton extends GateButton {
    abstract transport: api.Transport;

    onPress() {
        this.transport.restart();
    }
}


export abstract class OverwriteToggle extends ToggleButton {
    abstract transport: api.Transport;

    onRegister() {
        this.transport.addOverdubObserver(
            isActive => this.setState(isActive)
        );
    }

    onToggleOn() {
        this.transport.setOverdub(false);
    }

    onToggleOff() {
        this.transport.setOverdub(true);
    }
}


export abstract class LoopToggle extends ToggleButton {
    abstract transport: api.Transport;

    onRegister() {
        this.transport.addIsLoopActiveObserver(
            isActive => this.setState(isActive)
        );
    }

    onToggleOn() {
        this.transport.setLoop(true);
    }

    onToggleOff() {
        this.transport.setLoop(false);
    }
}