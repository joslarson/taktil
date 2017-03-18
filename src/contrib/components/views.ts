import { AbstractButton } from '../../core/component';
import { AbstractView } from '../../core/view';
import session from '../../session';


export abstract class AbstractViewButton extends AbstractButton {
    abstract view: typeof AbstractView;

    onRegister() {
        session.on('activateView', (view: typeof AbstractView) => {
            this.setState({ ...this.state, on: view === this.view });
        });
    }

    onPress() {
        if (session.activeView === this.view && this.view.parent) {
            session.activeView = this.view.parent;
        } else {
            session.activeView = this.view;
        }
    }
}

export abstract class AbstractModeGate extends AbstractButton {
    abstract mode: string;

    onPress() {
        this.setState({ ...this.state, on: true });
        session.activateMode(this.mode);
    }

    onRelease() {
        this.setState({ ...this.state, on: false });
        session.deactivateMode(this.mode);
    }
}
