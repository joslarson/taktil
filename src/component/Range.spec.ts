import { Range } from './Range';
import { Control, ControlState } from '../control';
import { Session } from '../session';

class TestRange extends Range {
    onControlInput({ value, ...rest }: ControlState) {
        super.onControlInput({ value, ...rest });
        this.setState({ value });
    }
}

describe('Range', () => {
    const session = new Session();
    const control = new Control({ patterns: [{ status: 0xb0, data1: 21 }] });
    session.registerControls({ TEST: control });
    const range = new TestRange(control, { mode: 'MY_MODE' });

    // if active component is not set, getOutput will not be called
    control.activeComponent = range;

    jest.useFakeTimers();
    const getOutput = jest.spyOn(range, 'getControlOutput');

    it('should not render while receiving input', () => {
        range.onControlInput({ value: control.maxValue });
        range.setState({ value: control.minValue });
        jest.runTimersToTime(range.INPUT_DELAY);
        expect(getOutput).not.toHaveBeenCalled();

        range.setState({ value: control.minValue });
        expect(getOutput).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
        getOutput.mockRestore();
    });
});
