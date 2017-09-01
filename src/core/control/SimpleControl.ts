import { Control, ControlState } from './Control';
import { MidiMessage, SysexMessage, MessagePattern } from '../midi';

export type SimpleControlState = ControlState;

export class SimpleControl<State extends SimpleControlState = SimpleControlState> extends Control<
    State
> {
    port: number;
    status: number;
    data1: number;

    constructor({ port = 0, status, data1 }: { port?: number; status: number; data1: number }) {
        super(new MessagePattern({ port, status, data1 }));
        this.port = port;
        this.status = status;
        this.data1 = data1;
    }

    getMidiOutput(state: State): (MidiMessage | SysexMessage)[] {
        const { port, status, data1 } = this;
        return [new MidiMessage({ port, status, data1, data2: state.value })];
    }

    getControlInput(message: MidiMessage): State {
        if (message.status === this.status && message.data1 === this.data1) {
            return { ...this.state as object, value: message.data2 } as State; // TODO: should be able to remove type casting in future typescript release
        } else {
            return this.state; // TODO: should be able to remove type casting in future typescript release
        }
    }
}
