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

    connectMidiControl(midiControl: MidiControl) {
        // check view modes in order for component/midiControl registration
        for (let activeMode of session.getActiveModes()) {
            if (!this._componentMap[activeMode]) continue;  // mode not used in view
            const component: AbstractComponentBase = this.getComponent(midiControl, activeMode);
            if (component) { 
                midiControl.activeComponent = component;
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            const parentInstance = this.parent.getInstance();
            parentInstance.connectMidiControl(midiControl);
        } else {
            // no parent? no component to connect to
            midiControl.activeComponent = null;
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
}

export default AbstractView;