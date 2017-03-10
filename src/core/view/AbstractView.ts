import { MidiMessage, SysexMessage } from '../midi';
import { AbstractComponent } from '../component';
import { AbstractControl } from '../control';
import session from '../../session';


abstract class AbstractView {
    protected static instance: AbstractView;
    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const View = this as any as { new (): AbstractView, instance: AbstractView };
        let instance = View.instance;

        if (instance instanceof View) return instance;

        instance = new View();
        View.instance = instance;

        return instance;
    }

    name = this.constructor.name;
    parent: typeof AbstractView;
    _componentMap: { [mode: string]: { controls: AbstractControl[], components: AbstractComponent[] } } = {};

    protected constructor() {}

    getComponent(control: AbstractControl, mode: string) {
        if (this._componentMap[mode] === undefined) return;
        const componentMapIndex = this._componentMap[mode].controls.indexOf(control);
        if (componentMapIndex === -1) return;
        return this._componentMap[mode].components[componentMapIndex];
    }

    associateControl(control: AbstractControl) {
        // check view modes in order for component/control registration
        for (let activeMode of session.activeModes) {
            if (!this._componentMap[activeMode]) continue;  // mode not used in view
            const component: AbstractComponent = this.getComponent(control, activeMode);
            if (component) { 
                control.activeComponent = component;
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.associateControl(control);
        } else {
            // no parent? no component to connect to
            control.activeComponent = null;
        }
    }

    registerComponent(ComponentClass: typeof AbstractComponent, controls: AbstractControl[]|AbstractControl, mode = '__BASE__') {
        type ComponentClassType = new () => AbstractComponent;
        controls = controls instanceof AbstractControl ? [<AbstractControl>controls] : controls;
        const component = new (ComponentClass as any as ComponentClassType)();

        // register controls w/ component
        component.register(<AbstractControl[]>controls, this);
        for (let control of controls as AbstractControl[]) {
            // register control with view/mode
            if (!this._componentMap[mode]) this._componentMap[mode] = { controls: [], components: [] };

            // if control already registered in view mode, throw error
            if (this._componentMap[mode].controls.indexOf(control) > -1) throw Error('Duplicate Control registration in view mode.');

            // add control and component pair to component map
            this._componentMap[mode].controls.push(control);
            this._componentMap[mode].components.push(component);
        }
    }

    onRegister() {
        // optionally implemented in child class
    }
}

export default AbstractView;