import AbstractControl from './AbstractControl';
import { SimpleMidiMessage, MidiMessage, SysexMessage, MidiPattern } from '../midi/';


class Control extends AbstractControl {
    state = { value: 0 };

    getOutput(): (MidiMessage | SysexMessage)[] {
        return [];
    }

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }
}


describe('AbstractControl', () => {

});