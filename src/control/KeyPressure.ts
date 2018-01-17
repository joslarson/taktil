import { MidiControl, MidiControlState } from './MidiControl';
import { MidiMessage } from '../message';

export type KeyPressureState = MidiControlState;
export class KeyPressure<State extends KeyPressureState = KeyPressureState> extends MidiControl<
    State
> {
    status: number;
    data1: number;

    constructor({
        port = 0,
        channel,
        key,
        enableMidiOut = false,
        ...rest,
    }: {
        port?: number;
        channel: number;
        key: number;
        enableMidiOut?: boolean;
        enableCache?: boolean;
        cacheOnMidiIn?: boolean;
    }) {
        const patterns = [{ port, status: 0xa0 | channel, data1: key }];
        super({ patterns, enableMidiOut, ...rest });
    }
}
