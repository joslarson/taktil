import { expect } from 'chai';
import * as sinon from 'sinon';

import AbstractComponent from './AbstractComponent';
import AbstractControl from '../control/AbstractControl';
import { AbstractControlBaseState } from '../control/AbstractControl';
import SimpleControl from '../control/SimpleControl';
import { AbstractComponentBaseState, AbstractComponentBaseProps } from './AbstractComponent';


type Props = AbstractComponentBaseProps;
interface State extends AbstractComponentBaseState {
    value: number;
    foo: { bar: number };
}

class Component extends AbstractComponent<Props, State> {
    state: State = { value: 0, foo: { bar: 0 } };

    getOutput(control: AbstractControl): AbstractControlBaseState {
        return { value: this.state.value };
    }

    onInput(control: AbstractControl, input: AbstractControlBaseState) {
        this.setState({ value: input.value });
    }
}

const component = new Component(
    new SimpleControl({ status: 0xB0, data1: 21 }), {});

describe('AbstractComponent', () => {
    it('should initialize state correctly', () => {
        expect(component.state).to.deep.equal({ value: 0, foo: { bar: 0 } });
    });

    it('should modify state correctly', () => {
        component.setState({ value: 1 });  // receives partial state
        expect(component.state).to.deep.equal({ value: 1, foo: { bar: 0 } });
    });

    it('should maintain its initial state', () => {
        expect(component.initialState).to.deep.equal({ value: 0, foo: { bar: 0 } });
    });
});
