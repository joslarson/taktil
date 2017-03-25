import { AbstractRange, SimpleControl } from 'taktil';
import store from '../store';


export default class VolumeRange extends AbstractRange<{ index: number }> {
    track = store.trackBank.getChannel(this.options.index);

    onInit() {
        this.track.getVolume().addValueObserver(value => {
            this.setState({ value: Math.round(value * 127) })
        });
    }

    onControlInput(control: SimpleControl, { value }) {
        if (!this.track.exists().get()) return control.render();
        super.onControlInput(control, { value });
        this.track.getVolume().set(value / 127);
    }
}