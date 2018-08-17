import { Component } from '../component';
import { Color } from '../helpers';
// import { EventEmitter } from '../session/EventEmitter';

// export interface Protocol<Payload> extends EventEmitter {
//     on(label: 'send' | 'receive', callback: (payload: Payload) => void): void;
// }

export abstract class Client<Resource, Payload> {
    abstract subscribe(resource: Resource, callback: (payload: Payload) => void): void;
    publish?(payload: Payload): void;
}

export interface ControlMessage {
    value: number;
    color?: Color;
    brightness?: number;
}

export abstract class Control<Payload, Message extends ControlMessage = ControlMessage> {
    client: Client<any, Payload>;
    abstract state: Message;

    constructor(client: Client<any, Payload>) {
        this.client = client;
        // this.protocol.subscribe(filter, callback)
        // this.protocol.on('receive', payload => {
        //     const state = this.convertPayload(payload);
        //     // TODO: how am I going to filter the payloads
        // });
    }

    // active component
    ///////////////////////////

    private _activeComponent: Component | null = null;

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

        // on component change, reset state to initial state
        this.setState(this.initialState);

        // render new control state
        component ? component.render() : this.setState(this.initialState);
    }

    // state
    ///////////////////////////

    private _initialState?: Message;

    get initialState(): Message {
        // if this.setState has not yet been called, this.state is still the
        // initial state
        return this._initialState || this.state;
    }

    setState(partialState: Partial<Message>): void {
        if (this.state === undefined) return;
        // save initial state before first state modification
        if (this._initialState === undefined) this._initialState = this.state;
        // set the state
        (this.state as Message) = Object.assign({}, this.state, partialState);
        // send new state to active component if any
        if (this.activeComponent) this.activeComponent.onControlInput(this.state);
        // render
        this.render()
    }

    // life cycle
    ///////////////////////////
    abstract convertPayload(payload: Payload): Partial<Message>;
    shouldRender?(): boolean;
    getRenderPayloads?(state: Message): Payload[];
    render(force: boolean = false) {
        // check that control has the ability to render
        if (!this.getRenderPayloads || !this.client.publish) return;
        // treat this.shouldRender not implemented as true
        // otherwise check this.shouldRender()
        if (force || !this.shouldRender || this.shouldRender()) {
            for (const payload of this.getRenderPayloads(this.state)) {
                this.client.publish(payload);
            }
        }
    }
}

export interface MidiPayload {
    status: number;
    data1: number;
    data2: number;
}

export class MidiClient extends Client<any, MidiPayload> {
}

export class MyControl extends Control<MidiPayload> {
    client = new MidiClient();
    state: ControlMessage = { value: 0 };
    convertPayload(payload: MidiPayload) {
        return { value: payload.data1 ? 0 : 1 };
    }
}
