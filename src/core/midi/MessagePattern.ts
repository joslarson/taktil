import { MidiMessage, SimpleMidiMessage } from './MidiMessage';
import { SysexMessage } from './SysexMessage';

export class MessagePattern {
    static getPatternStringFromMidiMessage({
        port,
        status,
        data1,
        data2,
    }: Partial<SimpleMidiMessage>) {
        return [port, status, data1, data2]
            .map(midiByte => {
                if (midiByte === undefined) return '??';
                let hexByteString = midiByte.toString(16).toUpperCase();
                if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
                return hexByteString;
            })
            .join('');
    }

    static getMidiMessageFromPatternString(pattern: string): Partial<SimpleMidiMessage> {
        const string = pattern.length === 6 ? `??${pattern}` : pattern;
        const [port, status, data1, data2] = (string.match(/.{1,2}/g) as string[]).map(
            byte => (byte.indexOf('?') > -1 ? undefined : parseInt(byte, 16))
        );
        return { port, status, data1, data2 };
    }

    port?: number;
    status?: number;
    data1?: number;
    data2?: number;

    string: string;
    regex: RegExp;

    constructor(input: string | Partial<SimpleMidiMessage>) {
        let string: string;
        if (typeof input === 'string') {
            // handel string representation as input (e.g. '00B419??')
            string = input.length === 6 ? `??${input}` : input;
            if (!/[a-fA-F0-9?]{8,}/.test(string))
                throw new Error(`Invalid message pattern: "${input}"`);
            string = string.toUpperCase();
            const message = MessagePattern.getMidiMessageFromPatternString(string);
            this.port = message.port;
            this.status = message.status;
            this.data1 = message.data1;
            this.data2 = message.data2;
        } else {
            // handle Partial<SimpleMidiMessage> as input
            string = MessagePattern.getPatternStringFromMidiMessage(input);
            this.port = input.port;
            this.status = input.status;
            this.data1 = input.data1;
            this.data2 = input.data2;
        }
        this.string = string;
        this.regex = new RegExp(`^${string.slice().replace(/\?/g, '.')}$`);
    }

    toString() {
        return this.string;
    }

    conflictsWith(pattern: MessagePattern) {
        return this.regex.test(pattern.toString()) || pattern.regex.test(this.toString());
    }

    test(message: MidiMessage | SysexMessage) {
        const testString: string =
            message instanceof SysexMessage
                ? message.data.toUpperCase()
                : MessagePattern.getPatternStringFromMidiMessage(message);
        return this.regex.test(testString);
    }
}
