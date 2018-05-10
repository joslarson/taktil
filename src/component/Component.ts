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
        this.params = Object.assign({}, this.params, params, { mode: params.mode || '__BASE__' });
    }

    // called when component is registered to a view for the first time
    // allows running of code that is only allowed in the API's init function
    onInit?(): void;

    onActivate?(): void;

    onDeactivate?(): void;

    setState(partialState: Partial<State>): void {
        // update object state
        this.state = Object.assign({}, this.state, partialState);
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
