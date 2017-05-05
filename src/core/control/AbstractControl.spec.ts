import { expect } from 'chai';

import AbstractControl from './AbstractControl';
import { MidiMessage, SysexMessage } from '../midi/';


class Control extends AbstractControl {
    state = { value: 1, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }
}

describe('AbstractControl', () => {
    it('should set state correctly', () => {
        const control = new Control({ patterns: ["B00000"] });
        control.setState({ nested: { value: 1 } });  // receives partial state
        expect(control.state).to.deep.equal({ value: 1, nested: { value: 1 } });
    });

    it('should maintain its initial state', () => {
        const control = new Control({ patterns: ["B00000"] });
        control.setState({ nested: { value: 1 } });
        // state changes, initial state does not
        expect(control.initialState.nested).to.deep.equal({ value: 0 });
    });
});
