import { MidiMessage } from '../message';
import { MidiControl, MidiControlState } from './MidiControl';

export type ChannelPressureState = MidiControlState;
export class ChannelPressure<
    State extends ChannelPressureState = ChannelPressureState
> extends MidiControl<State> {
    enableMidiOut = false;
    status: number;

    constructor({
        port = 0,
        channel,
        ...rest
    }: {
        port?: number;
        channel: number;
        enableMidiOut?: boolean;
        enableCache?: boolean;
        cacheOnMidiIn?: boolean;
    }) {
        super({ patterns: [{ port, status: 0xd0 | channel }], ...rest });
    }

    getControlInput({ data1 }: MidiMessage): State {
        return Object.assign({}, this.state, { value: data1 });
    }

    getOutputMessages({ value }: State): MidiMessage[] {
        const { port, status } = this;
        return [new MidiMessage({ port, status, data1: value, data2: 0 })];
    }
}
