import '../../env';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Control, ControlState } from '../control/Control';
import { SimpleControl } from '../control/SimpleControl';
import { Component, ComponentState, ComponentOptions } from './Component';

describe('Component', () => {
    const control = new SimpleControl({ status: 0xb0, data1: 21 });

    type Options = ComponentOptions;
    interface State extends ComponentState {
        value: number;
        foo: { bar: number };
    }

    class TestComponent extends Component<Options, State> {
        state: State = { value: control.minValue, foo: { bar: 0 } };

        getOutput(): ControlState {
            return { value: this.state.value };
        }

        onInput({ value }: ControlState) {
            this.setState({ value });
        }
    }

    const component = new TestComponent(control, 'MY_MODE', {});

    it('should initialize state correctly', () => {
        expect(component.state).to.deep.equal({ value: control.minValue, foo: { bar: 0 } });
    });

    it('should modify state correctly', () => {
        component.setState({ value: control.maxValue }); // receives partial state
        expect(component.state).to.deep.equal({ value: control.maxValue, foo: { bar: 0 } });
    });

    it('should set the control correctly', () => {
        expect(component.control).to.equal(control);
    });

    it('should set the mode correctly', () => {
        expect(component.mode).to.equal('MY_MODE');
    });
});
