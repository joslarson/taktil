import { Component, ComponentState, ComponentOptions } from './Component';
import { Control } from '../control';
import { ControlState } from '../control/Control';

export type ButtonOptions = ComponentOptions;
export interface ButtonState extends ComponentState {
    on: boolean;
    color?: { r: number; g: number; b: number };
}

/**
 * A button component providing method hooks for press, long press,
 * double press, release, and double release events.
 */
export abstract class Button<
    Options extends ButtonOptions = ButtonOptions,
    State extends ButtonState = ButtonState
> extends Component<Options, State> {
    state: State = { on: false } as State;
    memory: { [key: string]: any } = {};

    LONG_PRESS_DELAY = 350;
    DOUBLE_PRESS_DELAY = 350;

    onPress?(): void;
    onLongPress?(): void;
    onDoublePress?(): void;
    onRelease?(): void;
    onDoubleRelease?(): void;

    onInput(input: ControlState) {
        if (this.onPress) this.handlePress(input.value);
        if (this.onLongPress) this.handleLongPress(input.value);
        if (this.onDoublePress) this.handleDoublePress(input.value);
        if (this.onRelease) this.handleRelease(input.value);
        if (this.onDoubleRelease) this.handleDoubleRelease(input.value);
    }

    getOutput(): ControlState {
        const { on, color } = this.state;
        return {
            value: on ? this.control.maxValue : this.control.minValue,
            ...color && { color },
        };
    }

    isPress(value: number) {
        return value > this.control.minValue;
    }

    isRelease(value: number) {
        return value === this.control.minValue;
    }

    isDoublePress(value: number) {
        return this.memory['doublePress'] && this.isPress(value);
    }

    isDoubleRelease(value: number) {
        return this.memory['doubleRelease'] && this.isRelease(value);
    }

    handlePress(value: number) {
        // if it's not a press or is a doublePress, ignore it
        if (!this.isPress(value) || this.memory['doublePress']) return;
        // handle single press
        if (this.onPress) this.onPress();
    }

    handleDoublePress(value: number) {
        // if it's not a press or not implemented, ignore it
        if (!this.isPress(value)) return;

        // if is doublePress
        if (this.isDoublePress(value)) {
            if (this.onDoublePress) this.onDoublePress();
        } else {
            // setup interval task to remove self after this.DOUBLE_PRESS_DELAY
            this.memory['doublePress'] = setTimeout(() => {
                delete this.memory['doublePress'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }

    handleLongPress(value: number) {
        // if it's a doublePress or is not implemented, ignore it
        if (this.isDoublePress(value)) return;

        // if it's a press schedule the callback
        if (this.isPress(value)) {
            // schedule long press callback
            this.memory['longPress'] = setTimeout(() => {
                if (this.onLongPress) this.onLongPress();
            }, this.LONG_PRESS_DELAY);
        } else if (this.memory['longPress']) {
            // cancel scheduled long press callback if button released too early
            clearTimeout(this.memory['longPress']);
            delete this.memory['longPress'];
        }
    }

    handleRelease(value: number) {
        // if it's not a release, not implemented or is a doubleRelease, ignore it
        if (!this.isRelease(value) || this.memory['doubleRelease']) return;
        // handle single release
        if (this.onRelease) this.onRelease();
    }

    handleDoubleRelease(value: number) {
        // if it's not a release or not implemented, ignore it
        if (!this.isRelease(value)) return;

        // if is doubleRelease
        if (this.isDoubleRelease(value) && this.onDoubleRelease) {
            this.onDoubleRelease();
        } else {
            // setup timeout task to remove self after this.DOUBLE_PRESS_DELAY
            this.memory['doubleRelease'] = setTimeout(() => {
                delete this.memory['doubleRelease'];
            }, this.DOUBLE_PRESS_DELAY);
        }
    }
}
