import MidiMessage from '../midi/MidiMessage';
import AbstractComponent from '../component/button/AbstractComponent';
import Control from '../controller/Control';
import document from '../../document';


export default class View {
    parent: View;
    componentMap: {
        [mode: string]: { [controlId: string]: AbstractComponent }
    } = {};

    constructor() {
        // if (!__is_init__) throw "View objects can only be instantiated during the init phase.";
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
            this.parent.renderControl(control);
        } else {
            // TODO toast? maybe send 0 to data2?
        }
    }

    registerComponent(ComponentClass: new () => AbstractComponent, controls: Control[]|Control, mode = '__BASE__') {
        controls = controls instanceof Control ? [<Control>controls] : controls;
        const component = new ComponentClass();

        // register controls w/ component
        component.register(<Control[]>controls, this);
        for (let control of controls as Control[]) {
            const registeredControls = document.controls;
            // register control with view/mode
            if (!this.componentMap[mode]) this.componentMap[mode] = {};
            this.componentMap[mode][control.id] = component;
            // add control to registered control list (if it's not already there)
            if (registeredControls.indexOf(control) === -1) registeredControls.push(control);
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
                this.parent.onMidi(control, midi);
            } else {
                toast(`Control not implemented in current view/mode stack.`);
            }
        }
    }
}
