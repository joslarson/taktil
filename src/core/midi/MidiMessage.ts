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

    constructor({ port = 0, status, data1, data2 }: MidiMessageConstructorType) {
        this.port = port;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
    }

    toString() {
        return (`MIDI: ${this.status}, ${this.data1}, ${this.data2} [${unsignedInt8ToHex(this.status)}${unsignedInt7ToHex(this.data1)}${unsignedInt7ToHex(this.data2)}]`);
    }

    isNote() {
        return ((this.status & 0xf0) == 0x80) || ((this.status & 0xf0) == 0x90);
    }

    isNoteOff() {
        return ((this.status & 0xF0) == 0x80) || ((this.status & 0xF0) == 0x90 && this.data2 == 0);
    }

    isNoteOn() {
        return (this.status & 0xF0) == 0x90;
    }

    isKeyPressure() {
        return (this.status & 0xF0) == 0xA0;
    }

    isChannelController() {
        return (this.status & 0xF0) == 0xB0;
    }

    isProgramChange() {
        return (this.status & 0xF0) == 0xC0;
    }

    isChannelPressure() {
        return (this.status & 0xF0) == 0xD0;
    }

    isPitchBend() {
        return (this.status & 0xF0) == 0xE0;
    }

    isMTCQuarterFrame() {
        return this.status == 0xF1;
    }

    isSongPositionPointer() {
        return this.status == 0xF2;
    }

    isSongSelect() {
        return this.status == 0xF3;
    }

    isTuneRequest() {
        return this.status == 0xF6;
    }

    isTimingClock() {
        return this.status == 0xF8;
    }

    isMIDIStart() {
        return this.status == 0xFA;
    }

    isMIDIContinue() {
        return this.status == 0xFB;
    }

    isMidiStop() {
        return this.status == 0xFC;
    }

    isActiveSensing() {
        return this.status == 0xFE;
    }

    isSystemReset() {
        return this.status == 0xFF;
    }

    getChannel() {
        return this.status & 0xF;
    }

    getPitchBendValue() {
        return (this.data2 << 7) | this.data1;
    }
}
