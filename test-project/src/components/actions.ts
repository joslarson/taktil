import { AbstractButton } from 'taktil';

import store from 'store';


export abstract class AbstractActionButton extends AbstractButton {
    application = store.application;
    abstract action: string;

    onPress() {
        this.setState({ ...this.state, on: true });
        this.application[this.action]();
    }

    onRelease() {
        this.setState({ ...this.state, on: false });
    }
}

export class UndoButton extends AbstractActionButton {
    action = 'undo';
}


export class RedoButton extends AbstractActionButton {
    action = 'redo';
}


export class CopyButton extends AbstractActionButton {
    action = 'copy';
}

export class PasteButton extends AbstractActionButton {
    action = 'paste';
}

export class DeleteButton extends AbstractActionButton {
    action = 'delete';
}

export abstract class AbstractLayoutButton extends AbstractButton {
    abstract layout: string;

    onRegister() {
        store.application.panelLayout().addValueObserver(layout => {
            this.setState({ ...this.state, on: layout === this.layout });
        });
    }

    onPress() {
        store.application.setPanelLayout(this.layout);
    }
}

export class MixLayoutButton extends AbstractLayoutButton {
    layout = 'MIX';
}

export class ArrangeLayoutButton extends AbstractLayoutButton {
    layout = 'ARRANGE';
}

export class EditLayoutButton extends AbstractLayoutButton {
    layout = 'EDIT';
}