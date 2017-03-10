import { AbstractButton } from 'taktil';

import bitwig from 'apistore';


export class ToggleBrowser extends AbstractButton {
    onRegister() {
        bitwig.popupBrowser.exists().addValueObserver(browserExists => {
            this.setState({ ...this.state, on: browserExists });
        });
    }

    onPress() {
        if (bitwig.popupBrowser.exists().get()) {
            bitwig.popupBrowser.cancel();
        } else {
            bitwig.cursorTrack.browseToInsertAtEndOfChain();
        }
    }
}


export class BrowserExitButton extends AbstractButton {
    onPress() {
        if (bitwig.popupBrowser.exists().get()) bitwig.popupBrowser.cancel();
    }
}
