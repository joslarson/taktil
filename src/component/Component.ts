import { View } from '../view';
import { Control, ControlState } from '../control';

export interface ComponentState {}
export interface ComponentParams {}

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export abstract class Component<
    Params extends ComponentParams = ComponentParams,
    State extends ComponentState = ComponentState
> {
    label: string;
    control: Control;
    params: Params & { mode: string } = {} as Params & { mode: string };
    state: State = {} as State;

    constructor(control: Control, params: Params & { mode?: string }) {
        this.control = control;
        this.params = {
            ...this.params as object,
            ...params as object,
            mode: params.mode || '__BASE__',
        } as Params & { mode: string };
    }

    // called when component is registered to a view for the first time
    // allows running of code that is only allowed in the API's init function
    onInit?(): void;

    onActivate?(): void;

    onDeactivate?(): void;

    setState(partialState: Partial<State>): void {
        // update object state
        this.state = { ...this.state as object, ...partialState as object } as State; // TODO: should be able to remove type casting in future typescript release
        // re-render associated controls
        this.render();
    }

    render(): void {
        // update hardware state if in view
        if (this.control.activeComponent === this) this.control.setState(this.getControlOutput());
    }

    // defines conversion of component state to control state
    abstract getControlOutput(): Partial<ControlState>;

    // handles control input
    abstract onControlInput(input: ControlState): void;
}
