import MidiMessage from '../midi/MidiMessage';
import AbstractComponent from '../component/AbstractComponent';
import Control from '../controller/Control';
import document from '../../document';
import logger from '../../logger';


abstract class AbstractView {
    protected static instance: AbstractView;

    name = this.constructor.name;
    registrations: {
        component: typeof AbstractComponent,
        control?: Control,
        controls?: Control[],
        mode?: string,
    }[] = [];
    parent: typeof AbstractView;
    componentMap: {
        [mode: string]: { [controlId: string]: AbstractComponent }
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

    renderControl(control: Control) {
        // check view modes in order for component/control registration
        for (let activeMode of document.getActiveModes()) {
            if (!this.componentMap[activeMode]) continue;  // mode not used in view
            const component = this.componentMap[activeMode][control.id];
            if (component) {
                component.renderControl(control);
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.renderControl(control);
        }
        // no parent? nothing to render.
    }

    registerComponent(ComponentClass: typeof AbstractComponent, controls: Control[]|Control, mode = '__BASE__') {
        type ComponentClassType = new () => AbstractComponent;
        controls = controls instanceof Control ? [<Control>controls] : controls;
        const component = new (ComponentClass as any as ComponentClassType)();

        // register controls w/ component
        component.register(<Control[]>controls, this);
        for (let control of controls as Control[]) {
            const registeredControls = document.getRegisteredControls();
            // register control with view/mode
            if (!this.componentMap[mode]) this.componentMap[mode] = {};
            this.componentMap[mode][control.id] = component;
            // add control to registered control list (if it's not already there)
            if (registeredControls.indexOf(control) === -1) document.registerControl(control);
        }
    }

    onMidi(control: Control, midi: MidiMessage) {
        let mode: string;
        let component: AbstractComponent;

        // if component in an active mode, let the component in the first associated mode handle
        for (let activeMode of document.getActiveModes()) {
            if (this.componentMap[activeMode] && this.componentMap[activeMode][control.id]) {
                mode = activeMode;
                component = this.componentMap[activeMode][control.id];
                break;
            }
        }

        if (mode && component) {
            this.componentMap[mode][control.id].onMidi(control, midi);
        } else {
            if (this.parent) {
                const parentInstance = this.parent.getInstance();
                parentInstance.onMidi(control, midi);
            } else {
                toast(`Control not implemented in current view/mode stack.`);
            }
        }
    }
}

export default AbstractView;