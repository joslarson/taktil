import { AbstractRange, AbstractSimpleControl } from 'taktil';
import store from '../store';

interface VolumeRangeState {
    value: number;
    meter: number;
    isPlaying: boolean;
}


export default class VolumeRange extends AbstractRange<{ track: API.Track }, VolumeRangeState> {
    getInitialState() {
        return { value: 0, meter: 0, isPlaying: false };
    }

    getControlOutput(control: AbstractSimpleControl) {
        const { value, meter, isPlaying } = this.state;
        return { value: isPlaying && !this.memory.input && meter ? meter : value };
    }

    onInit() {
        this.options.track.getVolume().addValueObserver((value: number) => this.setState({ value }));
        this.options.track.addVuMeterObserver(128, -1, false, meter => {
            if (this.state.isPlaying) this.setState({ meter: meter/127 });
        });
        store.transport.isPlaying().addValueObserver((isPlaying: boolean) => {
            this.setState({ isPlaying });
        });
    }

    onControlInput(control: AbstractSimpleControl, { value }) {
        if (!this.options.track.exists().get()) return control.render();

        if (Math.abs(this.state.value - value) < 0.1) this.memory.ready = true;
        if (this.memory.input) clearTimeout(this.memory.input);
        this.memory.input = setTimeout(() => {
            delete this.memory.ready;
            delete this.memory.input;
        }, this.INPUT_DELAY);

        if (this.memory.ready || !this.state.isPlaying) this.options.track.getVolume().set(value);
    }
}
