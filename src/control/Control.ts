import { Component } from '../component';
import { Color } from '../helpers';
import { Message } from '../message/Message';
import { Session } from '../session';

export interface ControlState {
    value: number;
    color?: Color;
    brightness?: number;
    flashing?:
        | boolean
        | {
              on: boolean;
              type?: 'sync' | 'free';
              rate?: number;
          };
    [key: string]: any;
}

/**
 * Abstract class defining the the base functionality from which all
 * other controls must extend.
 */
export abstract class Control<State extends ControlState = ControlState> {
    private _defaultState: State;
    private _activeComponent: Component | null = null;

    protected cache: any[] = [];

    label: string;
    session: Session;
    enableCache = true;

    minValue = 0;
    maxValue = 127;

    state: State = { value: 0 } as State;

    get valueRange() {
        return this.maxValue - this.minValue;
    }

    // state

    get defaultState(): State {
        // if not set by setState, store initialized state value
        if (!this._defaultState) this._defaultState = JSON.parse(JSON.stringify(this.state));
        return this._defaultState;
    }

    setState(partialState: Partial<State>, render = true): void {
        this.defaultState; // make sure defaultState has been initialized
        if (partialState.value) {
            // validate value input
            if (partialState.value > this.maxValue || partialState.value < this.minValue) {
                throw new Error(
                    `Invalid value "${partialState.value}" for Control "${
                        this.label
                    }" with value range ${this.minValue} to ${this.maxValue}.`
                );
            }
        }
        // update state
        this.state = Object.assign({}, this.state, partialState);
        // re-render with new state
        if (render) this.render();
    }

    // active component

    get activeComponent() {
        return this._activeComponent;
    }

    set activeComponent(component: Component | null) {
        // component not changing? do nothing
        if (component === this._activeComponent) return;
        // deactivate old component
        if (this._activeComponent && this._activeComponent.onDeactivate) {
            this._activeComponent.onDeactivate();
        }

        // activate new component
        this._activeComponent = component;
        if (this._activeComponent && this._activeComponent.onActivate) {
            this._activeComponent.onActivate();
        }

        // on component change, reset state to default
        this.setState(this.defaultState, false);

        // render new control state
        component ? component.render() : this.render();
    }

    // message i/o

    abstract getControlInput(message: Message): State;

    abstract cacheMessage(message: Message): boolean;

    abstract onInputMessage(message: Message): void;

    abstract getOutputMessages(state: State): Message[];

    // render

    controlWillRender?(messages: Message[]): void;

    abstract render(force?: boolean): boolean;

    controlDidRender?(messages: Message): void;
}
