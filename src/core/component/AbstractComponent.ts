import AbstractView from '../view/AbstractView';
import { AbstractControl } from '../control';
import { AbstractControlBaseState } from '../control/AbstractControl';
import ObjectLiteral from '../helpers/ObjectLiteral';


export type AbstractComponentBaseState = ObjectLiteral;
export type AbstractComponentBaseProps = ObjectLiteral;

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export default abstract class AbstractComponent<
    Props extends AbstractComponentBaseProps = AbstractComponentBaseProps,
    State extends AbstractComponentBaseState = AbstractComponentBaseState
> {
    name: string;
    view: typeof AbstractView;
    mode: string;
    controls: AbstractControl[];

    state: State
    props: Props;

    private _initialState: State;

    constructor(controls: AbstractControl[], mode: string, props: Props);
    constructor(control: AbstractControl, mode: string, props: Props);
    constructor(controls: AbstractControl[], props: Props);
    constructor(control: AbstractControl, props: Props);
    constructor(controls: AbstractControl[] | AbstractControl, ...rest: any[]) {
        this.controls = Array.isArray(controls) ? controls : [controls];
        this.mode = typeof rest[0] === 'string' ? rest[0] : '__BASE__';
        this.props = typeof rest[rest.length - 1] === 'object' ? rest[rest.length - 1] : {};
    }

    // called when component is registered to a view for the first time
    // allows running of code that is only allowed in the API's init function
    onInit?(): void;

    get initialState(): State {
        // if not set by setState, store initialized state value
        if (!this._initialState) this._initialState = JSON.parse(JSON.stringify(this.state));
        return this._initialState;
    }

    setState(partialState: Partial<State>, render = true): void {
        // if not set by initialState getter, store initialized state value
        if (!this.initialState) this._initialState = JSON.parse(JSON.stringify(this.state));

        // update object state
        this.state = { ...this.state as object, ...partialState as object } as State; // TODO: should be able to remove type casting in typescript 2.4
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
    abstract onControlInput(control: AbstractControl, input: AbstractControlBaseState): void;
}
