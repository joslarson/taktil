import { Control } from '../control';
import { shim } from '../env';
import { MidiMessage, MidiOutProxy, SysexMessage } from '../midi';
import { View } from '../view';
import { EventEmitter } from './EventEmitter';

declare const global: {
    init: () => void;
    flush: () => void;
    exit: () => void;
};

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
    private _controls: { [label: string]: Control } = {};
    private _views: { [label: string]: typeof View } = {};
    private _activeView: typeof View;
    private _activeModes: string[] = [];

    /** Global MidiOutProxy instance  */
    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        super();
        // shim bitwig scripting env, injecting session
        shim(this);

        global.init = () => {
            this._isInit = true;

            // call the session init callbacks
            this.emit('init');

            // setup midi/sysex callbacks per port
            const midiInPorts = this.midiInPorts;
            for (let port = 0; port < midiInPorts.length; port += 1) {
                midiInPorts[port].setMidiCallback(
                    (status: number, data1: number, data2: number) => {
                        this.onMidiInput(new MidiMessage({ port, status, data1, data2 }));
                    }
                );
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

    /** Check if bitwig is currently in it's init startup phase */
    get isInit(): boolean {
        return this._isInit;
    }

    // Midi
    //////////////////////////////

    /** The midi in ports available to the session */
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

    /** Handle midi input, routing it to the correct control object */
    onMidiInput(message: MidiMessage | SysexMessage) {
        const control = this.findControl(message);
        const messageType = message instanceof MidiMessage ? '[MIDI] ' : '[SYSEX]';

        if (control) control.onMidiInput(message);

        console.log(
            `${messageType} IN  ${message.port} ==> ${
                message instanceof MidiMessage ? message.shortHex : message.data
            }${control && control.label ? ` "${control.label}"` : ''}`
        );
    }

    // Controls
    //////////////////////////////

    /**
     * Register controls to the session (can only be called once).
     *
     * @param controls The mapping of control labels to control instances to register
     * to the session.
     */
    registerControls(controls: { [label: string]: Control }) {
        if (Object.keys(this.controls).length) {
            throw Error("The Session's registerControls method can only be called once.");
        }

        // assign view label to and inject session into each view
        Object.keys(controls).forEach(controlName => {
            controls[controlName].label = controlName;
            controls[controlName].session = this;
        });

        const register = () => {
            const controlsArray: Control[] = [];
            for (const controlName in controls) {
                const control = controls[controlName];

                // make sure patterns don't overlap
                for (const existingControl of controlsArray) {
                    for (const pattern of control.patterns) {
                        for (const existingPattern of existingControl.patterns) {
                            if (pattern.conflictsWith(existingPattern)) {
                                throw new Error(
                                    `Control "${control.label}" conflicts with existing Control "${
                                        existingControl.label
                                    }".`
                                );
                            }
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

    /**
     * The mapping of control labels to control instances that have
     * been registered to the session.
     */
    get controls(): { [label: string]: Control } {
        return { ...this._controls };
    }

    /** Find the control (if it exists) associated with an incoming Midi message. */
    findControl(message: MidiMessage | SysexMessage): Control | null {
        // look for a matching registered control
        for (const controlName in this.controls) {
            const control = this.controls[controlName];
            for (const pattern of control.patterns) {
                // if pattern matches midiMessage, return control
                if (pattern.test(message)) return control;
            }
        }
        // not found, return null
        return null;
    }

    /**
     * Connect each registered control with its corresponding component (if any)
     * in the active view stack.
     *
     * This method is called internally anytime the active view or mode list
     * changes to re-associate controls to newly activated components.
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

    /** Force re-render all registered controls. */
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
     * @param views The mapping of view labels to view classes to register
     * to the session.
     */
    registerViews(views: { [label: string]: typeof View }) {
        if (Object.keys(this.views).length) {
            throw Error("The Session's registerViews method can only be called once.");
        }

        // assign view label to each view
        Object.keys(views).forEach(label => (views[label].label = label));

        const register = () => {
            if (!Object.keys(this.controls).length) {
                throw Error('Controls must be registered before views.');
            }
            const viewsToRegister = flattenViews(Object.keys(views).map(label => views[label]));
            const unvalidatedViews = [...viewsToRegister];
            const attemptedValidations: typeof View[] = [];
            const validatedViews: typeof View[] = [];

            validation: while (true) {
                const view = unvalidatedViews.shift();
                if (!view) break; // if we've run out of views to register we are done.

                for (const ancestor of view.extends) {
                    // if the views parent has yet to be registered, push it to the end of the line
                    if (validatedViews.indexOf(ancestor) === -1) {
                        unvalidatedViews.push(view);
                        // catch circular dependency
                        if (attemptedValidations.indexOf(view) === -1) {
                            attemptedValidations.push(view);
                        } else {
                            throw Error(`Circular dependency detected in ${view.label}.`);
                        }
                        continue validation;
                    }
                }

                // everything looks good, register the view
                if (validatedViews.indexOf(view) === -1) {
                    // add to validate views list
                    validatedViews.push(view);
                    // initialize view
                    view.init(this);
                } else {
                    throw Error(
                        `The same view class (${view.label}) cannot be registered more than once.`
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

        // if the controls have already been registered, register immediately
        if (Object.keys(this.controls).length) return register();
        // otherwise, defer until controls are registered
        this.on('registerControls', register);
    }

    /**
     * The mapping of view labels to view classes that have been registered
     * to the session.
     */
    get views() {
        return { ...this._views };
    }

    /** Set the active view of the session. */
    activateView(label: string) {
        const view = this.views[label];
        if (view === undefined) throw new Error(`Cannot find view with label "${label}"`);

        this._activeView = view;
        this.emit('activateView', view);
        this.associateControlsInView(); // re-associate controls in view
    }

    /** The active view of the session. */
    get activeView(): typeof View {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    /** The list of active modes in the order they were activated, from last to first. */
    get activeModes() {
        return [...this._activeModes, '__BASE__'];
    }

    /** Activate a mode, adding it to the active mode list. */
    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode label "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode); // prepend to modes
        this.emit('activateMode', mode);
        this.associateControlsInView(); // re-associate controls in view
    }

    /** Deactivate a given mode, removing it from the active mode list. */
    deactivateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode label "__BASE__" is reserved.');
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

function flattenViews(views: typeof View[], distinct = true): typeof View[] {
    const flattenedViews = views
        .map(view => [view, ...flattenViews(view.extends, false)])
        .reduce((result, array) => result.concat(array), []);

    if (!distinct) return flattenedViews;

    return flattenedViews.reduce(
        (result, view) => {
            if (result.indexOf(view) === -1) result.push(view);
            return result;
        },
        [] as typeof View[]
    );
}
