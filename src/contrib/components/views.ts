import { AbstractButton } from '../../core/component';
import { AbstractView } from '../../core/view';
import { AbstractControl } from '../../core/control';
import session from '../../session';


export class ViewToggle extends AbstractButton<{ view: typeof AbstractView }> {
    onInit() {
        session.on('activateView', (view: typeof AbstractView) => {
            this.setState({ ...this.state, on: view === this.options.view });
        });
    }

    onPress() {
        if (session.activeView === this.options.view && this.options.view.parent) {
            session.activeView = this.options.view.parent;
        } else {
            session.activeView = this.options.view;
        }
    }
}

export class ModeGate extends AbstractButton<{ mode: string }> {
    onPress() {
        this.setState({ ...this.state, on: true });
        session.activateMode(this.options.mode);
    }

    onRelease() {
        this.setState({ ...this.state, on: false });
        session.deactivateMode(this.options.mode);
    }
}
