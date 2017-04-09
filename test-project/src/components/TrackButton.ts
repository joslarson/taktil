import { AbstractButton, AbstractSimpleControl, Color } from 'taktil';

import store from 'store';


interface TrackButtonState {
    on: boolean;
    color?: Color;
    exists: boolean;
    disabled: boolean;
    noteOn: boolean;
}


export default class TrackButton extends AbstractButton<{ index: number }, TrackButtonState> {
    track: API.Track;

    notes: API.PlayingNote[] = [];

    getInitialState() {
        return { on: false, disabled: false, exists: false, noteOn: false };
    }

    getControlOutput(control: AbstractSimpleControl) {
        const { on, exists, color, noteOn } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            accent: noteOn,
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
        this.track.playingNotes().addValueObserver((notes: API.PlayingNote[]) => {
            notes = Array.prototype.slice.call(notes);
            let noteOn = false;
            for (let note of notes) {
                if (this.notes.indexOf(note) === -1) {
                    noteOn = true;
                    break;
                }
            }
            this.notes = notes;
            const delay = 60000 / (store.transport.tempo().get() * (666 - 20) + 20) / 8;
            if (noteOn) {
                if (this.memory.noteOn) {
                    clearTimeout(this.memory.noteOn);
                } else {
                    this.setState({ noteOn: true })
                }
                this.memory.noteOn = setTimeout(() => {
                    delete this.memory.noteOn;
                    this.setState({ noteOn: false });
                }, Math.max(delay, 100));
            }
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
