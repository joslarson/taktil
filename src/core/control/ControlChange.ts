import { Control, ControlState } from './Control';
import { MidiMessage } from '../midi';

export type ControlChangeState = ControlState;
export class ControlChange<State extends ControlChangeState = ControlChangeState> extends Control<
    State
> {
    channel: number;
    data1: number;

    constructor({
        port = 0,
        channel,
        control,
        ...rest,
    }: {
        port?: number;
        channel: number;
        control: number;
        enableMidiOut?: boolean;
        enableCache?: boolean;
        cacheOnMidiIn?: boolean;
    }) {
        super({ patterns: [{ port, status: 0xb0 | channel, data1: control }], ...rest });
        this.channel = channel;
    }

    getControlInput(message: MidiMessage): State {
        return { ...this.state as ControlState, value: message.data2 } as State; // TODO: should be able to remove type casting in future typescript release
    }

    getMidiOutput({ value }: State): MidiMessage[] {
        const { port, channel, data1 } = this;
        return [new MidiMessage({ port, data1, status: 0xb0 | channel, data2: value })];
    }
}
