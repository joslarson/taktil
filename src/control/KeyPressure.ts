import { Control, ControlState } from './Control';

export type KeyPressureState = ControlState;
export class KeyPressure<State extends KeyPressureState = KeyPressureState> extends Control<State> {
    status: number;
    data1: number;

    constructor({
        port = 0,
        channel,
        key,
        enableMidiOut = false,
        ...rest
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
