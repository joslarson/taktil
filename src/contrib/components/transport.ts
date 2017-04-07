import { AbstractButton } from '../../core/component';
import session from '../../session';


export abstract class AbstractPlayToggle extends AbstractButton {
    abstract transport: API.Transport;

    onInit() {
        this.transport.isPlaying().addValueObserver(
            isPlaying => this.setState({ on: isPlaying })
        );
    }

    onPress() {
        this.state.on ? this.transport.stop() : this.transport.play();
    }
}


export abstract class AbstractMetronomeToggle extends AbstractButton {
    abstract transport: API.Transport;

    onInit() {
        this.transport.isMetronomeEnabled().addValueObserver((isOn) => {
            this.setState({ on: isOn });
        });
    }

    onPress() {
        this.transport.isMetronomeEnabled().set(!this.state.on);
    }
}


export abstract class AbstractPreRollToggle extends AbstractButton {
    abstract transport: API.Transport;

    onInit() {
        this.transport.preRoll().addValueObserver((preRollState) => {
            this.setState({ on: preRollState !== 'none' });
        });
    }

    onPress() {
        this.transport.preRoll().set(this.state.on ? 'none' : 'one_bar');
    }
}


export abstract class AbstractRestartButton extends AbstractButton {
    abstract transport: API.Transport;

    onPress() {
        this.setState({ on: true });
        this.transport.restart();
    }

    onRelease() {
        this.setState({ on: false });
    }
}


export abstract class AbstractOverwriteToggle extends AbstractButton {
    abstract transport: API.Transport;

    onInit() {
        this.transport.isClipLauncherOverdubEnabled().addValueObserver(
            isActive => this.setState({ on: isActive })
        );
    }

    onPress() {
        this.transport.isClipLauncherOverdubEnabled().set(!this.state.on);
    }
}


export abstract class AbstractLoopToggle extends AbstractButton {
    abstract transport: API.Transport;

    onInit() {
        this.transport.isArrangerLoopEnabled().addValueObserver(
            isActive => this.setState({ on: isActive })
        );
    }

    onPress() {
        this.transport.isArrangerLoopEnabled().set(!this.state.on);
    }
}
