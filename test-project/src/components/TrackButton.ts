import { AbstractButton, AbstractSimpleControl, Color } from 'taktil';

import store from 'store';


interface TrackButtonState {
    on: boolean;
    color?: Color;
    exists: boolean;
    disabled: boolean;
}


export default class TrackButton extends AbstractButton<{ index: number }, TrackButtonState> {
    track: API.Track;

    getInitialState() {
        return { on: false, disabled: false, exists: false };
    }

    getControlOutput(control: AbstractSimpleControl) {
        const { on, exists, color } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            ...(color === undefined ? {} : { color }),
        };
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
        if (this.options.index === store.trackBank.channelCount().get()) {
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
