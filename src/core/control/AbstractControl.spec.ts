import { default as AbstractControl, Color } from './AbstractControl';
import { SimpleMidiMessage, MidiMessage, SysexMessage, MidiPattern } from '../midi/';


class Control extends AbstractControl {
    getRenderMessages(): (MidiMessage | SysexMessage)[] {
        return [];
    }

    getInputState(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }
}


describe('AbstractControl', () => {

});