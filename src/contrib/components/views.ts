import { AbstractButton } from '../../core/component';
import { AbstractView } from '../../core/view';
import session from '../../session';


export abstract class AbstractViewButton extends AbstractButton {
    abstract View: typeof AbstractView;

    onRegister() {
        session.on('activateView', (View: typeof AbstractView) => {
            this.setState({ ...this.state, on: View === this.View });
        });
    }

    onPress() {
        session.activeView = this.View;
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
