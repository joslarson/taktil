import { session, host, AbstractController, Control } from 'typewig';


export const controls = {
    RESTART: new Control({ status: 0xB4, data1: 0x15 }),
    PLAY:    new Control({ status: 0xB4, data1: 0x19 }),
    REC:     new Control({ status: 0xB4, data1: 0x1A }),
    SHIFT:   new Control({ status: 0xB4, data1: 0x18 }),
};

export default class TransportController extends AbstractController {
    controls = controls;

    blankController() {
        for (let controlName in this.controls) {
            const control = this.controls[controlName];
            const { midiOutPort: port, status, data1 } = control, data2 = 0;
            session.midiOut.sendMidi({ port, status, data1, data2 });
        }
    }
}
