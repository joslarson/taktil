import { AbstractGateButton } from '../../core/component';
import session from '../../session';


export abstract class AbstractModeGate extends AbstractGateButton {
    abstract mode: string;

    onPress() {
        session.activateMode(this.mode);
    }

    onRelease() {
        session.deactivateMode(this.mode);
    }
}