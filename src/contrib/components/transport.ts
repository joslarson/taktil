import { AbstractGateButton, AbstractToggleButton } from '../../core/component';
import session from '../../session';


export abstract class AbstractPlayToggle extends AbstractToggleButton {
    abstract transport: API.Transport;

    onRegister() {
        this.transport.isPlaying().addValueObserver(
            isPlaying => this.setState({ ...this.state, on: isPlaying })
        );
    }

    onToggleOn() {
        this.transport.play();
    }

    onToggleOff() {
        this.transport.stop();
    }
}


export abstract class AbstractMetronomeToggle extends AbstractToggleButton {
    abstract transport: API.Transport;

    onRegister() {
        this.transport.isMetronomeEnabled().addValueObserver((isOn) => {
            this.setState({ ...this.state, on: isOn });
        });
    }

    onToggleOn() {
        this.transport.isMetronomeEnabled().set(true);
    }

    onToggleOff() {
        this.transport.isMetronomeEnabled().set(false);
    }
}


export abstract class AbstractPreRollToggle extends AbstractToggleButton {
    abstract transport: API.Transport;

    onRegister() {
        this.transport.addPreRollObserver((preRollState) => {
            this.setState({ ...this.state, on: preRollState !== 'none' });
        });
    }

    onToggleOn() {
        this.transport.setPreRoll('one_bar');
    }

    onToggleOff() {
        this.transport.setPreRoll('none');
    }
}


export abstract class AbstractRestartButton extends AbstractGateButton {
    abstract transport: API.Transport;

    onPress() {
        this.transport.restart();
    }
}


export abstract class AbstractOverwriteToggle extends AbstractToggleButton {
    abstract transport: API.Transport;

    onRegister() {
        this.transport.isClipLauncherOverdubEnabled().addValueObserver(
            isActive => this.setState({ ...this.state, on: isActive })
        );
    }

    onToggleOn() {
        this.transport.isClipLauncherOverdubEnabled().set(false);
    }

    onToggleOff() {
        this.transport.isClipLauncherOverdubEnabled().set(true);
    }
}


export abstract class AbstractLoopToggle extends AbstractToggleButton {
    abstract transport: API.Transport;

    onRegister() {
        this.transport.isArrangerLoopEnabled().addValueObserver(
            isActive => this.setState({ ...this.state, on: isActive })
        );
    }

    onToggleOn() {
        this.transport.isArrangerLoopEnabled().set(true);
    }

    onToggleOff() {
        this.transport.isArrangerLoopEnabled().set(false);
    }
}