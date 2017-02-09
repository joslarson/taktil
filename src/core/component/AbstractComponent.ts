import AbstractView from '../view/AbstractView';
import { areDeepEqual, TimeoutTask } from '../../utils';
import session from '../../session';
import AbstractControl from '../control/AbstractControl';
import logger from '../../logger';


abstract class AbstractComponent {
    private static instance: AbstractComponent;

    parent: typeof AbstractComponent;
    name = this.constructor.name;
    controls: AbstractControl[] = [];
    registrations: Object[] = [];
    views: AbstractView[] = [];
    memory: { [key: string]: any } = {};

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
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(state, this.state)) return;
        // update object state
        this.state = state;
        // update hardware state if in view
        for (let control of this.controls) {
            if (control.activeComponent === this) this.renderControl(control);
        }
    }

    // renders component state to hardware control
    abstract renderControl(control: AbstractControl): void;

    // handles midi messages routed to control
    abstract onValue(control: AbstractControl, value: number);

    cancelTimeoutTask(taskName: string) {
        const memory = this.memory[taskName];
        if (memory instanceof TimeoutTask) memory.cancel();
        delete this.memory[taskName];
    }
}


export default AbstractComponent;
