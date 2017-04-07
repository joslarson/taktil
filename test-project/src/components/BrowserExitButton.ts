import { AbstractButton } from 'taktil';

import store from 'store';


export default class BrowserExitButton extends AbstractButton {
    onPress() {
        if (store.popupBrowser.exists().get()) store.popupBrowser.cancel();
    }
}
