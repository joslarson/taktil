import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Collection from '../../helpers/Collection';
import Midi from '../../helpers/Midi';
import AbstractComponent from '../component/AbstractComponent';
import Control from '../controller/Control';


export default class View extends AbstractCollectionItem {
    initFunc: Function;
    parent: View;
    componentMap: {
        view: { [controlName: string]: AbstractComponent },
        modes: { [mode: string]: { [controlName: string]: AbstractComponent } },
    } = { view: {}, modes: {} };
    controls: Control[] = [];

    private activeModes: string[] = [];

    constructor(initFunc: Function) {
        super();
        this.initFunc = initFunc;
    }

    init() {
        this.initFunc.apply(this);
    }

    refresh() {
        for (let control of this.controls) {
            let component;
            for (let activeMode of this.getActiveModes()) {
                if (!this.componentMap[activeMode]) continue;  // silent
                const component = this.componentMap[activeMode][control.id];
                if (component) {
                    component.refresh(control);
                    break;
                }
            }
        }
    }

    registerComponent(component: AbstractComponent, controls: Control[]|Control, mode='BASE') {
        controls = controls instanceof Control ? [<Control>controls] : controls;
        // register controls w/ component
        component.register(<Control[]>controls, this);
        for (let control of controls as Control[]) {
            // register control with view
            if (!this.componentMap[mode]) this.componentMap[mode] = {};
            this.componentMap[mode][control.id] = component;

            if (this.controls.indexOf(control) == -1) {
                this.controls.push(control);
            }
        }
    }

    activateMode(mode: string) {
        if (mode === 'BASE') return;
        const modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.activeModes.unshift(mode);  // prepend to activeModes[]
        this.refresh(); // refresh view
    }

    deactivateMode(mode: string) {
        const modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.refresh();
    }

    getActiveModes() {
        return [...this.activeModes, 'BASE'];
    }

    onMidi(control: Control, midi: Midi) {
        let mode: string;
        let component: AbstractComponent;

        // if component in an active mode, let the component in the first associated mode handle
        for (let activeMode of this.getActiveModes()) {
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
                toast(`Control not implemented in view.`);
            }
        }
    }

    updateControlState(component: AbstractComponent, control: Control, state: any): void {
        let componentInView = false;
        for (let activeMode of this.getActiveModes()) {
            if (this.componentMap[activeMode] && this.componentMap[activeMode][control.id]) {
                let modeComponent = this.componentMap[activeMode][control.id];
                if(modeComponent == component || modeComponent == component.parent) {
                    component.setControlState(control, state);
                }

                componentInView = true;
                break;
            }
        }
        // if current view doesn't handle component in available modes, send up to parent
        if (!componentInView && this.parent) {
            this.parent.updateControlState(component, control, state);
        }
    }
}
