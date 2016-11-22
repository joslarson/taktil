import AbstractComponent from './AbstractComponent';
import AbstractView from '../view/AbstractView';
import Control from '../controller/Control';
import MidiMessage from '../midi/MidiMessage';


export default class ComponentSet extends AbstractComponent {
    componentMap: { [key: string]: AbstractComponent } = {};
    createComponent: (index) => AbstractComponent;

    register(controls: Control[], view: AbstractView) {
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

    render(control: Control) {
        // pass on refresh to corresponding control
        this.componentMap[control.getName()].render(control);
    }

    setCreateComponentCallback(callback: (index) => AbstractComponent) {
        this.createComponent = callback;
        return this;
    }

    setControlState(control: Control, state) {
        // pass on state to corresponding control
        this.componentMap[control.getName()].setControlState(control, state);
    }

    onMidi(control: Control, midi: MidiMessage) {
        // pass on midi to corresponding control
        this.componentMap[control.getName()].onMidi(control, midi);
    }
}
