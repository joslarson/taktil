import { MidiControl, MidiControlState } from './MidiControl';
import { MidiMessage } from '../message';

export type ControlChangeState = MidiControlState;
export class ControlChange<
    State extends ControlChangeState = ControlChangeState
> extends MidiControl<State> {
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
