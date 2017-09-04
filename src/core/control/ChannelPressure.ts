import { Control, ControlState } from './Control';
import { MidiMessage } from '../midi';

export type ChannelPressureState = ControlState;
export class ChannelPressure<
    State extends ChannelPressureState = ChannelPressureState
> extends Control<State> {
    enableMidiOut = false;
    channel: number;

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
        this.channel = channel;
    }

    getControlInput(message: MidiMessage): State {
        return { ...this.state as ControlState, value: message.data1 } as State; // TODO: should be able to remove type casting in future typescript release
    }

    getMidiOutput({ value }: State): MidiMessage[] {
        const { port, channel } = this;
        return [new MidiMessage({ port, status: 0xd0 | channel, data1: value, data2: 0 })];
    }
}
