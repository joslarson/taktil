import { View } from '../view/View';
import { Control } from '../control';
import { ControlState } from '../control/Control';
import { ObjectLiteral } from '../helpers/ObjectLiteral';

export type ComponentState = ObjectLiteral;
export type ComponentParams = ObjectLiteral;

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export abstract class Component<
    Params extends ComponentParams = ComponentParams,
    State extends ComponentState = ComponentState
> {
    name: string;
    control: Control;
    mode: string;
    params: Params = {} as Params;
    state: State = {} as State;

    constructor(control: Control, mode: string, params: Params);
    constructor(control: Control, params: Params);
    constructor(control: Control, ...rest: (string | Params)[]) {
        this.control = control;
        this.mode = typeof rest[0] === 'string' ? rest[0] as string : '__BASE__';
        this.params = {
            ...this.params as object,
            ...rest.slice(-1)[0] as object,
        } as Params;
    }

    // called when component is registered to a view for the first time
    // allows running of code that is only allowed in the API's init function
    onInit?(): void;

    setState(partialState: Partial<State>): void {
        // update object state
        this.state = { ...this.state as object, ...partialState as object } as State; // TODO: should be able to remove type casting in future typescript release
        // re-render associated controls
        this.render();
    }

    render(): void {
        // update hardware state if in view
        if (this.control.activeComponent === this) this.control.setState(this.getOutput());
    }

    // defines conversion of component state to control state
    abstract getOutput(): ControlState;

    // handles control input
    abstract onInput(input: ControlState): void;
}
