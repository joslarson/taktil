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
        } else {
            // handle Partial<SimpleMidiMessage> as input
            string = MessagePattern.getPatternStringFromMidiMessage(input);
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
