import Control, { ControlBaseState } from './Control';
import { MidiMessage, SysexMessage, MessagePattern } from '../midi';

export type SimpleControlBaseState = ControlBaseState;

export default class SimpleControl<
    State extends SimpleControlBaseState = SimpleControlBaseState
> extends Control<State> {
    state = { value: 0 } as State;
    status: number;
    data1: number;

    constructor({
        port,
        inPort,
        outPort,
        status,
        data1,
    }: {
        port?: number;
        inPort?: number;
        outPort?: number;
        status: number;
        data1: number;
    }) {
        super({
            port,
            inPort,
            outPort,
            patterns: [new MessagePattern({ status, data1 })],
        });
        this.status = status;
        this.data1 = data1;
    }

    getMidiOutput(state: State): (MidiMessage | SysexMessage)[] {
        const { outPort: port, status, data1 } = this;
        const data2 = Math.round(state.value * 127);
        return [new MidiMessage({ port, status, data1, data2 })];
    }

    getInput(message: MidiMessage | SysexMessage): State {
        if (
            message instanceof MidiMessage &&
            message.status === this.status &&
            message.data1 === this.data1
        ) {
            return { ...this.state as object, value: message.data2 / 127 } as State; // TODO: should be able to remove type casting in future typescript release
        } else {
            return { ...this.state as object } as State; // TODO: should be able to remove type casting in future typescript release
        }
    }
}
