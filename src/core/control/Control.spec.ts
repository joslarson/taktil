import '../../env';  // adds session instance to global scope
import { expect } from 'chai';
import * as sinon from 'sinon';``

import Control from './Control';
import { MidiMessage, SysexMessage } from '../midi/';
import Button from '../component/Button';


type TestControlState = { value: number, nested: { value: number } };

class TestControl extends Control<TestControlState> {
    state = { value: 1, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }

    getMidiOutput(state: TestControlState) {
        return [
            new MidiMessage({
                status: 0xB0, data1: 0x1F, data2: this.state.value || 127,
            })
        ]
    }
}

class TestComponent extends Button {
    state = { on: false };
}

describe('Control', () => {
    const control = new TestControl({ patterns: ["B01F??"] });
    const component = new TestComponent(control, {});

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

        const getOutput = TestControl.prototype.getMidiOutput;
        delete TestControl.prototype.getMidiOutput;
        expect(control.render()).to.equal(false);
        TestControl.prototype.getMidiOutput = getOutput;

        expect(control.render()).to.equal(true);
    });
});
