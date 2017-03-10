import { SimpleMidiMessage } from './MidiMessage';

export default class MidiPattern {
    string: string;
    regex: RegExp;

    constructor(input: string | SimpleMidiMessage) {
        let string: string;
        if (typeof input === 'string') {  // handel string representation as input (e.g. 'B419??')
            if(!/[a-fA-F0-9\?]{6}/.test(input)) throw new Error(`Invalid midi pattern: "${input}"`)
            string = input.toUpperCase();
        } else {  // handle SimpleMidiMessage as input
            string = this._getPatternStringFromMidiMessage(input);
        }
        this.string = string;
        this.regex = new RegExp(string.slice().replace(/\?/g, '.'));
    }

    get midi(): SimpleMidiMessage {
        const status = this.string.slice(0, 2);
        const data1 = this.string.slice(2, 4);
        const data2 = this.string.slice(4, 6);

        return {
            status: status.indexOf('?') === -1 ? parseInt(status, 16): undefined,
            data1: data1.indexOf('?') === -1 ? parseInt(data1, 16): undefined,
            data2: data2.indexOf('?') === -1 ? parseInt(data2, 16): undefined,
        }
    }

    toString() {
        return this.string;
    }

    private _getPatternStringFromMidiMessage(midiMessage: SimpleMidiMessage) {
        return [midiMessage.status, midiMessage.data1, midiMessage.data2].map(midiByte => {
            if (midiByte === undefined) return '??';
            let hexByteString = midiByte.toString(16).toUpperCase();
            if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
            return hexByteString;
        }).join('');
    }

    conflictsWith(pattern: MidiPattern) {
        return this.regex.test(pattern.toString()) || pattern.regex.test(this.toString());
    }

    test(midiMessage: string | SimpleMidiMessage) {
        let testString: string = (typeof midiMessage === 'string' ?
                                  midiMessage : this._getPatternStringFromMidiMessage(midiMessage));
        return this.regex.test(testString);
    }
}