import AbstractView from '../view/AbstractView';
import { areDeepEqual } from '../../utils';
import session from '../../session';
import AbstractControl from '../control/AbstractControl';


export interface ObjectLiteral {
    [key: string]: any;
}

abstract class AbstractComponent<Props extends ObjectLiteral = ObjectLiteral, State extends ObjectLiteral = ObjectLiteral> {
    name: string;
    view: typeof AbstractView;
    mode: string;
    controls: AbstractControl[];
    props: Props;

    private _state: State;

    constructor(controls: AbstractControl[], mode: string, props: Props);
    constructor(control: AbstractControl, mode: string, props: Props);
    constructor(controls: AbstractControl[], props: Props);
    constructor(control: AbstractControl, props: Props);
    constructor(controls: AbstractControl[] | AbstractControl, ...rest: any[]) {
        this.controls = Array.isArray(controls) ? controls : [controls];
        this.mode = typeof rest[0] === 'string' ? rest[0] : '__BASE__';
        this.props = typeof rest[rest.length - 1] === 'object' ? rest[rest.length - 1] : {};
        this._state = this.getInitialState() as State;
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only allowed in the api's init function
    onInit(): void {
        // optionally implemented in child class
    }

    get state(): State {
        return { ...this._state as object } as State;
    }

    abstract getInitialState(): State;

    setState(partialState: Partial<State>, render = true): void {
        // update object state
        this._state = { ...this._state as object, ...partialState as object } as State; // TODO: should be able to remove type casting in typescript 2.3.1
        // re-render associated controls
        if (render) this.render();
    }

    render(): void {
        this.controls.map(control => {
            // update hardware state if in view
            if (control.activeComponent === this) control.setState(this.getControlOutput(control));
        });
    }

    // renders component state to hardware control
    abstract getControlOutput(control: AbstractControl): object;

    // handles midi messages routed to control
    abstract onControlInput(control: AbstractControl, input: { value: number, [others: string]: any }): void;
}


export default AbstractComponent;
