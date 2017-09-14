import { Control, ControlState } from './Control';
import { MidiMessage } from '../midi';

export type ControlChangeState = ControlState;
export class ControlChange<State extends ControlChangeState = ControlChangeState> extends Control<
    State
> {
    status: number;
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
    }
}
