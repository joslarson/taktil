import AbstractView from '../view/AbstractView';
import { areDeepEqual } from '../../utils';
import session from '../../session';
import AbstractControl from '../control/AbstractControl';


abstract class AbstractComponent {
    private static _instance: AbstractComponent;
    static parent: typeof AbstractComponent;
    static controls: AbstractControl[] = [];
    static registrations: Object[] = [];
    static views: typeof AbstractView[] = [];

    static get instance() {
        // inheritance safe singleton pattern (each child class will have its own singleton)
        const Component = this as any as { new (): AbstractComponent, _instance: AbstractComponent };
        let instance = Component._instance;

        if (instance instanceof Component) return instance;

        instance = new Component();
        Component._instance = instance; 
        return instance;
    }

    abstract state: Object; // contents depends on component type

    protected constructor() {}

    get class(): typeof AbstractComponent {
        return this.constructor as typeof AbstractComponent;
    }

    get controls() {
        return this.class.controls;
    }

    set controls(controls: AbstractControl[]) {
        this.class.controls = controls;
    }

    get registrations() {
        return this.class.registrations;
    }

    set registrations(registrations) {
        this.class.registrations = registrations;
    }

    get views() {
        return this.class.views;
    }

    set views(views: typeof AbstractView[]) {
        this.class.views = views;
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(controls: AbstractControl[], view: typeof AbstractView) {
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
            let component = this.constructor as typeof AbstractComponent;
            while(component) {
                 if (control.activeComponent === component) {
                    this.updateControlState(control);
                    break;
                } else {
                    component = component.parent ? component.parent : null;
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
