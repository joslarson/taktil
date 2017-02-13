import { default as MidiMessage, SimpleMidiMessage } from './MidiMessage';
import { areDeepEqual } from '../../utils';
import { midiMessageToHex } from '../../utils';


export interface NaiveMidiMessage extends SimpleMidiMessage {
    name?: string,
    port: number,
}


export default class MidiOutProxy {
    private _midiQueue: NaiveMidiMessage[] = [];
    private _sysexQueue: { port: number, data: string }[] = [];

    constructor(session) {
        session.on('flush', () => this._flushQueues());
    }

    sendMidi({ name, port = 0, status, data1, data2, urgent = false, cacheKey }: { name?: string, port?: number, status: number, data1: number, data2: number, urgent?: boolean, cacheKey?: string }) {
        // if urgent, fire midi message immediately, otherwise queue it up for next flush
        if (urgent) {
            console.log(`[MIDI] OUT ${String(port)} <== ${midiMessageToHex({ status, data1, data2 })}${name ? ` "${name}"` : ''}`);
            host.getMidiOutPort(port).sendMidi(status, data1, data2);
        } else {
            this._midiQueue.push({ name, port, status, data1, data2 });
        }
    }

    sendSysex({ port = 0, data, urgent = false }: { port?: number, data: string, urgent: boolean }) {
        // if urgent, fire sysex immediately, otherwise queue it up for next flush
        urgent ? host.getMidiOutPort(port).sendSysex(data): this._sysexQueue.push({ port, data });
    }

    sendNoteOn({ port = 0, channel, key, velocity, urgent = false }: { port?: number, channel: number, key: number, velocity: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0x90 | channel, data1: key, data2: velocity, urgent });
    }

    sendNoteOff({ port = 0, channel, key, velocity, urgent = false }: { port?: number, channel: number, key: number, velocity: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0x80 | channel, data1: key, data2: velocity, urgent });
    }

    sendKeyPressure({ port = 0, channel, key, pressure, urgent = false }: { port?: number, channel: number, key: number, pressure: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0xA0 | channel, data1: key, data2: pressure, urgent });
    }

    sendChannelController({ port = 0, channel, controller, value, urgent = false }: { port?: number, channel: number, controller: number, value: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0xB0 | channel, data1: controller, data2: value, urgent });
    }

    sendProgramChange({ port = 0, channel, program, urgent = false }: { port?: number, channel: number, program: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0xC0 | channel, data1: program, data2: 0, urgent });
    }

    sendChannelPressure({ port = 0, channel, pressure, urgent = false }: { port?: number, channel: number, pressure: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0xD0 | channel, data1: pressure, data2: 0, urgent });
    }

    sendPitchBend({ port = 0, channel, value, urgent = false }: { port?: number, channel: number, value: number, urgent?: boolean }) {
        this.sendMidi({ port, status: 0xE0 | channel, data1: value & 0x7F, data2: (value >> 7) & 0x7F, urgent });
    }

    // TODO: do I need to throttle this? do I need to make sure flushQueue function is only being run once at a given time?
    protected _flushQueues() {
        // 1. async flush queued midi messages
        setTimeout(() => {
            while (this._midiQueue.length > 0) {
                const { name, port, status, data1, data2 } = this._midiQueue.shift();
                console.log(`[MIDI] OUT ${String(port)} <== ${midiMessageToHex({ status, data1, data2 })}${name ? ` "${name}"` : ''}`);
                host.getMidiOutPort(port).sendMidi(status, data1, data2);
            }
        });
        // 2. async flush queued sysex messages
        setTimeout(() => {
            while (this._sysexQueue.length > 0) {
                const { port, data } = this._sysexQueue.shift();
                host.getMidiOutPort(port).sendSysex(data)
            }
        });
    }
}
