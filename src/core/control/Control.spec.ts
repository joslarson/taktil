import '../../env';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Control } from './Control';
import { MidiMessage, SysexMessage } from '../midi/';
import { Button } from '../component/Button';

type TestControlState = { value: number; nested: { value: number } };

class TestControl extends Control<TestControlState> {
    state = { value: this.maxValue, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }

    getMidiOutput(state: TestControlState) {
        return [
            new MidiMessage({
                status: 0xb0,
                data1: 0x1f,
                data2: this.state.value || this.maxValue,
            }),
        ];
    }
}

class TestComponent extends Button {
    state = { on: false };
}

describe('Control', () => {
    const control = new TestControl({ patterns: ['B01F??'] });
    const component = new TestComponent(control, {});

    it('should initialize state correctly', () => {
        expect(control.state).to.deep.equal({ value: control.maxValue, nested: { value: 0 } });
    });

    it('should modify state correctly', () => {
        control.setState({ nested: { value: control.maxValue } }); // receives partial state
        expect(control.state).to.deep.equal({ value: control.maxValue, nested: { value: 1 } });
    });

    it('should maintain its initial state', () => {
        expect(control.defaultState).to.deep.equal({
            value: control.maxValue,
            nested: { value: 0 },
        });
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
        expect(() => control.setState({ value: 128 })).to.throw();
    });

    it('should cache controller hardware state', () => {
        control.setState({ value: 0 });
        const mock = sinon.mock(session.midiOut);
        mock.expects('sendMidi').once();
        control.setState({ value: control.maxValue });
        control.setState({ value: control.maxValue });
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
