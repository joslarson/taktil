import { Control, ControlState } from './Control';
import { MidiMessage } from '../midi';

export type NoteState = ControlState;

export class Note<State extends NoteState = NoteState> extends Control<State> {
    channel: number;
    data1: number;
    useNoteOff: boolean = false;

    constructor({
        port = 0,
        channel,
        key,
        ...rest,
    }: {
        port?: number;
        channel: number;
        key: number;
        enableMidiOut?: boolean;
        enableCache?: boolean;
        cacheOnMidiIn?: boolean;
    }) {
        super({
            patterns: [
                { port, status: 0x90 | channel, data1: key },
                { port, status: 0x80 | channel, data1: key },
            ],
            ...rest,
        });
        this.channel = channel;
    }

    getControlInput(message: MidiMessage): State {
        if (message.isNoteOff && !this.useNoteOff) this.useNoteOff = true;
        return {
            ...this.state as ControlState,
            value: message.isNoteOn ? message.data2 : 0,
        } as State; // TODO: should be able to remove type casting in future typescript release
    }

    getMidiOutput({ value }: State): MidiMessage[] {
        const { port, channel, data1 } = this;
        if (this.useNoteOff && value === 0) {
            return [new MidiMessage({ port, data1, status: 0x80 | channel, data2: value })];
        } else {
            return [new MidiMessage({ port, data1, status: 0x90 | channel, data2: value })];
        }
    }
}
