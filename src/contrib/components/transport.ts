import { Button } from '../../core/component';

export class PlayToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.state.on ? this.options.transport.stop() : this.options.transport.play();
    }
}

export class MetronomeToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport.isMetronomeEnabled().addValueObserver(isOn => {
            this.setState({ on: isOn });
        });
    }

    onPress() {
        this.options.transport.isMetronomeEnabled().set(!this.state.on);
    }
}

export class PreRollToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport.preRoll().addValueObserver(preRollState => {
            this.setState({ on: preRollState !== 'none' });
        });
    }

    onPress() {
        this.options.transport.preRoll().set(this.state.on ? 'none' : 'one_bar');
    }
}

export class RestartButton extends Button<
    { transport: API.Transport },
    { on: boolean; isPlaying: boolean }
> {
    onInit() {
        this.options.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ isPlaying }));
    }

    onPress() {
        this.setState({ on: true });
        this.options.transport.restart();
    }

    onRelease() {
        this.setState({ on: false });
    }
}

export class OverwriteToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isClipLauncherOverdubEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.options.transport.isClipLauncherOverdubEnabled().set(!this.state.on);
    }
}

export class LoopToggle extends Button<{ transport: API.Transport }> {
    onInit() {
        this.options.transport
            .isArrangerLoopEnabled()
            .addValueObserver(isActive => this.setState({ on: isActive }));
    }

    onPress() {
        this.options.transport.isArrangerLoopEnabled().set(!this.state.on);
    }
}
