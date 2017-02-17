import { default as AbstractControl, Color } from './AbstractControl';
import { MidiMessage, SysexMessage, MidiPattern } from '../midi';

export default class SimpleControl extends AbstractControl {
    status: number;
    data1: number;

    constructor({ port, inPort, outPort, status, data1 }: {
        port?: number, inPort?: number, outPort?: number, status: number, data1: number
    }) {
        super({
            port, inPort, outPort,
            patterns: [new MidiPattern({ status, data1, data2: undefined }).string],
        });
        this.status = status;
        this.data1 = data1;
    }

    getRenderMessages(): (MidiMessage | SysexMessage)[] {
        const { outPort: port, status, data1 } = this;
        const data2 = this.state.value;
        return [
            new MidiMessage({ port, status, data1, data2 }),
        ]
    }

    getStateFromInput(input: MidiMessage | SysexMessage): number {
        if (input instanceof MidiMessage && input.status === this.status && input.data1 === this.data1) {
            return input.data2;
        } else {
            return this.state.value;
        }
    }
}