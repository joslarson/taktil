import { Control, ControlState } from '../control/Control';
import { SimpleControl } from '../control/SimpleControl';
import { Component, ComponentState, ComponentParams } from './Component';

describe('Component', () => {
    const control = new SimpleControl({ status: 0xb0, data1: 21 });

    type Params = ComponentParams;
    interface State extends ComponentState {
        value: number;
        foo: { bar: number };
    }

    class TestComponent extends Component<Params, State> {
        state: State = { value: control.minValue, foo: { bar: 0 } };

        getControlOutput(): ControlState {
            return { value: this.state.value };
        }

        onControlInput({ value }: ControlState) {
            this.setState({ value });
        }
    }

    const component = new TestComponent(control, 'MY_MODE', {});

    it('should initialize state correctly', () => {
        expect(component.state).toEqual({ value: control.minValue, foo: { bar: 0 } });
    });

    it('should modify state correctly', () => {
        component.setState({ value: control.maxValue }); // receives partial state
        expect(component.state).toEqual({ value: control.maxValue, foo: { bar: 0 } });
    });

    it('should set the control correctly', () => {
        expect(component.control).toBe(control);
    });

    it('should set the mode correctly', () => {
        expect(component.mode).toBe('MY_MODE');
    });
});
