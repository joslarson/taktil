import scriptState from '../../state';
import View from '../View';
import {areDeepEqual, IntervalTask} from '../../utils';


abstract class AbstractControl {
    name: string;
    parent: AbstractControl;
    hwCtrlNames: Array<string> = [];
    registered: boolean = false;
    registrations: Object[] = [];
    views: Array<View> = [];
    eventHandlers: { [key: string]: Function[] } = {};
    memory: { [key: string]: any } = {};
    state: any; // depends on control type

    constructor(name) {
        this.name = name;
    }

    // called when button is regstered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(hwCtrlNameSet, view) {
        this.registrations.push({'view': view, 'hwCtrlNameSet': hwCtrlNameSet});
        this.hwCtrlNames = this.hwCtrlNames.concat(hwCtrlNameSet);
        this.views.push(view);
        if (this.eventHandlers['register'] && !this.registered) {
            this.callCallback('register');
        }
    }

    refresh(hwCtrlName: string) {
        var hwCtrl = scriptState.device.hwCtrls[hwCtrlName];
        scriptState.view.updateHwCtrlState(this, hwCtrlName, this.state);
    }

    setState(state) {
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(state, this.state)) return;
        // update object state
        this.state = state;
        // update hardware state through view to avoid
        // updating hardwar ctrls not in current view
        for (let hwCtrlName of this.hwCtrlNames) {
            scriptState.view.updateHwCtrlState(this, hwCtrlName, state);
        }
    }

    setHwCtrlState(hwCtrlName: string, state: any) {

    }

    // registers event handlers
    on(eventName, callback) {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];
        this.eventHandlers[eventName].push(callback);
        return this;
    }

    // handles midi messages routed to control
    onMidi(hwCtrlName: string, midi: Midi) {
        // implemented in subclasses
    }

    callCallback(callbackName: string, ...args) {
        log(callbackName + ' ' + this.name);
        var callbackList = this.eventHandlers[callbackName];
        for (let callback of callbackList) {
            if (this.memory[callbackName]) this.cancelCallback(callbackName);
            callback.apply(this, args);
        }
    }

    cancelCallback(callbackName: string) {
        var memory = this.memory[callbackName];
        if (memory instanceof IntervalTask) memory.cancel();
        delete this.memory[callbackName];
    }
}


export default AbstractControl;
