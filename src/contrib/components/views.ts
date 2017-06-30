import { Button } from '../../core/component';
import { View } from '../../core/view';

export class ViewToggle extends Button<{ view: typeof View }> {
    onInit() {
        session.on('activateView', (view: typeof View) => {
            this.setState({ on: view === this.props.view });
        });
    }

    onPress() {
        if (session.activeView === this.props.view && this.props.view.parent) {
            session.activateView(this.props.view.parent);
        } else {
            session.activateView(this.props.view);
        }
    }
}

export class ModeGate extends Button<{ mode: string }> {
    onPress() {
        this.setState({ on: true });
        session.activateMode(this.props.mode);
    }

    onRelease() {
        this.setState({ on: false });
        session.deactivateMode(this.props.mode);
    }
}
