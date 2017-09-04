import { Range } from './Range';
import { Control, ControlState } from '../control';

class TestRange extends Range {
    onControlInput({ value, ...rest }: ControlState) {
        super.onControlInput({ value, ...rest });
        this.setState({ value });
    }
}

describe('Range', () => {
    const control = new Control({ patterns: [{ status: 0xb0, data1: 21 }] });
    const range = new TestRange(control, 'MY_MODE', {});

    // if active component is not set, getOutput will not be called
    (control as any)._activeComponent = range;

    jest.useFakeTimers();
    const getOutput = jest.spyOn(range, 'getControlOutput');

    it('should not render until after the input timer runs out', () => {
        range.onControlInput({ value: control.maxValue });
        range.onControlInput({ value: control.minValue });
        jest.runTimersToTime(range.INPUT_DELAY - 1);

        expect(getOutput).not.toHaveBeenCalled();

        jest.runTimersToTime(1);

        expect(getOutput).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
        getOutput.mockRestore();
    });
});
