import { Component, ComponentState, ComponentProps } from './Component';
import { Control } from '../control';
import { ControlState } from '../control/Control';

export type ButtonProps = ComponentProps;
export interface ButtonState extends ComponentState {
    on: boolean;
    color?: { r: number; g: number; b: number };
}

/**
 * A button component providing method hooks for press, long press,
 * double press, release, and double release events.
 */
export abstract class Button<
    Props extends ButtonProps = ButtonProps,
    State extends ButtonState = ButtonState
> extends Component<Props, State> {
    state: State = { on: false } as State;
    memory: { [key: string]: any } = {};

    LONG_PRESS_DELAY = 350;
    DOUBLE_PRESS_DELAY = 350;

    onPress?(): void;
    onLongPress?(): void;
    onDoublePress?(): void;
    onRelease?(): void;
    onDoubleRelease?(): void;

    onInput(control: Control, input: ControlState) {
        if (this.onPress) this.handlePress(control, input.value);
        if (this.onLongPress) this.handleLongPress(control, input.value);
        if (this.onDoublePress) this.handleDoublePress(control, input.value);
        if (this.onRelease) this.handleRelease(control, input.value);
        if (this.onDoubleRelease) this.handleDoubleRelease(control, input.value);
    }

    getOutput(control: Control): ControlState {
        const { on, color } = this.state;
        return {
            value: on ? control.maxValue : control.minValue,
            ...color && { color },
        };
    }

    isPress(control: Control, value: number) {
        return value > control.minValue;
    }

    isRelease(control: Control, value: number) {
        return value === control.minValue;
    }

    isDoublePress(control: Control, value: number) {
        return this.memory['doublePress'] && this.isPress(control, value);
    }

    isDoubleRelease(control: Control, value: number) {
        return this.memory['doubleRelease'] && this.isRelease(control, value);
    }

    handlePress(control: Control, value: number) {
        // if it's not a press, not implemented or is a doublePress, ignore it
        if (!this.isPress(control, value) || this.memory['doublePress']) return;
        // handle single press
        if (this.onPress) this.onPress();
    }

    handleDoublePress(control: Control, value: number) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(control, value)) return;

        // if is doublePress
        if (this.isDoublePress(control, value)) {
            if (this.onDoublePress) this.onDoublePress();
        } else {
            // setup interval task to remove self after this.DOUBLE_PRESS_DELAY
            this.memory['doublePress'] = setTimeout(() => {
                delete this.memory['doublePress'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }

    handleLongPress(control: Control, value: number) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(control, value)) return;

        // if it's a press schedule the callback
        if (this.isPress(control, value)) {
            // schedule callback
            this.memory['longPress'] = setTimeout(() => {
                if (this.onLongPress) this.onLongPress();
            }, this.LONG_PRESS_DELAY);
        } else {
            // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) {
                clearTimeout(this.memory['longPress']);
                delete this.memory['longPress'];
            }
        }
    }

    handleRelease(control: Control, value: number) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(control, value) || this.memory['doubleRelease']) return;
        // handle single release
        if (this.onRelease) this.onRelease();
    }

    handleDoubleRelease(control: Control, value: number) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(control, value)) return;

        // if is doubleRelease
        if (this.isDoubleRelease(control, value) && this.onDoubleRelease) {
            this.onDoubleRelease();
        } else {
            // setup timeout task to remove self after this.DOUBLE_PRESS_DELAY
            this.memory['doubleRelease'] = setTimeout(() => {
                delete this.memory['doubleRelease'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }
}
