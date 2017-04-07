import { AbstractButton } from 'taktil';

import store from 'store';


export default class ActionButton extends AbstractButton<{ action: string }> {
    application = store.application;

    onPress() {
        this.setState({ on: true });
        this.application[this.options.action]();
    }

    onRelease() {
        this.setState({ on: false });
    }
}
