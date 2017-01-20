import { session, host, AbstractMidiController, MidiControl } from 'typewig';


export const midiControls = {
    RESTART: new MidiControl('B11E??'),
    PLAY:    new MidiControl('B11F??'),
    REC:     new MidiControl('B120??'),
    SHIFT:   new MidiControl('B121??'),
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
