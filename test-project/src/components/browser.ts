import { AbstractButton } from 'taktil';

import store from 'store';


export class ToggleBrowser extends AbstractButton {
    onRegister() {
        store.popupBrowser.exists().addValueObserver(browserExists => {
            this.setState({ ...this.state, on: browserExists });
        });
    }

    onPress() {
        if (store.popupBrowser.exists().get()) {
            store.popupBrowser.cancel();
        } else {
            store.cursorTrack.browseToInsertAtEndOfChain();
        }
    }
}


export class BrowserExitButton extends AbstractButton {
    onPress() {
        if (store.popupBrowser.exists().get()) store.popupBrowser.cancel();
    }
}
