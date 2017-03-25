import AbstractView from '../view/AbstractView';
import { areDeepEqual } from '../../utils';
import session from '../../session';
import AbstractControl from '../control/AbstractControl';

// TODO: add generic default when TypeScript 2.3 lands:
// abstract class AbstractComponent<Options extends { [key: string]: any } = { [key: string]: any }> {
abstract class AbstractComponent<Options extends { [key: string]: any }> {
    name: string;
    view: typeof AbstractView;
    mode: string;
    controls: AbstractControl[];
    options: Options;

    abstract state: Object; // contents depends on component type

    constructor(controls: AbstractControl[] | AbstractControl, mode?: string, options?: Options);
    constructor(controls: AbstractControl[] | AbstractControl, options?: Options);
    constructor(controls: AbstractControl[] | AbstractControl, ...rest) {
        this.controls = Array.isArray(controls) ? controls : [controls];
        this.mode = typeof rest[0] === 'string' ? rest[0] : '__BASE__';
        this.options = typeof rest[rest.length - 1] === 'object' ? rest[rest.length - 1] : {};
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only allowed in the api's init function
    onInit() {
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
            if (control.activeComponent === this) this.updateControlState(control);
        }
    }

    // renders component state to hardware control
    abstract updateControlState(control: AbstractControl): void;

    // handles midi messages routed to control
    abstract onControlInput(control: AbstractControl, controlState);
}


export default AbstractComponent;
