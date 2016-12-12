import AbstractComponent from './AbstractComponent';
import AbstractView from '../view/AbstractView';
import Control from '../controller/Control';
import MidiMessage from '../midi/MidiMessage';


abstract class ComponentSet extends AbstractComponent {
    componentMap: { [key: string]: AbstractComponent } = {};
    createComponent: (index) => AbstractComponent;

    register(controls: Control[], view: AbstractView) {
        super.register(controls, view);

        for (let i = 0; i < controls.length; i++) {
            let control = controls[i];
            // create/add component
            let component: AbstractComponent = this.createComponent.apply(this, [i]);
            component.parent = this.constructor as typeof AbstractComponent;
            this.componentMap[control.id] = component;
            // register component
            component.register([control], view);
        }
    }

    setCreateComponentCallback(callback: (index) => AbstractComponent) {
        this.createComponent = callback;
        return this;
    }

    renderControl(control: Control) {
        // pass on state to corresponding control
        this.componentMap[control.id].renderControl(control);
    }

    onMidi(control: Control, midi: MidiMessage) {
        // pass on midi to corresponding control
        this.componentMap[control.id].onMidi(control, midi);
    }
}


export default AbstractComponent;
