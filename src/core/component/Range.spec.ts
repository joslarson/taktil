import { SimpleControl } from '../control/SimpleControl';
import { Range } from './Range';
import { ControlState } from '../control/Control';

class TestRange extends Range {
    onInput({ value, ...rest }: ControlState) {
        super.onInput({ value, ...rest });
        this.setState({ value });
    }
}

describe('Range', () => {
    const control = new SimpleControl({ status: 0xb0, data1: 21 });
    const range = new TestRange(control, 'MY_MODE', {});

    // if active component is not set, getOutput will not be called
    (control as any)._activeComponent = range;

    jest.useFakeTimers();
    const getOutput = jest.spyOn(range, 'getOutput');

    it('should not render until after the input timer runs out', () => {
        range.onInput({ value: control.maxValue });
        range.onInput({ value: control.minValue });
        jest.runTimersToTime(range.INPUT_DELAY - 1);

        expect(getOutput).not.toHaveBeenCalled();

        jest.runTimersToTime(1);

        expect(getOutput).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
        getOutput.mockRestore();
    });
});
