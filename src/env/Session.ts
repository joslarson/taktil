import { EventEmitter } from './EventEmitter';
import { MidiOutProxy, MidiMessage, SysexMessage } from '../core/midi';
import { Control, ControlState } from '../core/control';
import { View } from '../core/view';

declare const global: any;

export interface Session extends EventEmitter {
    on(label: 'activateMode' | 'deactivateMode', callback: (mode: string) => void): void;
    on(label: 'activateView', callback: (view: typeof View) => void): void;
    on(
        label: 'init' | 'registerControls' | 'registerViews' | 'flush' | 'exit',
        callback: () => void
    ): void;

    addListener(label: 'activateMode' | 'deactivateMode', callback: (mode: string) => void): void;
    addListener(label: 'activateView', callback: (view: typeof View) => void): void;
    addListener(
        label: 'init' | 'registerControls' | 'registerViews' | 'flush' | 'exit',
        callback: () => void
    ): void;

    removeListener(
        label: 'activateMode' | 'deactivateMode',
        callback: (mode: string) => void
    ): boolean;
    removeListener(label: 'activateView', callback: (view: typeof View) => void): boolean;
    removeListener(
        label: 'init' | 'registerControls' | 'registerViews' | 'flush' | 'exit',
        callback: () => void
    ): boolean;
}

/**
 * A representation of the current project (or active Bitwig
 * Studio tab).
 * 
 * Assists in managing shared state and session level event
 * subscriptions between Taktil and the control surface script.
 */
export class Session extends EventEmitter {
    private _isInit: boolean = false;
    private _controls: { [name: string]: Control } = {};
    private _views: { [name: string]: typeof View } = {};
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
                control.setState(control.defaultState);
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

    registerControls(controls: { [name: string]: Control }) {
        if (Object.keys(this.controls).length) {
            throw Error("The Session's registerControls method can only be called once.");
        }

        // assign view name to each view
        Object.keys(controls).forEach(controlName => (controls[controlName].name = controlName));

        const register = () => {
            const controlsArray: Control[] = [];
            for (const controlName in controls) {
                const control = controls[controlName];

                // make sure patterns don't overlap
                for (const existingControl of controlsArray) {
                    // if none of the ports match up, then there's no conflict
                    const outPortsMatch = control.outPort !== existingControl.outPort;
                    const inPortsMatch = control.inPort !== existingControl.inPort;
                    if (outPortsMatch && inPortsMatch) continue;

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

            // emit registerControls event
            this.emit('registerControls');
        };

        // if called during init register immediately
        if (this.isInit) return register();
        // otherwise defer until init
        this.on('init', register);
    }

    /** The map of controls registered to the session. */
    get controls() {
        return { ...this._controls };
    }

    /** Find the control associated with an incoming Midi message. */
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

    /**
     * Connect each control from the control template with it's corresponding
     * component (if any) in the active view stack.
     * 
     * This method is called internally anytime the active view or mode list
     * changes to re-associate controls to the newly activated components.
     */
    associateControlsInView() {
        // no view, no components to associate controls with
        if (!this.activeView) return;
        // connect each control to the corresponding component in view (if any)
        for (const controlName in this.controls) {
            const control = this.controls[controlName];
            this.activeView.connectControl(control);
        }
    }

    /** Force re-render all controls. */
    resetControls() {
        for (const controlName in this.controls) {
            const control = this.controls[controlName];
            control.render(true);
        }
    }

    // Views
    //////////////////////////////

    /**
     * Register views to the session (can only be called once).
     * 
     * @param views The mapping of view names to view classes to register
     * to the session. 
     */
    registerViews(views: { [name: string]: typeof View }) {
        if (Object.keys(this.views).length) {
            throw Error("The Session's registerViews method can only be called once.");
        }

        // assign view name to each view
        Object.keys(views).forEach(viewName => (views[viewName].viewName = viewName));

        const register = () => {
            if (!Object.keys(this.controls).length) {
                throw Error('Controls must be registered before views.');
            }
            const viewsToRegister = Object.keys(views).map(viewName => views[viewName]);
            const unvalidatedViews = [...viewsToRegister];
            const validatedViews: (typeof View)[] = [];

            while (true) {
                const view = unvalidatedViews.shift();
                if (!view) break; // if we've run out of views to register we are done.

                // validate that parent exists in registration group
                const parent =
                    typeof view.parent === 'string' ? views[view.parent] : view.parent || undefined;
                if (parent && typeof view.parent === 'string') {
                    throw Error(
                        `View name "${view.parent}" not found for parent of ${view.viewName}.`
                    );
                } else if (parent && viewsToRegister.indexOf(parent) === -1) {
                    throw Error(
                        `Parent view for "${view.viewName}" is missing from the registration object.`
                    );
                }
                // if the views parent has yet to be registered, push it to the end of the line
                if (parent && validatedViews.indexOf(parent) === -1) {
                    unvalidatedViews.push(view);
                    continue;
                }
                // everything looks good, register the view
                if (validatedViews.indexOf(view) === -1) {
                    // add to validate views list
                    validatedViews.push(view);
                    // initialize view
                    view.init();
                } else {
                    throw Error(
                        `The same view class (${view.name}) cannot be registered more than once.`
                    );
                }
            }

            // with all views validated, set session views
            if (validatedViews.length === viewsToRegister.length) {
                this._views = views;
                this.emit('registerViews'); // emit registerViews event
            } else {
                throw Error('Unable to validate views for registration.');
            }
        };

        // if called during init register immediately
        if (this.isInit) return register();
        // otherwise defer until init
        this.on('registerControls', register);
    }

    /**
     * The mapping of view names to view classes that have been registered
     * to the session.
     */
    get views() {
        return { ...this._views };
    }

    /** Set the active view for the session. */
    activateView(view: typeof View | string) {
        const viewList = Object.keys(this.views).map(viewName => this.views[viewName]);
        const newView = typeof view === 'string' ? this.views[view] : view;
        if (viewList.indexOf(newView) === -1) {
            throw new Error(
                `${newView.name} must first be registered before being set as the active view.`
            );
        }
        this._activeView = newView;
        this.emit('activateView', newView);
        this.associateControlsInView(); // re-associate controls in view
    }

    /** The active view for the session. */
    get activeView(): typeof View {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    /** Get the list of active modes in the order they were activated, from last to first. */
    get activeModes() {
        return [...this._activeModes, '__BASE__'];
    }

    /** Activate a mode, adding it to the active mode list */
    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode); // prepend to modes
        this.emit('activateMode', mode);
        this.associateControlsInView(); // re-associate controls in view
    }

    /** Deactivate a given mode, removing it from the active mode list. */
    deactivateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this.emit('deactivateMode', mode);
            this.associateControlsInView(); // re-associate controls in view
        }
    }

    /** Check if a given mode is active. */
    modeIsActive(mode: string) {
        return this.activeModes.indexOf(mode) > -1;
    }
}
