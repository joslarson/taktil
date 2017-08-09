import '../../env';
import { expect } from 'chai';
import * as sinon from 'sinon';

import Button from './Button';
import { MidiMessage, SysexMessage } from '../midi/';
import SimpleControl from '../control/SimpleControl';

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
    const control = new SimpleControl({ status: 0xb0, data1: 21 });
    const button = new TestButton(control);

    const clock = sinon.useFakeTimers();
    const onPress = sinon.spy(button, 'onPress');
    const onDoublePress = sinon.spy(button, 'onDoublePress');
    const onRelease = sinon.spy(button, 'onRelease');
    const onDoubleRelease = sinon.spy(button, 'onDoubleRelease');
    const onLongPress = sinon.spy(button, 'onLongPress');

    it('should handle single and double press/release events', () => {
        clock.tick(350); // memory reset

        onPress.reset();
        onDoublePress.reset();
        onRelease.reset();
        onDoubleRelease.reset();

        // double press/release
        button.onInput(control, { value: 1 });
        clock.tick(50);
        button.onInput(control, { value: 0 });
        clock.tick(100);
        button.onInput(control, { value: 1 });
        clock.tick(50);
        button.onInput(control, { value: 0 });
        clock.tick(50);

        expect(onPress.calledOnce).to.be.true;
        expect(onDoublePress.calledOnce).to.be.true;
        expect(onRelease.calledOnce).to.be.true;
        expect(onDoubleRelease.calledOnce).to.be.true;
    });

    it('should handle long press event', () => {
        clock.tick(350); // memory reset

        onPress.reset();
        onLongPress.reset();

        // long press
        button.onInput(control, { value: 1 });
        clock.tick(350);
        button.onInput(control, { value: 0 });

        expect(onPress.calledOnce).to.be.true;
        expect(onLongPress.calledOnce).to.be.true;
    });

    after(() => {
        clock.restore();
        onPress.restore();
        onDoublePress.restore();
        onRelease.restore();
        onDoubleRelease.restore();
        onLongPress.restore();
    });
});
