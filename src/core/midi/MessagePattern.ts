import { default as MidiMessage, SimpleMidiMessage } from './MidiMessage';
import SysexMessage from './SysexMessage';


export default class MessagePattern {
    string: string;
    regex: RegExp;

    constructor(input: string | Partial<SimpleMidiMessage>) {
        let string: string;
        if (typeof input === 'string') {  // handel string representation as input (e.g. 'B419??')
            if(!/[a-fA-F0-9\?]{6,}/.test(input)) throw new Error(`Invalid message pattern: "${input}"`)
            string = input.toUpperCase();
        } else {  // handle Partial<SimpleMidiMessage> as input
            string = this._getPatternStringFromMidiMessage(input);
        }
        this.string = string;
        this.regex = new RegExp(`^${string.slice().replace(/\?/g, '.')}$`);
    }

    toString() {
        return this.string;
    }

    private _getPatternStringFromMidiMessage(midiMessage: Partial<SimpleMidiMessage>) {
        return [midiMessage.status, midiMessage.data1, midiMessage.data2].map(midiByte => {
            if (midiByte === undefined) return '??';
            let hexByteString = midiByte.toString(16).toUpperCase();
            if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
            return hexByteString;
        }).join('');
    }

    conflictsWith(pattern: MessagePattern) {
        return this.regex.test(pattern.toString()) || pattern.regex.test(this.toString());
    }

    test(message: MidiMessage | SysexMessage) {
        const testString: string = (
            message instanceof SysexMessage ? message.data.toUpperCase()
            : this._getPatternStringFromMidiMessage(message));
        return this.regex.test(testString);
    }
}