import { MidiMessage, SysexMessage } from '../midi';
import AbstractComponentBase from '../component/AbstractComponentBase';
import MidiControl from '../midi/MidiControl';
import session from '../../session';
import logger from '../../logger';


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
    _componentMap: { [mode: string]: { midiControls: MidiControl[], components: AbstractComponentBase[] } } = {};

    protected constructor() {}

    getComponent(midiControl: MidiControl, mode: string, ifDoesNotExists = undefined) {
        if (this._componentMap[mode] === undefined) return ifDoesNotExists;
        const componentMapIndex = this._componentMap[mode].midiControls.indexOf(midiControl);
        if (componentMapIndex === -1) return ifDoesNotExists;
        return this._componentMap[mode].components[componentMapIndex];
    }

    renderMidiControl(midiControl: MidiControl) {
        // check view modes in order for component/midiControl registration
        for (let activeMode of session.getActiveModes()) {
            if (!this._componentMap[activeMode]) continue;  // mode not used in view
            const component = this.getComponent(midiControl, activeMode);
            if (component) {
                component.renderMidiControl(midiControl);
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.renderMidiControl(midiControl);
        } else {
            // no parent? no component to render, reset midi control
            midiControl.renderDefaultState();
        }
    }

    registerComponent(ComponentClass: typeof AbstractComponentBase, midiControls: MidiControl[]|MidiControl, mode = '__BASE__') {
        type ComponentClassType = new () => AbstractComponentBase;
        midiControls = midiControls instanceof MidiControl ? [<MidiControl>midiControls] : midiControls;
        const component = new (ComponentClass as any as ComponentClassType)();

        // register midiControls w/ component
        component.register(<MidiControl[]>midiControls, this);
        for (let midiControl of midiControls as MidiControl[]) {
            // register midiControl with view/mode
            if (!this._componentMap[mode]) this._componentMap[mode] = { midiControls: [], components: [] };

            // if midiControl already registered in view mode, throw error
            if (this._componentMap[mode].midiControls.indexOf(midiControl) > -1) throw Error('Duplicate MidiControl registration in view mode.');

            // add midiControl and component pair to component map
            this._componentMap[mode].midiControls.push(midiControl);
            this._componentMap[mode].components.push(component);

            // add midiControl to registered midiControl list (if it's not already there)
            if (session.getRegisteredMidiControls().indexOf(midiControl) === -1) session.registerMidiControl(midiControl);
        }
    }

    onRegister() {
        // optionally implemented in child class
    }

    onMidi(midiControl: MidiControl, midiMessage: MidiMessage) {
        let mode: string;
        let component: AbstractComponentBase;

        // if component in an active mode, let the component in the first associated mode handle
        for (let activeMode of session.getActiveModes()) {
            component = this.getComponent(midiControl, activeMode);
            if (component) {
                mode = activeMode;
                break;
            }
        }

        if (mode && component) {
            component.onValue(midiControl, midiControl.getValueFromMessage(midiMessage));
        } else {
            if (this.parent) {
                const parentInstance = this.parent.getInstance();
                parentInstance.onMidi(midiControl, midiMessage);
            } else {
                midiControl.renderDefaultState();
                session.midiOut.updateMidiOutCacheWithMidiInput(midiMessage);
                logger.info(`MidiControl "${midiControl.name}" is unused in active view stack.`);
            }
        }
    }

    onSysex(sysex: SysexMessage) {
        const { port } = sysex;
        let mode: string;
        let component: AbstractComponentBase;
        // TODO: sysex flow?
    }
}

export default AbstractView;