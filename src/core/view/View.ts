import { Component } from '../component';
import { Control } from '../control';


interface View {
    [key: string]: (
        Component | Component[] | (() => Component | Component[])
    );
}

abstract class View {
    static parent: typeof View;
    private static _instance: View;
    private static _componentMap: { [mode: string]: {
        controls: Control[], components: Component[],
    } };

    static get instance() {
        // inheritance safe singleton pattern (each child class will have its own singleton)
        const View = this as any as { new (): View, _instance: View };
        let instance = View._instance;

        if (instance instanceof View) return instance;
        // force every child class to create/use its own static _componentMap
        // object, instead of sharing one.
        this._componentMap = {};
        instance = new View();
        View._instance = instance;

        return instance;
    }

    static getComponent(control: Control, mode: string): Component | null {
        if (this._componentMap[mode] === undefined) return null;
        const componentMapIndex = this._componentMap[mode].controls.indexOf(control);
        if (componentMapIndex === -1) return null;
        return this._componentMap[mode].components[componentMapIndex];
    }

    static connectControl(control: Control) {
        const instance = this.instance;
        // check view modes in order for component/control registration
        for (let activeMode of session.activeModes) {
            if (!this._componentMap[activeMode]) continue;  // mode not used in view
            const component = this.getComponent(control, activeMode);
            if (component) {
                // only set the component when it has changed
                if (control.activeComponent !== component) control.activeComponent = component;
                return;
            }
        }
        // component not found in view? send to parent
        if (this.parent) {
            this.parent.connectControl(control);
        } else {
            // no parent? no component to connect to
            control.activeComponent = null;
        }
    }

    static init() {
        const instance = this.instance;
        Object.getOwnPropertyNames(instance).map(key => {
            let value = instance[key];
            value = typeof value === 'function' ? value() : value;
            const components = value instanceof Array ? value : [value];
            for (let i = 0; i < components.length; i += 1) {
                const component = components[i];
                const isSingleComponent = components.length === 1;
                // skip non-component properties
                if (component instanceof Component === false) continue;
                // set component name and view
                component.name = isSingleComponent ? key : `${key}[${i}]`;
                component.view = this;
                // register components and controls in view
                const { controls, mode } = component;
                for (let control of controls as Control[]) {
                    // register control with view/mode
                    if (!this._componentMap[mode]) this._componentMap[mode] = {
                        controls: [], components: [],
                    };

                    // if control already registered in view mode, throw error
                    if (this._componentMap[mode].controls.indexOf(control) > -1) throw Error('Duplicate Control registration in view mode.');

                    // add control and component pair to component map
                    this._componentMap[mode].controls.push(control);
                    this._componentMap[mode].components.push(component);
                    // initialize component
                    if (component.onInit) component.onInit();
                }
            }
        });
    }

    // view should be instantiated through `get instance` method, not `new`
    protected constructor() {}
}

export default View;
