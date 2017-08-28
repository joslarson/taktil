import { session } from '../../taktil';
import { Control } from './Control';
import { MidiMessage, SysexMessage } from '../midi/';
import { Button } from '../component/Button';

type TestControlState = { value: number; nested: { value: number } };

class TestControl extends Control<TestControlState> {
    state = { value: 127, nested: { value: 0 } };

    getInput(message: MidiMessage | SysexMessage) {
        return { ...this.state };
    }

    getMidiOutput({ value }: TestControlState) {
        return [
            new MidiMessage({
                status: 0xb0,
                data1: 0x1f,
                data2: value,
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
        expect(control.state).toEqual({ value: 127, nested: { value: 0 } });
    });

    it('should modify state correctly', () => {
        control.setState({ nested: { value: 1 } }); // receives partial state
        expect(control.state).toEqual({ value: 127, nested: { value: 1 } });
    });

    it('should maintain its initial state', () => {
        expect(control.defaultState).toEqual({
            value: 127,
            nested: { value: 0 },
        });
    });

    it('should set active component correctly', () => {
        // should be initialized as null
        expect(control.activeComponent).toBe(null);
        control.activeComponent = component;
        expect(control.activeComponent).toBe(component);
        // state.value should have been changed to 0 because of initial
        // component state
        expect(control.state.value).toBe(0);
    });

    it('should throw on invalid setState of state.value', () => {
        expect(() => control.setState({ value: 128 })).toThrow();
    });

    it('should cache controller hardware state', () => {
        control.setState({ value: 0 });
        const spy = jest.spyOn(session.midiOut, 'sendMidi');
        control.setState({ value: 127 });
        control.setState({ value: 127 });
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should skip render in certain situations', () => {
        control.enableMidiOut = false;
        expect(control.render()).toBe(false);
        control.enableMidiOut = true;

        const getOutput = TestControl.prototype.getMidiOutput;
        delete TestControl.prototype.getMidiOutput;
        expect(control.render()).toBe(false);
        TestControl.prototype.getMidiOutput = getOutput;

        expect(control.render()).toBe(true);
    });
});
