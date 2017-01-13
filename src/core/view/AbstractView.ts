import MidiMessage from '../midi/MidiMessage';
import AbstractComponentBase from '../component/AbstractComponentBase';
import MidiControl from '../midi/MidiControl';
import session from '../../session';
import logger from '../../logger';


abstract class AbstractView {
    protected static instance: AbstractView;

    name = this.constructor.name;
    parent: typeof AbstractView;
    componentMap: {
        [mode: string]: { [midiControlId: string]: AbstractComponentBase }
    } = {};

    protected constructor() {}

    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const View = this as any as { new (): AbstractView, instance: AbstractView };
        let instance = View.instance;

        if (instance instanceof View) return instance;

        instance = new View();
        View.instance = instance;

        return instance;
    }

    onRegister() {
        // implemented in child class
    }

    renderMidiControl(midiControl: MidiControl) {
        // check view modes in order for component/midiControl registration
        for (let activeMode of session.getActiveModes()) {
            if (!this.componentMap[activeMode]) continue;  // mode not used in view
            const component = this.componentMap[activeMode][midiControl.id];
            if (component) {
                component.renderMidiControl(midiControl);
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.renderMidiControl(midiControl);
        }
        // no parent? nothing to render.
    }

    registerComponent(ComponentClass: typeof AbstractComponentBase, midiControls: MidiControl[]|MidiControl, mode = '__BASE__') {
        type ComponentClassType = new () => AbstractComponentBase;
        midiControls = midiControls instanceof MidiControl ? [<MidiControl>midiControls] : midiControls;
        const component = new (ComponentClass as any as ComponentClassType)();

        // register midiControls w/ component
        component.register(<MidiControl[]>midiControls, this);
        for (let midiControl of midiControls as MidiControl[]) {
            const registeredControls = session.getRegisteredControls();
            // register midiControl with view/mode
            if (!this.componentMap[mode]) this.componentMap[mode] = {};
            this.componentMap[mode][midiControl.id] = component;
            // add midiControl to registered midiControl list (if it's not already there)
            if (registeredControls.indexOf(midiControl) === -1) session.registerControl(midiControl);
        }
    }

    onMidi(midiControl: MidiControl, midi: MidiMessage) {
        let mode: string;
        let component: AbstractComponentBase;

        // if component in an active mode, let the component in the first associated mode handle
        for (let activeMode of session.getActiveModes()) {
            if (this.componentMap[activeMode] && this.componentMap[activeMode][midiControl.id]) {
                mode = activeMode;
                component = this.componentMap[activeMode][midiControl.id];
                break;
            }
        }

        if (mode && component) {
            this.componentMap[mode][midiControl.id].onMidi(midiControl, midi);
        } else {
            if (this.parent) {
                const parentInstance = this.parent.getInstance();
                parentInstance.onMidi(midiControl, midi);
            } else {
                toast(`Control not implemented in current view/mode stack.`);
            }
        }
    }
}

export default AbstractView;