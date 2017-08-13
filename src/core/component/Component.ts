import { View } from '../view/View';
import { Control } from '../control';
import { ControlState } from '../control/Control';
import { ObjectLiteral } from '../helpers/ObjectLiteral';

export type ComponentState = ObjectLiteral;
export type ComponentProps = ObjectLiteral;

/**
 * Abstract class defining the the base functionality from which all
 * other components must extend.
 */
export abstract class Component<
    Props extends ComponentProps = ComponentProps,
    State extends ComponentState = ComponentState
> {
    name: string;
    mode: string;
    controls: Control[];

    state: State = {} as State;
    props: Props = {} as Props;

    constructor(controls: Control[], props: Props, mode?: string);
    constructor(control: Control, props: Props, mode?: string);
    constructor(controls: Control[] | Control, props: Props, mode?: string) {
        this.controls = Array.isArray(controls) ? controls : [controls];
        this.props = {
            ...this.props as object,
            ...props as object,
        } as Props;
        this.mode = mode || '__BASE__';
    }

    // called when component is registered to a view for the first time
    // allows running of code that is only allowed in the API's init function
    onInit?(): void;

    setState(partialState: Partial<State>): void {
        // update object state
        this.state = {
            ...this.state as object,
            ...partialState as object,
        } as State; // TODO: should be able to remove type casting in future typescript release
        // re-render associated controls
        this.render();
    }

    render(): void {
        this.controls.map(control => {
            // update hardware state if in view
            if (control.activeComponent === this) control.setState(this.getOutput(control));
        });
    }

    // defines conversion of component state to control state
    abstract getOutput(control: Control): ControlState;

    // handles control input
    abstract onInput(control: Control, input: ControlState): void;
}
