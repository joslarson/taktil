export interface SimpleMidiMessage {
    status: number;
    data1: number;
    data2: number;
}

export class MidiMessage implements SimpleMidiMessage {
    port: number;
    status: number;
    data1: number;
    data2: number;
    hex: string;

    constructor({ port = 0, status, data1, data2 }: { port?: number } & SimpleMidiMessage) {
        this.port = port;
        this.status = status;
        this.data1 = data1;
        this.data2 = data2;
        this.hex = [status, data1, data2]
            .map(midiByte => {
                let hexByteString = midiByte.toString(16).toUpperCase();
                if (hexByteString.length === 1) hexByteString = `0${hexByteString}`;
                return hexByteString;
            })
            .join('');
    }

    get channel() {
        return this.status & 0xf;
    }

    get pitchBendValue() {
        return (this.data2 << 7) | this.data1;
    }

    get isNote() {
        return (this.status & 0xf0) === 0x80 || (this.status & 0xf0) === 0x90;
    }

    get isNoteOff() {
        return (this.status & 0xf0) === 0x80 || ((this.status & 0xf0) === 0x90 && this.data2 === 0);
    }

    get isNoteOn() {
        return (this.status & 0xf0) === 0x90;
    }

    get isKeyPressure() {
        return (this.status & 0xf0) === 0xa0;
    }

    get isChannelController() {
        return (this.status & 0xf0) === 0xb0;
    }

    get isProgramChange() {
        return (this.status & 0xf0) === 0xc0;
    }

    get isChannelPressure() {
        return (this.status & 0xf0) === 0xd0;
    }

    get isPitchBend() {
        return (this.status & 0xf0) === 0xe0;
    }

    get isMTCQuarterFrame() {
        return this.status === 0xf1;
    }

    get isSongPositionPointer() {
        return this.status === 0xf2;
    }

    get isSongSelect() {
        return this.status === 0xf3;
    }

    get isTuneRequest() {
        return this.status === 0xf6;
    }

    get isTimingClock() {
        return this.status === 0xf8;
    }

    get isMIDIStart() {
        return this.status === 0xfa;
    }

    get isMIDIContinue() {
        return this.status === 0xfb;
    }

    get isMidiStop() {
        return this.status === 0xfc;
    }

    get isActiveSensing() {
        return this.status === 0xfe;
    }

    get isSystemReset() {
        return this.status === 0xff;
    }

    toString() {
        return this.hex;
    }
}
