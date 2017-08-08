import { expect } from 'chai';
import * as sinon from 'sinon';

import { default as Control, ControlBaseState } from '../control/Control';
import SimpleControl from '../control/SimpleControl';
import { default as Component, ComponentBaseState, ComponentBaseProps } from './Component';

type Props = ComponentBaseProps;
interface State extends ComponentBaseState {
    value: number;
    foo: { bar: number };
}

class TestComponent extends Component<Props, State> {
    state: State = { value: 0, foo: { bar: 0 } };

    getOutput(control: Control): ControlBaseState {
        return { value: this.state.value };
    }

    onInput(control: Control, input: ControlBaseState) {
        this.setState({ value: input.value });
    }
}

const component = new TestComponent(new SimpleControl({ status: 0xb0, data1: 21 }), {});

describe('Component', () => {
    it('should initialize state correctly', () => {
        expect(component.state).to.deep.equal({ value: 0, foo: { bar: 0 } });
    });

    it('should modify state correctly', () => {
        component.setState({ value: 1 }); // receives partial state
        expect(component.state).to.deep.equal({ value: 1, foo: { bar: 0 } });
    });
});
