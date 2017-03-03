import { AbstractButton } from 'typewig';

import bitwig from 'apistore';


export abstract class ActionButton extends AbstractButton {
    application = bitwig.application;
    abstract action: string;

    onPress() {
        this.setState({ ...this.state, on: true });
        this.application[this.action]();
    }

    onRelease() {
        this.setState({ ...this.state, on: false });
    }
}

export class UndoButton extends ActionButton {
    action = 'undo';
}


export class RedoButton extends ActionButton {
    action = 'redo';
}


export class CopyButton extends ActionButton {
    action = 'copy';
}

export class PasteButton extends ActionButton {
    action = 'paste';
}

export class DeleteButton extends ActionButton {
    action = 'delete';
}

export abstract class LayoutButton extends AbstractButton {
    abstract layout: string;

    onRegister() {
        bitwig.application.panelLayout().addValueObserver(layout => {
            this.setState({ ...this.state, on: layout === this.layout });
        });
    }

    onPress() {
        bitwig.application.setPanelLayout(this.layout);
    }
}

export class MixLayoutButton extends LayoutButton {
    layout = 'MIX';
}

export class ArrangeLayoutButton extends LayoutButton {
    layout = 'ARRANGE';
}

export class EditLayoutButton extends LayoutButton {
    layout = 'EDIT';
}