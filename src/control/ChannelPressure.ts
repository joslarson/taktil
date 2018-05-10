import { MidiMessage } from '../midi';
import { Control, ControlState } from './Control';

export type ChannelPressureState = ControlState;
export class ChannelPressure<
    State extends ChannelPressureState = ChannelPressureState
> extends Control<State> {
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

    getMidiOutput({ value }: State): MidiMessage[] {
        const { port, status } = this;
        return [new MidiMessage({ port, status, data1: value, data2: 0 })];
    }
}
