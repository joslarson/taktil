import { default as AbstractControl, getPatternFromMidi, Color } from './AbstractControl';
import { MidiMessage, SysexMessage } from '../midi';

export default class SimpleControl extends AbstractControl {
    status: number;
    data1: number;

    constructor({ port, inPort, outPort, status, data1 }: {
        port?: number, inPort?: number, outPort?: number, status: number, data1: number
    }) {
        super({ port, inPort, outPort, patterns: [getPatternFromMidi({ status, data1 })]});
        this.status = status;
        this.data1 = data1;
    }

    getRenderMessages({ value, color }: { value: number, color?: Color }): (MidiMessage | SysexMessage)[] {
        const { outPort: port, status, data1 } = this;
        const data2 = value;
        return [
            new MidiMessage({ port, status, data1, data2 }),
        ]
    }

    getValueFromMessage(message: MidiMessage | SysexMessage): number {
        if (message instanceof MidiMessage && message.status === this.status && message.data1 === this.data1) {
            return message.data2;
        } else {
            return this.state.value;
        }
    }
}