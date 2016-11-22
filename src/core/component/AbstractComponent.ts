import AbstractView from '../view/AbstractView';
import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import MidiMessage from '../midi/MidiMessage';
import { areDeepEqual, IntervalTask } from '../../utils';
import document from '../../document';
import AbstractController from '../controller/AbstractController';
import Control from '../controller/Control';
import logger from '../../logger';


abstract class AbstractComponent {
    name: string;
    parent: AbstractComponent;
    controls: Control[] = [];
    registered: boolean = false;
    registrations: Object[] = [];
    views: AbstractView[] = [];
    eventHandlers: { [key: string]: Function[] } = {};
    memory: { [key: string]: any } = {};
    state: any; // depends on control type


    constructor(name:string) {
        this.name = name;
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(controls: Control[], view: AbstractView) {
        this.registrations.push({'view': view, 'controls': controls});
        this.controls = this.controls.concat(controls);
        this.views.push(view);
        if (this.eventHandlers['register'] && !this.registered) {
            this.callCallback('register');
        }
    }

    render(control: Control) {
        document.getActiveView().updateControlState(this, control, this.state);
    }

    setState(state) {
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(state, this.state)) return;
        // update object state
        this.state = state;
        // update hardware state through view to avoid
        // updating hardware controls not in current view
        for (let control of this.controls) {
            document.getActiveView().updateControlState(this, control, state);
        }
    }

    setControlState(control: Control, state) {
        // implemented in child classes
    }

    // registers event handlers
    on(eventName: string, callback: Function) {
        if (!this.eventHandlers[eventName]) this.eventHandlers[eventName] = [];

        this.eventHandlers[eventName].push(callback);
        return this;
    }

    // handles midi messages routed to control
    onMidi(control: Control, midi: MidiMessage) {
        // implemented in subclasses
    }

    callCallback(eventName: string, ...args) {
        logger.debug(eventName + ' ' + this.name);
        let callbackList = this.eventHandlers[eventName];
        for (let callback of callbackList) {
            if (this.memory[eventName]) this.cancelCallback(eventName);
            callback.apply(this, args);
        }
    }

    cancelCallback(callbackName: string) {
        var memory = this.memory[callbackName];
        if (memory instanceof IntervalTask) memory.cancel();
        delete this.memory[callbackName];
    }
}


export default AbstractComponent;
