import { document, AbstractController, Control } from 'typewig';

import template from './template';


export const controls = {
    RESTART: new Control({ status: 0xB4, data1: 21, data2: 0 }),
    PLAY:    new Control({ status: 0xB4, data1: 25, data2: 0 }),
    REC:     new Control({ status: 0xB4, data1: 26, data2: 0 }),
    SHIFT:   new Control({ status: 0xB4, data1: 24, data2: 0 }),
};


export default class TransportController extends AbstractController {
    // controls = controls;

    constructor() {;
        super(template, controls);
    }

    blankController() {
        for (let controlName in this.controls) {
            const control = this.controls[controlName];
            const port = 0, { status, data1 } = control, data2 = 0;
            document.midiOut.sendMidi({ port, status, data1, data2 });
        }
    }
}
