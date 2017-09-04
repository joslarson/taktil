import { Button } from './Button';
import { Control } from '../control';

class TestButton extends Button {
    onPress() {
        // ...
    }

    onLongPress() {
        // ...
    }

    onDoublePress() {
        // ...
    }

    onRelease() {
        // ...
    }

    onDoubleRelease() {
        // ...
    }
}

describe('Button', () => {
    jest.useFakeTimers();

    const control = new Control({ patterns: [{ status: 0xb0, data1: 21 }] });
    const button = new TestButton(control, {});

    const onPress = jest.spyOn(button, 'onPress');
    const onDoublePress = jest.spyOn(button, 'onDoublePress');
    const onRelease = jest.spyOn(button, 'onRelease');
    const onDoubleRelease = jest.spyOn(button, 'onDoubleRelease');
    const onLongPress = jest.spyOn(button, 'onLongPress');

    it('correctly identifies press and release input', () => {
        expect(button.isPress(control.minValue)).toBe(false);
        expect(button.isPress(control.minValue + 1)).toBe(true);
    });

    it('should handle single and double press/release events', () => {
        jest.runTimersToTime(350); // memory reset

        onPress.mockReset();
        onDoublePress.mockReset();
        onRelease.mockReset();
        onDoubleRelease.mockReset();

        // double press/release
        button.onControlInput({ value: control.maxValue });
        jest.runTimersToTime(50);
        button.onControlInput({ value: control.minValue });
        jest.runTimersToTime(100);
        button.onControlInput({ value: control.maxValue });
        jest.runTimersToTime(50);
        button.onControlInput({ value: control.minValue });
        jest.runTimersToTime(50);

        expect(onPress).toHaveBeenCalledTimes(1);
        expect(onDoublePress).toHaveBeenCalledTimes(1);
        expect(onRelease).toHaveBeenCalledTimes(1);
        expect(onDoubleRelease).toHaveBeenCalledTimes(1);
    });

    it('should handle long press event', () => {
        jest.runTimersToTime(350); // memory reset

        onPress.mockReset();
        onLongPress.mockReset();

        // long press
        button.onControlInput({ value: control.maxValue });
        jest.runTimersToTime(350);
        button.onControlInput({ value: control.minValue });

        expect(onPress).toHaveBeenCalledTimes(1);
        expect(onLongPress).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
        onPress.mockRestore();
        onDoublePress.mockRestore();
        onRelease.mockRestore();
        onDoubleRelease.mockRestore();
        onLongPress.mockRestore();
    });
});
