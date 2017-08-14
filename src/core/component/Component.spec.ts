import '../../env';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Control, ControlState } from '../control/Control';
import { SimpleControl } from '../control/SimpleControl';
import { Component, ComponentState, ComponentProps } from './Component';

const control = new SimpleControl({ status: 0xb0, data1: 21 });

type Props = ComponentProps;
interface State extends ComponentState {
    value: number;
    foo: { bar: number };
}

class TestComponent extends Component<Props, State> {
    state: State = { value: control.minValue, foo: { bar: 0 } };

    getOutput(control: Control): ControlState {
        return { value: this.state.value };
    }

    onInput(control: Control, { value }: ControlState) {
        this.setState({ value });
    }
}

const component = new TestComponent(control, {});

describe('Component', () => {
    it('should initialize state correctly', () => {
        expect(component.state).to.deep.equal({ value: control.minValue, foo: { bar: 0 } });
    });

    it('should modify state correctly', () => {
        component.setState({ value: control.maxValue }); // receives partial state
        expect(component.state).to.deep.equal({ value: control.maxValue, foo: { bar: 0 } });
    });
});
