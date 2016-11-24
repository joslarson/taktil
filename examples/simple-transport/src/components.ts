import { document} from 'typewig';
import GateButton from 'typewig/core/component/button/GateButton';
import ToggleButton from 'typewig/core/component/button/ToggleButton';

import store from 'store';


export class ModeGate extends GateButton {
    mode: string;

    onPress() {
        document.activateMode(this.mode);
    }

    onRelease() {
        document.deactivateMode(this.mode);
    }
}

export class ShiftModeGate extends ModeGate {
    mode = 'SHIFT';
}


export class PlayToggle extends ToggleButton {
    onRegister() {
        store.transport.addIsPlayingObserver((isPlaying) => {
            this.setState(isPlaying);
        });
    }

    onToggleOn() {
        store.transport.play();
    }

    onToggleOff() {
        store.transport.stop();
    }
}


export class MetronomeToggle extends ToggleButton {
    onRegister() {
        store.transport.addClickObserver((isOn) => {
            this.setState(isOn);
        });
    }

    onToggleOn() {
        store.transport.setClick(true);
    }

    onToggleOff() {
        store.transport.setClick(false);
    }
}


export class PreRollToggle extends ToggleButton {
    onRegister() {
        store.transport.addPreRollObserver((state) => {
            this.setState(state != 'none');
        });
    }

    onToggleOn() {
        store.transport.setPreRoll('one_bar');
    }

    onToggleOff() {
        store.transport.setPreRoll('none');
    }
}


export class RestartButton extends GateButton {
    onPress() {
        store.transport.restart();
    }
}


export class OverwriteToggle extends ToggleButton {
    onRegister() {
        store.transport.addOverdubObserver((isActive) => {
            this.setState(isActive);
        });
    }

    onToggleOn() {
        store.transport.setOverdub(false);
    }

    onToggleOff() {
        store.transport.setOverdub(true);
    }
}


export class LoopToggle extends ToggleButton {
    onRegister() {
        store.transport.addIsLoopActiveObserver(isActive => this.setState(isActive));
    }

    onToggleOn() {
        store.transport.setLoop(true);
    }

    onToggleOff() {
        store.transport.setLoop(false);
    }
}