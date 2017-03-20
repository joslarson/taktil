import { AbstractButton, SimpleControl } from 'taktil';

import store from 'store';


export default class ClipSlotButton extends AbstractButton<{ index: number }> {
    clipLauncherSlotBank = store.cursorTrack.clipLauncherSlotBank();
    state = {
        color: undefined,
        isPlaying: false, isPlaybackQueued: false,
        isRecording: false, isRecordingQueued: false,
        hasContent: false,
    };

    updateControlState(control: SimpleControl) {
        const { isPlaying, isPlaybackQueued, isRecording, isRecordingQueued, hasContent } = this.state;
        const value = isPlaying || isPlaybackQueued || isRecording || isRecordingQueued ? control.maxValue : control.minValue;
        const disabled = !hasContent && !isRecordingQueued;
        const flashing = isPlaybackQueued || isRecordingQueued;
        const color = isRecordingQueued || isRecording ? { r: 1, g: 0, b: 0 } : this.state.color;
        control.setState({
            value, ...(color === undefined ? {} : { color }), disabled, flashing,
        });
    }

    onInit() {
        this.clipLauncherSlotBank.addIsPlayingObserver((index, isPlaying) => {
            if (index === this.options.index) this.setState({ isPlaying });
        });
        this.clipLauncherSlotBank.addIsPlaybackQueuedObserver((index, isPlaybackQueued) => {
            if (index === this.options.index) this.setState({ isPlaybackQueued });
        });
        this.clipLauncherSlotBank.addIsRecordingObserver((index, isRecording) => {
            if (index === this.options.index) this.setState({ isRecording });
        });
        this.clipLauncherSlotBank.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            if (index === this.options.index) this.setState({ isRecordingQueued });
        });
        this.clipLauncherSlotBank.addColorObserver((index, r, g, b) => {
            if (index === this.options.index) this.setState({ color: { r, g, b } });
        });
        this.clipLauncherSlotBank.addHasContentObserver((index, hasContent) => {
            if (index === this.options.index) this.setState({ hasContent });
        });
    }

    onPress() {
        const sceneExists = store.sceneBank.getScene(this.options.index).exists().get();
        if (!sceneExists) {
            for (let i = 0; i <= this.options.index; i++) {
                if (!store.sceneBank.getScene(i).exists().get()) {
                    store.createScene.invoke();
                }
            }
        }
        this.clipLauncherSlotBank.launch(this.options.index);
    }
}
