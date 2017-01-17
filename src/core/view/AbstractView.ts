import { MidiMessage, Sysex } from '../midi';
import AbstractComponentBase from '../component/AbstractComponentBase';
import MidiControl from '../midi/MidiControl';
import session from '../../session';
import logger from '../../logger';


// abstract class AbstractView {
//     protected static instance: AbstractView;
//     static getInstance() {
//         // inheritance safe singleton pattern (each child class will have it's own singleton)
//         const View = this as any as { new (): AbstractView, instance: AbstractView };
//         let instance = View.instance;

//         if (instance instanceof View) return instance;

//         instance = new View();
//         View.instance = instance;

//         return instance;
//     }

//     name = this.constructor.name;
//     parent: typeof AbstractView;
//     __componentMap: {
//         [mode: string]: { [midiControlId: string]: AbstractComponentBase }
//     } = {};

//     protected constructor() {}

//     onRegister() {
//         // implemented in child class
//     }

//     renderMidiControl(midiControl: MidiControl) {
//         // check view modes in order for component/midiControl registration
//         for (let activeMode of session.getActiveModes()) {
//             if (!this.__componentMap[activeMode]) continue;  // mode not used in view
//             const component = this.__componentMap[activeMode][midiControl.id];
//             if (component) {
//                 component.renderMidiControl(midiControl);
//                 return;
//             }
//         }
//         // component not found in view? send to parent
//         if (this.parent) {
//             const parentInstance = this.parent.getInstance();
//             parentInstance.renderMidiControl(midiControl);
//         }
//         // no parent? nothing to render.
//     }

//     registerComponent(ComponentClass: typeof AbstractComponentBase, midiControls: MidiControl[]|MidiControl, mode = '__BASE__') {
//         type ComponentClassType = new () => AbstractComponentBase;
//         midiControls = midiControls instanceof MidiControl ? [<MidiControl>midiControls] : midiControls;
//         const component = new (ComponentClass as any as ComponentClassType)();

//         // register midiControls w/ component
//         component.register(<MidiControl[]>midiControls, this);
//         for (let midiControl of midiControls as MidiControl[]) {
//             const registeredControls = session.getRegisteredControls();
//             // register midiControl with view/mode
//             if (!this.__componentMap[mode]) this.__componentMap[mode] = {};
//             this.__componentMap[mode][midiControl.id] = component;
//             // add midiControl to registered midiControl list (if it's not already there)
//             if (registeredControls.indexOf(midiControl) === -1) session.registerControl(midiControl);
//         }
//     }

//     onMidi(midiControl: MidiControl, midi: MidiMessage) {
//         let mode: string;
//         let component: AbstractComponentBase;

//         // if component in an active mode, let the component in the first associated mode handle
//         for (let activeMode of session.getActiveModes()) {
//             if (this.__componentMap[activeMode] && this.__componentMap[activeMode][midiControl.id]) {
//                 mode = activeMode;
//                 component = this.__componentMap[activeMode][midiControl.id];
//                 break;
//             }
//         }

//         if (mode && component) {
//             this.__componentMap[mode][midiControl.id].onMidi(midiControl, midi);
//         } else {
//             if (this.parent) {
//                 const parentInstance = this.parent.getInstance();
//                 parentInstance.onMidi(midiControl, midi);
//             } else {
//                 toast(`Control not implemented in current view/mode stack.`);
//             }
//         }
//     }
// }

abstract class AbstractView {
    protected static instance: AbstractView;
    static getInstance() {
        // inheritance safe singleton pattern (each child class will have it's own singleton)
        const View = this as any as { new (): AbstractView, instance: AbstractView };
        let instance = View.instance;

        if (instance instanceof View) return instance;

        instance = new View();
        View.instance = instance;

        return instance;
    }

    name = this.constructor.name;
    parent: typeof AbstractView;
    __componentMap: { [mode: string]: AbstractComponentBase[] } = {};
    __patternMap: { [mode: string]: { [pattern: string]: AbstractComponentBase }[] } = {};

    protected constructor() {}

    onRegister() {
        // implemented in child class
    }

    renderComponent(component: AbstractComponentBase) {
        // check view modes in order for component/midiControl registration
        for (let mode of session.getActiveModes()) {
            if (!this.__componentMap[mode]) continue;  // mode not used in view
            // if the component exist in the current view, render it
            if (this.__componentMap[mode].indexOf(component) > -1) {
                component.render();
                return;
            }
            // check for conflicting patterns in view before sending to parent
            for (let midiInIndex in this.__patternMap[mode]) {
                for (let viewPattern in this.__patternMap[mode][midiInIndex]) {
                    for (let componentPattern of component.patterns) {
                        let isMatch = true;
                        for (let i = 0; i < 6; i++) {
                            if (viewPattern[i] !== '?' && componentPattern[i] !== '?' && viewPattern[i] !== componentPattern[i]) {
                                isMatch = false;
                                break;
                            }
                        }
                        if (isMatch) return;  // component pattern is overridden in current view
                        // TODO: can't return here because there might be another pattern for a different control that isn't overridden
                    }
                }
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.renderComponent(component);
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
            const { pattern } = midiControl;
            // register midiControl with view/mode
            if (!this.__patternMap[mode]) this.__patternMap[mode] = {};
            for (let str of pattern) {
                // TODO: check parent views as well ad also check for conflicting patterns that are not exactly equal
                if (this.__patternMap[mode][str] !== undefined) throw new Error(`Pattern "${str}" already registered to view.`)
                this.__patternMap[mode][str] = component;
            }
            // add midiControl to registered midiControl list (if it's not already there)
            if (registeredControls.indexOf(midiControl) === -1) session.registerControl(midiControl);
        }
    }

    onMidi(midiMessage: MidiMessage) {
        const { port } = midiMessage;
        let mode: string;
        let component: AbstractComponentBase;

        // if component in an active mode, let the component in the first associated mode handle
        for (let activeMode of session.getActiveModes()) {
            if (this.__patternMap[activeMode] && this.__patternMap[activeMode][port][midiControl.id]) {
                mode = activeMode;
                component = this.__patternMap[activeMode][midiControl.id];
                break;
            }
        }

        if (mode && component) {
            this.__patternMap[mode][midiControl.id].onMidi(midiControl, midiMessage);
        } else {
            if (this.parent) {
                const parentInstance = this.parent.getInstance();
                parentInstance.onMidi(midiControl, midiMessage);
            } else {
                toast(`Control not implemented in current view/mode stack.`);
            }
        }
    }
    onSysex(sysex: Sysex) {
        const { port } = sysex;
        let mode: string;
        let component: AbstractComponentBase;
        // TODO: sysex flow?
    }
}

export default AbstractView;