import { AbstractButton, AbstractComponentSet, SimpleControl } from 'taktil';

import bitwig from 'store';


export abstract class AbstractClipSlotButton extends AbstractButton {
    index: number;
    clipLauncherSlotBank: API.ClipLauncherSlotBank;
    state = {
        color: undefined,
        isPlaying: false, isPlaybackQueued: false,
        isRecording: false, isRecordingQueued: false,
        hasContent: false,
    };

    setState(state) {
        super.setState(state);
    }

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

    onPress() {
        const sceneExists = bitwig.sceneBank.getScene(this.index).exists().get();
        if (!sceneExists) {
            for (let i = 0; i <= this.index; i++) {
                if (!bitwig.sceneBank.getScene(i).exists().get()) {
                    bitwig.createScene.invoke();
                }
            }
        }
        this.clipLauncherSlotBank.launch(this.index);
    }
}

export default class ClipSlotButtonBank extends AbstractComponentSet {
    clipLauncherSlotBank = bitwig.cursorTrack.clipLauncherSlotBank();

    onRegister() {
        this.clipLauncherSlotBank.addIsPlayingObserver((index, isPlaying) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ isPlaying });
        });
        this.clipLauncherSlotBank.addIsPlaybackQueuedObserver((index, isPlaybackQueued) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ isPlaybackQueued });
        });
        this.clipLauncherSlotBank.addIsRecordingObserver((index, isRecording) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ isRecording });
        });
        this.clipLauncherSlotBank.addIsRecordingQueuedObserver((index, isRecordingQueued) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ isRecordingQueued });
        });
        this.clipLauncherSlotBank.addColorObserver((index, r, g, b) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ color: { r, g, b } });
        });
        this.clipLauncherSlotBank.addHasContentObserver((index, hasContent) => {
            const subComponent = this._componentMap.components[index];
            if (subComponent) subComponent.instance.setState({ hasContent });
        });
    }

    getComponentClass(index: number) {
        const that = this;
        return class ClipSlotBankButton extends AbstractClipSlotButton {
            index = index;
            clipLauncherSlotBank = that.clipLauncherSlotBank;
        };
    }
}