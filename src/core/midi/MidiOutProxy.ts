import Midi from '../../helpers/Midi';
import host from '../../host';


export interface MidiOutControlState extends Midi {
    port: number,
    urgent: boolean,
}

export default class MidiOutProxy {
    private _state: { [key: string]: MidiOutControlState } = {};
    private _queue: string[] = [];

    sendMidi(status: number, data1: number, data2: number, { port = 0, urgent = false }) {
        const key = `${port}:${status}:${data1}`;
        // quick exit if there's no change to data2 value
        if (this._state[key] !== undefined && this._state[key].data2 === data2) return;
        // TODO: replace with object spread in typescript 2.1
        this._state = Object.assign({}, this._state, { [key]: { port, status, data1, data2 } });
        // if urgent, fire midi message immediately, otherwise queue it up for next flush
        urgent ? host.getMidiOutPort(port).sendMidi(status, data1, data2) : this._queue.push(key);
    }

    sendSysex(data, port = 0) {
        host.getMidiOutPort(port).sendSysex(data);
    }

    sendNoteOn(channel: number, key: number, velocity: number, { port = 0, urgent = false }) {
        this.sendMidi(0x90 | channel, key, velocity, { port, urgent });
    }

    sendNoteOff(channel: number, key: number, velocity: number, { port = 0, urgent = false }) {
        this.sendMidi(0x80 | channel, key, velocity, { port, urgent });
    }

    sendKeyPressure(channel: number, key: number, pressure: number, { port = 0, urgent = false }) {
        this.sendMidi(0xA0 | channel, key, pressure, { port, urgent });
    }

    sendChannelController(channel: number, controller: number, value: number, { port = 0, urgent = false }) {
        this.sendMidi(0xB0 | channel, controller, value, { port, urgent });
    }

    sendProgramChange(channel: number, program: number, { port = 0, urgent = false }) {
        this.sendMidi(0xC0 | channel, program, 0, { port, urgent });
    }

    sendChannelPressure(channel: number, pressure: number, { port = 0, urgent = false }) {
        this.sendMidi(0xD0 | channel, pressure, 0, { port, urgent });
    }

    sendPitchBend(channel: number, value: number, { port = 0, urgent = false }) {
        this.sendMidi(0xE0 | channel, value & 0x7F, (value >> 7) & 0x7F, { port, urgent });
    }

    flushQueue() {
        // TODO: do I need to throttle this? do I need to make sure flushQueue function is only being run once at a given time
        while (this._queue.length > 0) {
            const { port, status, data1, data2 } = this._state[this._queue.shift()];
            host.getMidiOutPort(port).sendMidi(status, data1, data2);
        }
    }
}

