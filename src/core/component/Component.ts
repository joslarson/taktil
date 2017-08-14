import { View } from '../view/View';
import { Control } from '../control';
import { ControlState } from '../control/Control';
import { ObjectLiteral } from '../helpers/ObjectLiteral';

export type ComponentState = ObjectLiteral;
export type ComponentOptions = ObjectLiteral;

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export abstract class Component<
    Options extends ComponentOptions = ComponentOptions,
    State extends ComponentState = ComponentState
> {
    name: string;
    control: Control;
    mode: string;
    options: Options = {} as Options;
    state: State = {} as State;

    constructor(control: Control, mode: string, options: Options);
    constructor(control: Control, options: Options);
    constructor(control: Control, ...rest: (string | Options)[]) {
        this.control = control;
        this.mode = typeof rest[0] === 'string' ? rest[0] as string : '__BASE__';
        this.options = {
            ...this.options as object,
            ...rest.slice(-1)[0] as object,
        } as Options;
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
