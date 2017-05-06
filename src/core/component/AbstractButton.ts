import AbstractComponent from './AbstractComponent';
import { AbstractComponentBaseState, AbstractComponentBaseProps } from './AbstractComponent';
import { AbstractControl } from '../control';
import { AbstractControlBaseState } from '../control/AbstractControl';


export type AbstractButtonBaseProps = AbstractComponentBaseProps;
export interface AbstractButtonBaseState extends AbstractComponentBaseState {
    on: boolean;
    color?: { r: number, g: number, b: number };
};

/**
 * A button component providing method hooks for press, long press,
 * double press, release, and double release events.
 */
abstract class AbstractButton<
    Props extends AbstractButtonBaseProps = AbstractButtonBaseProps,
    State extends AbstractButtonBaseState = AbstractButtonBaseState
> extends AbstractComponent<Props, State> {
    state: State = { on: false } as State;
    memory: { [key: string]: any } = {};

    LONG_PRESS_DELAY = 350;
    DOUBLE_PRESS_DELAY = 350;

    getControlOutput(control: AbstractControl): object {
        const { on, color } = this.state;
        return {
            value: on ? 1 : 0,
            ...(color && { color }),
        };
    }

    onPress?(): void;
    onLongPress?(): void;
    onDoublePress?(): void;
    onRelease?(): void;
    onDoubleRelease?(): void;

    onControlInput(control: AbstractControl, input: AbstractControlBaseState) {
        if (this.onPress) this.handlePress(input.value);
        if (this.onLongPress) this.handleLongPress(input.value);
        if (this.onDoublePress) this.handleDoublePress(input.value);
        if (this.onRelease) this.handleRelease(input.value);
        if (this.onDoubleRelease) this.handleDoubleRelease(input.value);
    }

    isPress(value: number) {
        return value > 0;
    }

    isRelease(value: number) {
        return value === 0;
    }

    isDoublePress(value: number) {
        return this.memory['doublePress'] && this.isPress(value);
    }

    isDoubleRelease(value: number) {
        return this.memory['doubleRelease'] && this.isRelease(value);
    }

    handlePress(value: number) {
        // if it's not a press, not implemented or is a doublePress, ignore it
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
            // setup interval task to remove self after DOUBLE_PRESS_DURATION
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
            // schedule callback
            this.memory['longPress'] = setTimeout(() => {
                if (this.onLongPress) this.onLongPress();
            }, this.LONG_PRESS_DELAY);
        } else { // otherwise cancel existing scheduled callback
            // cancel longPress task if button released too early
            if (this.memory['longPress']) {
                clearTimeout(this.memory['longPress']);
                delete this.memory['longPress'];
            };
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


export default AbstractButton;