import AbstractComponent from './AbstractComponent';
import AbstractView from '../view/AbstractView';
import AbstractControl from '../control/AbstractControl';


abstract class ComponentSet extends AbstractComponent {
    protected _componentMap: { controls: AbstractControl[], components: AbstractComponent[] } = {
        controls: [], components: [],
    };

    abstract createComponent(index): AbstractComponent;

    getSubComponent(control: AbstractControl): AbstractComponent {
        return this._componentMap.components[this._componentMap.controls.indexOf(control)];
    }

    register(controls: AbstractControl[], view: AbstractView) {
        super.register(controls, view);

        for (let i = 0; i < controls.length; i++) {
            let control = controls[i];
            // create/add component
            let component: AbstractComponent = this.createComponent.apply(this, [i]);
            component.parent = this.constructor as typeof AbstractComponent;
            this._componentMap.controls.push(control);
            this._componentMap.components.push(component);
            // register component
            component.register([control], view);
        }
    }

    setCreateComponentCallback(callback: (index) => AbstractComponent) {
        this.createComponent = callback;
        return this;
    }

    renderControl(control: AbstractControl) {
        // pass on state to corresponding control
        this.getSubComponent(control).renderControl(control);
    }

    onControlInput(control: AbstractControl, value: number) {
        // pass on midi to corresponding control
        this.getSubComponent(control).onControlInput(control, value);
    }
}


export default AbstractComponent;
