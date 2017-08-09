import EventEmitter from './EventEmitter';
import { MidiOutProxy, MidiMessage, SysexMessage } from '../core/midi';
import { Control } from '../core/control';
import { View } from '../core/view';

declare const global: any;

/**
 * A representation of the current scripting session / active Bitwig
 * Studio tab.
 * 
 * Assists in managing shared state and session level event
 * subscriptions between Taktil and the control surface script.
 */
class Session extends EventEmitter {
    private _isInit: boolean = false;
    private _controls: { [name: string]: Control } = {};
    private _views: typeof View[] = [];
    private _activeView: typeof View;
    private _activeModes: string[] = [];
    private _eventHandlers: { [key: string]: Function[] } = {};

    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        super();
        global.init = () => {
            this._isInit = true;

            // call the session init callbacks
            this.emit('init');

            // setup midi/sysex callbacks per port
            const midiInPorts = this.midiInPorts;
            for (let port = 0; port < midiInPorts.length; port += 1) {
                midiInPorts[
                    port
                ].setMidiCallback((status: number, data1: number, data2: number) => {
                    this.onMidiInput(new MidiMessage({ port, status, data1, data2 }));
                });
                midiInPorts[port].setSysexCallback((data: string) => {
                    this.onMidiInput(new SysexMessage({ port, data }));
                });
            }

            this._isInit = false;
        };

        global.flush = () => {
            this.emit('flush');
        };

        global.exit = () => {
            // reset all controls to default state
            for (const controlName in this.controls) {
                const control = this.controls[controlName];
                control.setState(control.initialState);
            }
            // call registered exit callbacks
            this.emit('exit');
        };
    }

    get isInit(): boolean {
        return this._isInit;
    }

    // Midi
    //////////////////////////////

    get midiInPorts(): API.MidiIn[] {
        const midiInPorts = [];
        for (let i = 0; true; i += 1) {
            try {
                midiInPorts[i] = host.getMidiInPort(i);
            } catch (error) {
                break;
            }
        }
        return midiInPorts;
    }

    onMidiInput(message: MidiMessage | SysexMessage) {
        const control = this.findControl(message);
        const messageType = message instanceof MidiMessage ? '[MIDI] ' : '[SYSEX]';

        if (control) control.onMidiInput(message);

        console.log(
            `${messageType} IN  ${String(message.port)} ==> ${message}${control && control.name
                ? ` "${control.name}"`
                : ''}`
        );
    }

    // Controls
    //////////////////////////////

    set controls(controls: { [name: string]: Control }) {
        const controlsArray: Control[] = [];
        for (const controlName in controls) {
            const control = controls[controlName];
            control.name = controlName;
            for (const existingControl of controlsArray) {
                // if none of the ports match up, then there's no conflict
                if (
                    control.outPort !== existingControl.outPort &&
                    control.inPort !== existingControl.inPort
                ) {
                    continue;
                }
                for (const pattern of control.patterns) {
                    for (const existingPattern of existingControl.patterns) {
                        if (pattern.conflictsWith(existingPattern))
                            throw new Error(
                                `Control "${control.name}" conflicts with existing Control "${existingControl.name}".`
                            );
                    }
                }
            }
            // add to control array
            controlsArray.push(controls[controlName]);
        }
        this._controls = controls;
    }

    get controls(): { [name: string]: Control } {
        return { ...this._controls };
    }

    findControl(message: MidiMessage | SysexMessage): Control | null {
        // look for a matching registered control
        for (const controlName in this.controls) {
            const control = this.controls[controlName];

            // skip controls with an inPort that does not match the midiMessage port
            if (control.inPort !== message.port) continue;

            for (const pattern of control.patterns) {
                // if pattern matches midiMessage, return control
                if (pattern.test(message)) return control;
            }
        }
        // not found, return null
        return null;
    }

    associateControlsInView() {
        // no view, no components to associate controls with
        if (!this.activeView) return;
        // connect each control to the corresponding component in view (if any)
        for (const controlName in this.controls) {
            const control = this.controls[controlName];
            this.activeView.connectControl(control);
        }
    }

    resetControls() {
        for (const controlName in this.controls) {
            const control = this.controls[controlName];
            control.render(true);
        }
    }

    // Views
    //////////////////////////////

    registerViews(...views: typeof View[]) {
        const register = () => {
            let validatedViews: (typeof View)[] = [];
            for (const view of views) {
                // validate view registration order
                const parent = view.getParent();
                if (parent && validatedViews.indexOf(parent) === -1)
                    throw `Invalid view registration order: Parent view "${parent.name}" must be registered before child view "${view.name}".`;
                // add to validate views list
                if (validatedViews.indexOf(view) === -1) validatedViews = [...validatedViews, view];
                // initialize view
                view.init();
            }
            // set session views
            this._views = validatedViews;
        };
        // if called during init register immediately
        if (this.isInit) return register();
        // otherwise defer until init
        this.on('init', register);
    }

    get views() {
        return [...this._views];
    }

    getView(viewName: string) {
        return this.views.filter(view => view.name === viewName)[0];
    }

    activateView(view: typeof View | string) {
        const newView = typeof view === 'string' ? this.getView(view) : view;
        if (this.views.indexOf(newView) === -1)
            throw new Error(
                `${newView.name} must first be registered before being set as the active view.`
            );
        this._activeView = newView;
        this.emit('activateView', newView);
        this.associateControlsInView(); // re-associate controls in view
    }

    get activeView(): typeof View {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    getActiveModes() {
        return [...this._activeModes, '__BASE__'];
    }

    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode); // prepend to modes
        this.emit('activateMode', mode);
        this.associateControlsInView(); // re-associate controls in view
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this.emit('deactivateMode', mode);
            this.associateControlsInView(); // re-associate controls in view
        }
    }

    modeIsActive(mode: string) {
        return this.getActiveModes().indexOf(mode) > -1;
    }
}

interface Session extends EventEmitter {
    on(label: 'activateMode' | 'deactivateMode', callback: (mode: string) => void): void;
    on(label: 'activateView', callback: (view: typeof View) => void): void;
    on(label: 'init' | 'flush' | 'exit', callback: () => void): void;

    addListener(label: 'activateMode' | 'deactivateMode', callback: (mode: string) => void): void;
    addListener(label: 'activateView', callback: (view: typeof View) => void): void;
    addListener(label: 'init' | 'flush' | 'exit', callback: () => void): void;

    removeListener(
        label: 'activateMode' | 'deactivateMode',
        callback: (mode: string) => void
    ): boolean;
    removeListener(label: 'activateView', callback: (view: typeof View) => void): boolean;
    removeListener(label: 'init' | 'flush' | 'exit', callback: () => void): boolean;
}

export default Session;
