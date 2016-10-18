import AbstractComponent from './AbstractComponent';
import View from '../view/View';
import Control from '../device/Control';
import Midi from '../../helpers/Midi';


export default class ComponentSet extends AbstractComponent {
    componentMap: { [key: string]: AbstractComponent } = {};
    createComponent: (index) => AbstractComponent;

    register(controls: Control[], view: View) {
        super.register(controls, view);

        for (let i = 0; i < controls.length; i++) {
            let control = controls[i];
            // create/add component
            let component: AbstractComponent = this.createComponent.apply(this, [i]);
            component.parent = this;
            this.componentMap[control.getName()] = component;
            // register component
            component.register([control], view);
        }
    }

    refresh(control: Control) {
        // pass on refresh to corresponding control
        this.componentMap[control.getName()].refresh(control);
    }

    setCreateComponentCallback(callback: (index) => AbstractComponent) {
        this.createComponent = callback;
        return this;
    }

    setControlState(control: Control, state) {
        // pass on state to corresponding control
        this.componentMap[control.getName()].setControlState(control, state);
    }

    onMidi(control: Control, midi: Midi) {
        // pass on midi to corresponding control
        this.componentMap[control.getName()].onMidi(control, midi);
    }
}
