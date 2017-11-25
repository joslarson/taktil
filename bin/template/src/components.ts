import taktil from 'taktil';

interface PlayToggleParams {
    transport: API.Transport;
}

type PlayToggleState = taktil.ButtonState;

export class PlayToggle extends taktil.Button<PlayToggleParams, PlayToggleState> {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.state.on ? this.params.transport.stop() : this.params.transport.play();
    }
}
