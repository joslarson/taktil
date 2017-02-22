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