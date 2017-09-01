import { MidiMessage, SimpleMidiMessage } from './MidiMessage';
import { SysexMessage } from './SysexMessage';
import { Session } from '../session';
import { session } from '../../taktil';

export interface NaiveMidiMessage extends SimpleMidiMessage {
    name?: string;
    port: number;
}

export interface NaiveSysexMessage {
    name?: string;
    port: number;
    data: string;
}

export class MidiOutProxy {
    private _midiQueue: NaiveMidiMessage[] = [];
    private _sysexQueue: NaiveSysexMessage[] = [];

    constructor(session: Session) {
        session.on('flush', () => this._flushQueues());
    }

    sendMidi({
        name,
        port = 0,
        status,
        data1,
        data2,
        urgent = false,
    }: {
        name?: string;
        port?: number;
        status: number;
        data1: number;
        data2: number;
        urgent?: boolean;
    }) {
        // if urgent, fire midi message immediately, otherwise queue it up for next flush
        if (urgent) {
            console.log(
                `[MIDI]  OUT ${String(port)} <== ${new MidiMessage({ status, data1, data2 })
                    .hex}${name ? ` "${name}"` : ''}`
            );
            host.getMidiOutPort(port).sendMidi(status, data1, data2);
        } else {
            this._midiQueue.push({ name, port, status, data1, data2 });
        }
    }

    sendSysex({
        name,
        port = 0,
        data,
        urgent = false,
    }: {
        name?: string;
        port?: number;
        data: string;
        urgent?: boolean;
    }) {
        // if urgent, fire sysex immediately, otherwise queue it up for next flush
        if (urgent) {
            console.log(`[SYSEX] OUT ${String(port)} <== ${data}${name ? ` "${name}"` : ''}`);
            host.getMidiOutPort(port).sendSysex(data);
        } else {
            this._sysexQueue.push({ name, port, data });
        }
    }

    sendNoteOn({
        port = 0,
        channel,
        key,
        velocity,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        key: number;
        velocity: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0x90 | channel, data1: key, data2: velocity });
    }

    sendNoteOff({
        port = 0,
        channel,
        key,
        velocity,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        key: number;
        velocity: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0x80 | channel, data1: key, data2: velocity });
    }

    sendKeyPressure({
        port = 0,
        channel,
        key,
        pressure,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        key: number;
        pressure: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0xa0 | channel, data1: key, data2: pressure });
    }

    sendChannelController({
        port = 0,
        channel,
        controller,
        value,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        controller: number;
        value: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0xb0 | channel, data1: controller, data2: value });
    }

    sendProgramChange({
        port = 0,
        channel,
        program,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        program: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0xc0 | channel, data1: program, data2: 0 });
    }

    sendChannelPressure({
        port = 0,
        channel,
        pressure,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        pressure: number;
        urgent?: boolean;
    }) {
        this.sendMidi({ urgent, port, status: 0xd0 | channel, data1: pressure, data2: 0 });
    }

    sendPitchBend({
        port = 0,
        channel,
        value,
        urgent = false,
    }: {
        port?: number;
        channel: number;
        value: number;
        urgent?: boolean;
    }) {
        this.sendMidi({
            urgent,
            port,
            status: 0xe0 | channel,
            data1: value & 0x7f,
            data2: (value >> 7) & 0x7f,
        });
    }

    // flush queued midi and sysex messages
    protected _flushQueues() {
        while (this._midiQueue.length > 0 || this._sysexQueue.length > 0) {
            const midiMessage = this._midiQueue.shift() as NaiveMidiMessage;
            if (midiMessage) {
                const { port, status, data1, data2 } = midiMessage;
                console.log(
                    `[MIDI]  OUT ${String(port)} <== ${new MidiMessage({ status, data1, data2 })
                        .hex}${name ? ` "${name}"` : ''}`
                );
                host.getMidiOutPort(port).sendMidi(status, data1, data2);
            }

            const sysexMessage = this._sysexQueue.shift() as NaiveSysexMessage;
            if (sysexMessage) {
                const { port, data } = sysexMessage;
                console.log(`[SYSEX] OUT ${String(port)} <== ${data}${name ? ` "${name}"` : ''}`);
                host.getMidiOutPort(port).sendSysex(data);
            }
        }
    }
}
