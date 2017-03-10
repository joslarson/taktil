import { AbstractComponentSet, AbstractButton, SimpleControl } from 'taktil';

import bitwig from 'apistore';


export abstract class AbstractTrackButton extends AbstractButton {
    abstract index: number;
    track: API.Track;
    state = { ...this.state, exists: false };

    updateControlState(control: SimpleControl) {
        const color = this.state.color;
        control.setState({
            value: this.state.on ? control.resolution - 1 : 0,
            disabled: !this.state.exists,
            ...(color === undefined ? {} : { color }),
        });
    }

    onRegister() {
        this.track = bitwig.trackBank.getChannel(this.index) as any as API.Track;
        this.track.isGroup().markInterested();

        this.track.color().addValueObserver((r, g, b) => {
            this.setState({ ...this.state, color: { r, g, b } });
        });

        this.track.addIsSelectedInEditorObserver(isSelected => {
            this.setState({ ...this.state, on: isSelected })
        });

        this.track.exists().addValueObserver(trackExists => {
            this.setState({ ...this.state, exists: trackExists });
        });
    }

    onPress() {
        if (!this.track.exists().get()) {
            bitwig.application.createInstrumentTrack(this.index);
            this.track.browseToInsertAtStartOfChain();
        }
        this.track.selectInEditor();
    }

    onLongPress() {
        if (this.track.isGroup().get() && !this.state.disabled) {
            bitwig.application.navigateIntoTrackGroup(this.track);
            bitwig.trackBank.getChannel(0).selectInEditor();
        }
    }

    onDoublePress() {
        if (!this.state.disabled) {
            bitwig.application.navigateToParentTrackGroup();
            bitwig.trackBank.getChannel(0).selectInEditor();
        }
    }
}

export default class TrackButtonBank extends AbstractComponentSet {
    getComponentClass(index: number) {
        return class TrackButton extends AbstractTrackButton {
            index = index;
        }
    }
}
