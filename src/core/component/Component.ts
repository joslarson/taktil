import View from '../view/View';
import { Control } from '../control';
import { ControlBaseState } from '../control/Control';
import ObjectLiteral from '../helpers/ObjectLiteral';

export type ComponentBaseState = ObjectLiteral;
export type ComponentBaseProps = ObjectLiteral;

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export default abstract class Component<
    Props extends ComponentBaseProps = ComponentBaseProps,
    State extends ComponentBaseState = ComponentBaseState
> {
    name: string;
    view: typeof View;
    mode: string;
    controls: Control[];

    state: State = {} as State;
    props: Props = {} as Props;

    private _initialState: State;

    constructor(controls: Control[], props: Props, mode?: string);
    constructor(control: Control, props: Props, mode?: string);
    constructor(controls: Control[], mode?: string);
    constructor(control: Control, mode?: string);
    constructor(controls: Control[] | Control, ...rest: any[]) {
        this.controls = Array.isArray(controls) ? controls : [controls];
        this.props = typeof rest[0] === 'object' ? rest[0] : {};
        this.mode = typeof rest[rest.length - 1] === 'string' ? rest[rest.length - 1] : '__BASE__';
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
        this.initialState; // make sure initialState has been initialized

        // update object state
        this.state = {
            ...this.state as object,
            ...partialState as object,
        } as State; // TODO: should be able to remove type casting in typescript 2.4
        // re-render associated controls
        if (render) this.render();
    }

    render(): void {
        this.controls.map(control => {
            // update hardware state if in view
            if (control.activeComponent === this) control.setState(this.getOutput(control));
        });
    }

    // renders component state to hardware control
    abstract getOutput(control: Control): ControlBaseState;

    // handles midi messages routed to control
    abstract onInput(control: Control, input: ControlBaseState): void;
}
