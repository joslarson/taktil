import AbstractView from '../view/AbstractView';
import { areDeepEqual } from '../../utils';
import session from '../../session';
import AbstractControl from '../control/AbstractControl';


abstract class AbstractComponent {
    private static instance: AbstractComponent;

    parent: typeof AbstractComponent;
    name = this.constructor.name;
    controls: AbstractControl[] = [];
    registrations: Object[] = [];
    views: AbstractView[] = [];

    abstract state: Object; // contents depends on component type

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have its own singleton)
        const Component = this as any as { new (): AbstractComponent, instance: AbstractComponent };
        let instance = Component.instance;

        if (instance instanceof Component) return instance;

        instance = new Component();
        Component.instance = instance; 
        return instance;
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(controls: AbstractControl[], view: AbstractView) {
        this.registrations.push({'view': view, 'controls': controls});
        this.controls = [...this.controls, ...controls];
        if (this.views.indexOf(view) === -1) this.views.push(view);
        // call onRegister()
        this.onRegister();
    }

    onRegister() {
        // optionally implemented in child class
    }

    setState(state) {
        const newState = { ...this.state, ...state };
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(newState, this.state)) return;
        // update object state
        this.state = newState;
        // update hardware state if in view
        for (let control of this.controls) {
            if (control.activeComponent === null) continue;
            let component = this as AbstractComponent;
            let i = 0;
            while(component) {
                // TODO: figure out why instances aren't equal as expected (should be singleton)
                 if (control.activeComponent.constructor === component.constructor) {
                    this.updateControlState(control);
                    break;
                } else {
                    component = component.parent ? component.parent.getInstance() : null;
                }
            }
        }
    }

    // renders component state to hardware control
    abstract updateControlState(control: AbstractControl): void;

    // handles midi messages routed to control
    abstract onControlInput(control: AbstractControl, controlState);
}


export default AbstractComponent;
