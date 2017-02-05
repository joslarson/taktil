import AbstractView from '../view/AbstractView';
import { areDeepEqual, TimeoutTask } from '../../utils';
import session from '../../session';
import MidiControl from '../midi/MidiControl';
import logger from '../../logger';


abstract class AbstractComponentBase {
    private static instance: AbstractComponentBase;

    parent: typeof AbstractComponentBase;
    name = this.constructor.name;
    midiControls: MidiControl[] = [];
    registrations: Object[] = [];
    views: AbstractView[] = [];
    memory: { [key: string]: any } = {};

    abstract state: any; // depends on component type

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const Component = this as any as { new (): AbstractComponentBase, instance: AbstractComponentBase };
        let instance = Component.instance;

        if (instance instanceof Component) return instance;

        instance = new Component();
        Component.instance = instance; 
        return instance;
    }

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(midiControls: MidiControl[], view: AbstractView) {
        this.registrations.push({'view': view, 'midiControls': midiControls});
        this.midiControls = [...this.midiControls, ...midiControls];
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
        // update hardware state if in view
        for (let midiControl of this.midiControls) {
            if (midiControl.activeComponent === this) this.renderMidiControl(midiControl);
        }
    }

    // renders component state to hardware midiControl
    abstract renderMidiControl(midiControl: MidiControl): void;

    // handles midi messages routed to midiControl
    onValue(midiControl: MidiControl, value: number): void {
        throw 'Not Implemented';
    }

    cancelTimeoutTask(taskName: string) {
        const memory = this.memory[taskName];
        if (memory instanceof TimeoutTask) memory.cancel();
        delete this.memory[taskName];
    }
}


export default AbstractComponentBase;
