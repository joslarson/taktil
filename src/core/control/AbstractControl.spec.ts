import { expect } from 'chai';
import * as sinon from 'sinon';

import AbstractControl from './AbstractControl';
import { MidiMessage, SysexMessage } from '../midi/';
import AbstractButton from '../component/AbstractButton';
import session from '../../session';


type TestControlState = { value: number, nested: { value: number } };

class TestControl extends AbstractControl<TestControlState> {
    state = { value: 1, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }

    getOutput(state: TestControlState) {
        return [
            new MidiMessage({
                status: 0xB0, data1: 0x1F, data2: this.state.value || 127,
            })
        ]
    }
}

class TestComponent extends AbstractButton {
    state = { on: false };
}

const control = new TestControl({ patterns: ["B01F??"] });
const component = new TestComponent(control, {});

describe('AbstractControl', () => {
    it('should initialize state correctly', () => {
        expect(control.state).to.deep.equal({ value: 1, nested: { value: 0 } });
    });

    it('should modify state correctly', () => {
        control.setState({ nested: { value: 1 } });  // receives partial state
        expect(control.state).to.deep.equal({ value: 1, nested: { value: 1 } });
    });

    it('should maintain its initial state', () => {
        expect(control.initialState).to.deep.equal({ value: 1, nested: { value: 0 } });
    });

    it('should set active component correctly', () => {
        // should be initialized as null
        expect(control.activeComponent).to.be.null;
        control.activeComponent = component;
        expect(control.activeComponent).to.equal(component);
        // state.value should have been changed to 0 because of initial
        // component state
        expect(control.state.value).to.equal(0);
    });

    it('should throw on invalid setState of state.value', () => {
        expect(() => control.setState({ value: 2 })).to.throw();
    });

    it('should cache controller hardware state', () => {
        control.setState({ value: 0 });
        const mock = sinon.mock(session.midiOut);
        mock.expects('sendMidi').once();
        control.setState({ value: 1 });
        control.setState({ value: 1 });
        mock.verify();
    });

    it('should skip render in certain situations', () => {
        control.enableMidiOut = false;
        expect(control.render()).to.equal(false);
        control.enableMidiOut = true;

        const getOutput = TestControl.prototype.getOutput;
        delete TestControl.prototype.getOutput;
        expect(control.render()).to.equal(false);
        TestControl.prototype.getOutput = getOutput;

        expect(control.render()).to.equal(true);
    });
});
