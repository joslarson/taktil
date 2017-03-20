import { AbstractButton, SimpleControl } from 'taktil';

import store from 'store';


export default class TrackButton extends AbstractButton<{ index: number }> {
    track: API.Track;
    state = { ...this.state, exists: false };

    updateControlState(control: SimpleControl) {
        const color = this.state.color;
        control.setState({
            value: this.state.on ? control.maxValue : control.minValue,
            disabled: !this.state.exists,
            ...(color === undefined ? {} : { color }),
        });
    }

    onInit() {
        this.track = store.trackBank.getChannel(this.options.index) as API.Track;
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
            store.application.createInstrumentTrack(this.options.index);
            this.track.browseToInsertAtStartOfChain();
        }
        this.track.selectInEditor();
    }

    onLongPress() {
        if (this.track.isGroup().get() && !this.state.disabled) {
            store.application.navigateIntoTrackGroup(this.track);
            store.trackBank.getChannel(0).selectInEditor();
        }
    }

    onDoublePress() {
        if (!this.state.disabled) {
            store.application.navigateToParentTrackGroup();
            store.trackBank.getChannel(0).selectInEditor();
        }
    }
}
