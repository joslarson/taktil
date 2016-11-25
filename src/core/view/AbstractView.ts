import MidiMessage from '../midi/MidiMessage';
import AbstractComponent from '../component/button/AbstractComponent';
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

        for (let registration of instance.registrations) {
            if (!registration.control && !registration.controls) throw 'Must specify either "control" or "controls" in view component registration list.'
            const controls = registration.control ? [registration.control] : registration.controls;
            const { component, mode } = registration;
            instance.registerComponent(component, controls, mode);
        }

        return instance;
    }

    getParent(): AbstractView {
        return this.parent && this.parent.getInstance();
    }

    // constructor() {
    //     // if (!__is_init__) throw "View objects can only be instantiated during the init phase.";
    // }

    renderControl(control: Control) {
        const parent = this.getParent();

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
        if (parent) {
            parent.renderControl(control);
        } else {
            // TODO toast? maybe send 0 to data2?
        }
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
            const parent = this.getParent();  

            if (parent) {
                parent.onMidi(control, midi);
            } else {
                toast(`Control not implemented in current view/mode stack.`);
            }
        }
    }
}

export default AbstractView;