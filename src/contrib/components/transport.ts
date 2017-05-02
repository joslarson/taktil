import { AbstractButton } from '../../core/component';
import session from '../../session';


export class PlayToggle extends AbstractButton<{ transport: API.Transport }> {
    onInit() {
        this.props.transport.isPlaying().addValueObserver(isPlaying => (
            this.setState({ on: isPlaying })
        ));
    }

    onPress() {
        this.state.on ? this.props.transport.stop() : this.props.transport.play();
    }
}


export class MetronomeToggle extends AbstractButton<{ transport: API.Transport }> {
    onInit() {
        this.props.transport.isMetronomeEnabled().addValueObserver((isOn) => {
            this.setState({ on: isOn });
        });
    }

    onPress() {
        this.props.transport.isMetronomeEnabled().set(!this.state.on);
    }
}


export class PreRollToggle extends AbstractButton<{ transport: API.Transport }> {
    onInit() {
        this.props.transport.preRoll().addValueObserver((preRollState) => {
            this.setState({ on: preRollState !== 'none' });
        });
    }

    onPress() {
        this.props.transport.preRoll().set(this.state.on ? 'none' : 'one_bar');
    }
}


export class RestartButton extends AbstractButton<{ transport: API.Transport }, { on: boolean, isPlaying: boolean }> {
    onInit() {
        this.props.transport.isPlaying().addValueObserver(isPlaying => (
            this.setState({ isPlaying: isPlaying })
        ));
    }

    onPress() {
        this.setState({ on: true });
        this.props.transport.restart();
    }

    onRelease() {
        this.setState({ on: false });
    }
}


export class OverwriteToggle extends AbstractButton<{ transport: API.Transport }> {
    onInit() {
        this.props.transport.isClipLauncherOverdubEnabled().addValueObserver(
            isActive => this.setState({ on: isActive })
        );
    }

    onPress() {
        this.props.transport.isClipLauncherOverdubEnabled().set(!this.state.on);
    }
}


export class LoopToggle extends AbstractButton<{ transport: API.Transport }> {
    onInit() {
        this.props.transport.isArrangerLoopEnabled().addValueObserver(
            isActive => this.setState({ on: isActive })
        );
    }

    onPress() {
        this.props.transport.isArrangerLoopEnabled().set(!this.state.on);
    }
}
