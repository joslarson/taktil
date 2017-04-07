import { AbstractButton, AbstractSimpleControl, Color } from 'taktil';

import store from 'store';


export default class TrackBankNavigationButton extends AbstractButton<{ index: number }, { on: boolean, color?: Color, exists: boolean }> {
    getInitialState() {
        return { on: false, exists: false };
    }

    getControlOutput(control: AbstractSimpleControl) {
        const { on, exists, color } = this.state;
        return {
            value: on ? 1 : 0,
            disabled: !exists,
            ...(color === undefined ? {} : { color }),
        };
    }

    onInit() {
        store.trackBank.channelCount().addValueObserver(channelCount => {
            const navBankCount = Math.round(channelCount / 8);
            this.setState({ exists: this.options.index < navBankCount })
        });
        store.trackBank.channelScrollPosition().addValueObserver(position => {
            const channelCount = store.trackBank.channelCount().get();
            const lastStart = channelCount - 8;
            const isLastGroup = this.options.index * 8 >= lastStart;
            const target = this.options.index * 8;
            this.setState({ on: position === target || isLastGroup && position === lastStart });
        });
    }

    onPress() {
        if (this.state.exists && !this.state.on) {
            store.trackBank.channelScrollPosition().set(this.options.index * 8);
            store.trackBank.getChannel(0).selectInEditor();
        }
    }
}
