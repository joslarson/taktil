import AbstractView from '../../view/AbstractView';
import AbstractCollectionItem from '../../../helpers/AbstractCollectionItem';
import MidiMessage from '../../midi/MidiMessage';
import { areDeepEqual, TimeoutTask } from '../../../utils';
import document from '../../../document';
import AbstractController from '../../controller/AbstractController';
import Control from '../../controller/Control';
import logger from '../../../logger';


let instance: AbstractComponent;

abstract class AbstractComponent {
    private static instance: AbstractComponent;

    name = this.constructor.name;
    parent: typeof AbstractComponent;
    controls: Control[] = [];
    registrations: Object[] = [];
    views: AbstractView[] = [];
    memory: { [key: string]: any } = {};
    state: any; // depends on control type

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const Component = this as any as { new (): AbstractComponent, instance: AbstractComponent };
        let instance = Component.instance;

        if (instance instanceof Component) return instance;

        instance = new Component();
        Component.instance = instance;
        return instance;
    }

    getParent(): AbstractComponent {
        return this.parent && this.parent.getInstance();
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(controls: Control[], view: AbstractView) {
        this.registrations.push({'view': view, 'controls': controls});
        this.controls = [...this.controls, ...controls];
        if (this.views.indexOf(view) === -1) this.views.push(view);
        // call onRegister()
        this.onRegister();
    }

    onRegister() {
        // optionally implemented in child class
    }

    setState(state) {
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(state, this.state)) return;
        // update object state
        this.state = state;
        // update hardware state through view to avoid
        // updating hardware controls not in current view
        for (let control of this.controls) {
            const activeView =  document.getActiveView().getInstance();
            activeView.renderControl(control);
        }
    }

    renderControl(control: Control) {
        // required: implemented in child classes
        throw 'Not Implemented';
    }

    // handles midi messages routed to control
    onMidi(control: Control, midi: MidiMessage) {
        // required: implemented in subclasses
        throw 'Not Implemented';
    }

    cancelTimeoutTask(taskName: string) {
        var memory = this.memory[taskName];
        if (memory instanceof TimeoutTask) memory.cancel();
        delete this.memory[taskName];
    }
}


export default AbstractComponent;
