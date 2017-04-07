import { AbstractButton } from 'taktil';

import store from 'store';


export default class LayoutButton extends AbstractButton<{ layout: string }> {
    onInit() {
        store.application.panelLayout().addValueObserver(layout => {
            this.setState({ ...this.state, on: layout === this.options.layout });
        });
    }

    onPress() {
        store.application.setPanelLayout(this.options.layout);
    }
}
