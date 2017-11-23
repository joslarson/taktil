import taktil from 'taktil';

export class PlayToggle extends taktil.Button {
    onInit() {
        this.params.transport
            .isPlaying()
            .addValueObserver(isPlaying => this.setState({ on: isPlaying }));
    }

    onPress() {
        this.state.on ? this.params.transport.stop() : this.params.transport.play();
    }
}
