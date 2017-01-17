import { session, host, AbstractMidiController, MidiControl } from 'typewig';


export const midiControls = {
    RESTART: new MidiControl({ status: 0xB1, data1: 0x1E }),
    PLAY:    new MidiControl({ status: 0xB1, data1: 0x1F }),
    REC:     new MidiControl({ status: 0xB1, data1: 0x20 }),
    SHIFT:   new MidiControl({ status: 0xB1, data1: 0x21 }),
};

export default class TransportController extends AbstractMidiController {
    midiControls = midiControls;

    blankController() {
        for (let controlName in this.midiControls) {
            const control = this.midiControls[controlName];
            const { midiOutPort: port, status, data1 } = control, data2 = 0;
            session.midiOut.sendMidi({ port, status, data1, data2 });
        }
    }
}
