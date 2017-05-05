import { MidiOutProxy, MidiMessage, SysexMessage } from '../core/midi';
import { AbstractControl } from 'core/control';
import { AbstractView } from '../core/view';
import { midiMessageToHex } from '../utils';


/**
 * A representation of the current scripting session / active Bitwig
 * Studio tab.
 * 
 * Assists in managing shared state and session level event
 * subscriptions between Taktil and the control surface script.
 */
export default class Session {
    private _controls: { [key: string]: AbstractControl } = {};
    private _views: typeof AbstractView[] = [];
    private _activeView: typeof AbstractView;
    private _activeModes: string[] = [];
    private _eventHandlers: { [key: string]: Function[] } = {};
    midiOut: MidiOutProxy = new MidiOutProxy(this);

    constructor() {
        global.init = () => {
            global.__is_init__ = true;
            // call the session init callbacks
            this._callEventCallbacks('init');
            // setup midi/sysex callbacks per port
            const midiInPorts = this.midiInPorts;
            for (let port = 0; port < midiInPorts.length; port++) {
                midiInPorts[port].setMidiCallback(
                    (status: number, data1: number, data2: number) => {
                        this.onMidi(new MidiMessage({port, status, data1, data2}))
                    }
                );
                midiInPorts[port].setSysexCallback((data: string) => {
                    this.onSysex(new SysexMessage({ port, data }));
                });
            }
            global.__is_init__ = false;
        };

        global.flush = () => {
            this._callEventCallbacks('flush');
        };

        global.exit = () => {
            // reset all controls to default state
            for (let controlName in this.controls) {
                const control = this.controls[controlName];
                control.setState(control.initialState);
            }
            // call registered exit callbacks
            this._callEventCallbacks('exit');
        };
    }

    // Midi
    //////////////////////////////

    get midiInPorts(): API.MidiIn[] {
        const midiInPorts = [];
        for (let i = 0; true; i++) {
            try {
                midiInPorts[i] = host.getMidiInPort(i);
            } catch (error) {
                break;
            }
        }
        return midiInPorts;
    }

    onMidi(midiMessage: MidiMessage) {
        const control = this.findControl(midiMessage);

        if (control) {
            console.log(`[MIDI]  IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}${control.name ? ` "${control.name}"` : ''}`);
            control.onMidi(midiMessage);
        } else {
            console.log(`[MIDI]  IN  ${String(midiMessage.port)} ==> ${midiMessageToHex(midiMessage)}`);
        }
    }

    onSysex(sysexMessage: SysexMessage) {
        const control = this.findControl(sysexMessage);

        if (control) {
            console.log(`[SYSEX] IN  ${String(sysexMessage.port)} ==> ${sysexMessage.data}${control.name ? ` "${control.name}"` : ''}`);
            control.onSysex(sysexMessage);
        } else {
            console.log(`[SYSEX] IN  ${String(sysexMessage.port)} ==> ${sysexMessage.data}`);
        }
    }

    // Event Hooks
    //////////////////////////////

    on(
        eventName: 'init' | 'flush' | 'exit' | 'activateView' | 'activateMode' | 'deactivateMode',
        callback: (...args: any[]) => any
    ) {
        if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
        this._eventHandlers[eventName].push(callback);
        return this;
    }

    private _callEventCallbacks(eventName: string, ...args: any[]) {
        if (this._eventHandlers[eventName] === undefined) return;

        let callbackList = this._eventHandlers[eventName];
        for (let callback of callbackList) {
            callback.apply(this, args);
        }
    }

    // Controls
    //////////////////////////////

    set controls(controls: { [name: string]: AbstractControl }) {
        const controlsArray: AbstractControl[] = [];
        for (let controlName in controls) {
            const control = controls[controlName];
            // set control name on object
            control.name = controlName;
            for (let existingControl of controlsArray) {
                // if no of the ports match up, then there's no conflict
                if (control.outPort !== existingControl.outPort
                    && control.inPort !== existingControl.inPort) continue;
                for (let pattern of control.patterns) {
                    for (let existingPattern of existingControl.patterns) {
                        if (pattern.conflictsWith(existingPattern)) throw new Error(`Control "${control.name}" conflicts with existing Control "${existingControl.name}".`);
                    }
                }
            }
            // add to control array
            controlsArray.push(controls[controlName]);
        }
        this._controls = controls;
    }

    get controls() {
        return { ...this._controls };
    }

    findControl(message: MidiMessage | SysexMessage): AbstractControl | null {
        // look for a matching registered control
        for (let controlName in this.controls) {
            const control = this.controls[controlName];

            // skip controls with an inPort that does not match the midiMessage port
            if (control.inPort !== message.port) continue;

            for (let pattern of control.patterns) {
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
        for (let controlName in this.controls) {
            const control = this.controls[controlName];
            this.activeView.associateControl(control);
        }
    }

    // Views
    //////////////////////////////

    set views(views: typeof AbstractView[]) {
        if (!global.__is_init__) throw new Error('Untimely view registration: views can only be registered from within the init callback.');
        let validatedViews: (typeof AbstractView)[] = [];
        for (let view of views) {
            // validate view registration order
            if (view.parent && validatedViews.indexOf(view.parent) === -1) throw `Invalid view registration order: Parent view "${parent.name}" must be registered before child view "${view.name}".`;
            // add to validate views list
            if (validatedViews.indexOf(view) === -1) validatedViews = [...validatedViews, view];
            // initialize view
            view.init();
        }
        // set session views
        this._views = validatedViews;
    }

    get views() {
        return [...this._views];
    }

    set activeView(view: typeof AbstractView) {
        if (this.views.indexOf(view) === -1) throw new Error(`${view.name} must first be registered before being set as the active view.`);
        this._activeView = view;
        this._callEventCallbacks('activateView', view);
        this.associateControlsInView();  // re-associate controls in view
    }

    get activeView(): typeof AbstractView {
        return this._activeView;
    }

    // Modes
    //////////////////////////////

    get activeModes() {
        return [...this._activeModes, '__BASE__']
    }

    activateMode(mode: string) {
        if (mode === '__BASE__') throw new Error('Mode name "__BASE__" is reserved.');
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) this._activeModes.splice(modeIndex, 1);
        this._activeModes.unshift(mode);  // prepend to modes
        this._callEventCallbacks('activateMode', mode);
        this.associateControlsInView();  // re-associate controls in view
    }

    deactivateMode(mode: string) {
        const modeIndex = this._activeModes.indexOf(mode);
        if (modeIndex > -1) {
            this._activeModes.splice(modeIndex, 1);
            this._callEventCallbacks('deactivateMode', mode);
            this.associateControlsInView();  // re-associate controls in view
        }
    }

    modeIsActive(mode: string) {
        return this.activeModes.indexOf(mode) > -1;
    }
}
