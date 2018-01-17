import { MidiControl, MidiControlState } from './MidiControl';
import { MidiMessage } from '../message';

export type ChannelPressureState = MidiControlState;
export class ChannelPressure<
    State extends ChannelPressureState = ChannelPressureState
> extends MidiControl<State> {
    enableMidiOut = false;
    status: number;

    constructor({
        port = 0,
        channel,
        ...rest,
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
        return { ...this.state as object, value: data1 } as State; // TODO: should be able to remove type casting in future typescript release
    }

    getOutputMessages({ value }: State): MidiMessage[] {
        const { port, status } = this;
        return [new MidiMessage({ port, status, data1: value, data2: 0 })];
    }
}
