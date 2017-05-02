import { AbstractButton } from '../../core/component';
import { AbstractView } from '../../core/view';
import { AbstractControl } from '../../core/control';
import session from '../../session';


export class ViewToggle extends AbstractButton<{ view: typeof AbstractView }> {
    onInit() {
        session.on('activateView', (view: typeof AbstractView) => {
            this.setState({ on: view === this.props.view });
        });
    }

    onPress() {
        if (session.activeView === this.props.view && this.props.view.parent) {
            session.activeView = this.props.view.parent;
        } else {
            session.activeView = this.props.view;
        }
    }
}

export class ModeGate extends AbstractButton<{ mode: string }> {
    onPress() {
        this.setState({ on: true });
        session.activateMode(this.props.mode);
    }

    onRelease() {
        this.setState({ on: false });
        session.deactivateMode(this.props.mode);
    }
}
