import { Control, ControlState } from '../control';
import { Component, ComponentState, ComponentParams } from './Component';

describe('Component', () => {
    const control = new Control({ patterns: [{ status: 0xb0, data1: 21 }], enableMidiOut: false });

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

        onActivate() {}

        onDeactivate() {}
    }

    const component = new TestComponent(control, { mode: 'MY_MODE' });

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
        expect(component.params.mode).toBe('MY_MODE');
    });

    it('should call activate when component is activated', () => {
        const onActivate = jest.spyOn(component, 'onActivate');
        const onDeactivate = jest.spyOn(component, 'onDeactivate');
        expect(onActivate).toHaveBeenCalledTimes(0);
        expect(onDeactivate).toHaveBeenCalledTimes(0);
        control.activeComponent = component;
        control.activeComponent = null;
        expect(onActivate).toHaveBeenCalledTimes(1);
        expect(onDeactivate).toHaveBeenCalledTimes(1);
    });
});
