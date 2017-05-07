import { expect } from 'chai';
import * as sinon from 'sinon';

import SimpleControl from './SimpleControl';
import { MidiMessage, SysexMessage } from '../midi/';
import session from '../../session';


type ControlState = { value: number, nested: { value: number } };

class Control extends SimpleControl<ControlState> {
    state = { value: 1, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }

    getOutput(state: ControlState) {
        return [
            new MidiMessage({
                status: 0xB0, data1: 0x1F, data2: this.state.value || 127,
            })
        ]
    }
}

const control = new Control({ status: 0xB0, data1: 21 });

describe('SimpleControl', () => {
    it('should initialize state correctly', () => {
        expect(control.state).to.deep.equal({ value: 1, nested: { value: 0 } });
    });
});
