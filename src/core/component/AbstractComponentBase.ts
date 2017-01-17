import AbstractView from '../view/AbstractView';
import MidiMessage from '../midi/MidiMessage';
import { areDeepEqual, TimeoutTask } from '../../utils';
import session from '../../session';
import AbstractMidiController from '../midi/AbstractMidiController';
import MidiControl from '../midi/MidiControl';
import logger from '../../logger';


// abstract class AbstractComponentBase {
//     private static instance: AbstractComponentBase;

//     parent: typeof AbstractComponentBase;
//     name = this.constructor.name;
//     midiControls: MidiControl[] = [];
//     registrations: Object[] = [];
//     views: AbstractView[] = [];
//     memory: { [key: string]: any } = {};

//     abstract state: any; // depends on midiControl type

//     protected constructor() {}

//     static getInstance() {
//         // inheritance safe singleton pattern (each child class will have it's own singleton)
//         const Component = this as any as { new (): AbstractComponentBase, instance: AbstractComponentBase };
//         let instance = Component.instance;

//         if (instance instanceof Component) return instance;

//         instance = new Component();
//         Component.instance = instance; 
//         return instance;
//     }

//     // called when button is registered to a view for the first time
//     // allows running of code that is only aloud in the api's init function
//     register(midiControls: MidiControl[], view: AbstractView) {
//         this.registrations.push({'view': view, 'midiControls': midiControls});
//         this.midiControls = [...this.midiControls, ...midiControls];
//         if (this.views.indexOf(view) === -1) this.views.push(view);
//         // call onRegister()
//         this.onRegister();
//     }

//     onRegister() {
//         // optionally implemented in child class
//     }

//     setState(state) {
//         // if the state isn't changing, there's nothing to do.
//         if (areDeepEqual(state, this.state)) return;
//         // update object state
//         this.state = state;
//         // update hardware state through view to avoid
//         // updating hardware midiControls not in current view
//         for (let midiControl of this.midiControls) {
//             const activeView = session.getActiveView().getInstance();
//             activeView.renderComponent(midiControl);
//         }
//     }

//     // renders component state to hardware midiControl
//     abstract renderMidiControl(midiControl: MidiControl): void;

//     // handles midi messages routed to midiControl
//     onMidi(midiControl: MidiControl, midi: MidiMessage): void {
//         throw 'Not Implemented';
//     }

//     onSysex(midiControl: MidiControl, msg: string): void  {
//         throw 'Not Implemented';
//     }

//     cancelTimeoutTask(taskName: string) {
//         const memory = this.memory[taskName];
//         if (memory instanceof TimeoutTask) memory.cancel();
//         delete this.memory[taskName];
//     }
// }


abstract class AbstractComponentBase {
    private static instance: AbstractComponentBase;
    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const Component = this as any as { new (): ComponentBase, instance: ComponentBase };
        let instance = Component.instance;

        if (instance instanceof Component) return instance;

        instance = new Component();
        Component.instance = instance;
        return instance;
    }

    name = this.constructor.name;
    abstract filter: string | RegExp | ((midiMessage: MidiMessage) => boolean);
    protected __views: AbstractView[] = [];
    protected abstract __state: any; // depends on component
    protected constructor() {}

    // called when button is registered to a view for the first time
    // allows running of code that is only aloud in the api's init function
    register(view: AbstractView) {
        if (this.__views.indexOf(view) === -1) this.__views.push(view);
    }

    // renders component state to hardware
    abstract render(): void;

    // handles midi messages routed to component
    onMidi(pattern: string, midi: MidiMessage): void {
        throw 'Not Implemented';
    }

    onSysex(msg: string): void  {
        throw 'Not Implemented';
    }

    setState(state) {
        // if the state isn't changing, there's nothing to do.
        if (areDeepEqual(state, this.__state)) return;
        // update object state
        this.__state = state;
        // update hardware state through view to avoid
        // updating hardware controls not in current view
        const activeView = session.getActiveView().getInstance();
        // activeView.renderComponent(this);
    }
}


export default AbstractComponentBase;
