import { unsignedInt7ToHex, unsignedInt8ToHex } from '../../utils';


export interface SimpleMidiMessage {
    status: number;
    data1: number;
    data2: number;
}

export type MidiMessageConstructorType = { port?: number, status: number, data1: number, data2: number };

export default class MidiMessage implements SimpleMidiMessage {
    port: number;
    status: number;
    data1: number;
    data2: number;
    hex: string;

    constructor({ port = 0, status, data1, data2 }: MidiMessageConstructorType) {
        this.port = port;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
        this.hex = [status, data1, data2].map(midiByte => {
            let hexByteString = midiByte.toString(16).toUpperCase();
            if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
            return hexByteString;
        }).join('');
    }

    get channel() {
        return this.status & 0xF;
    }

    get pitchBendValue() {
        return (this.data2 << 7) | this.data1;
    }

    get isNote() {
        return ((this.status & 0xf0) == 0x80) || ((this.status & 0xf0) == 0x90);
    }

    get isNoteOff() {
        return ((this.status & 0xF0) == 0x80) || ((this.status & 0xF0) == 0x90 && this.data2 == 0);
    }

    get isNoteOn() {
        return (this.status & 0xF0) == 0x90;
    }

    get isKeyPressure() {
        return (this.status & 0xF0) == 0xA0;
    }

    get isChannelController() {
        return (this.status & 0xF0) == 0xB0;
    }

    get isProgramChange() {
        return (this.status & 0xF0) == 0xC0;
    }

    get isChannelPressure() {
        return (this.status & 0xF0) == 0xD0;
    }

    get isPitchBend() {
        return (this.status & 0xF0) == 0xE0;
    }

    get isMTCQuarterFrame() {
        return this.status == 0xF1;
    }

    get isSongPositionPointer() {
        return this.status == 0xF2;
    }

    get isSongSelect() {
        return this.status == 0xF3;
    }

    get isTuneRequest() {
        return this.status == 0xF6;
    }

    get isTimingClock() {
        return this.status == 0xF8;
    }

    get isMIDIStart() {
        return this.status == 0xFA;
    }

    get isMIDIContinue() {
        return this.status == 0xFB;
    }

    get isMidiStop() {
        return this.status == 0xFC;
    }

    get isActiveSensing() {
        return this.status == 0xFE;
    }

    get isSystemReset() {
        return this.status == 0xFF;
    }

    toString() {
        return this.hex;
    }
}
