import { Component } from '../component';
import { Control } from '../control';

interface View {
    [key: string]: (Component | Component[] | (() => Component | Component[]));
}

class View {
    private static _componentMap: {
        [mode: string]: {
            controls: Control[];
            components: Component[];
        };
    };

    static parent: typeof View;

    static getComponent(control: Control, mode: string): Component | null {
        if (this._componentMap[mode] === undefined) return null;
        const componentMapIndex = this._componentMap[mode].controls.indexOf(control);
        if (componentMapIndex === -1) return null;
        return this._componentMap[mode].components[componentMapIndex];
    }

    static connectControl(control: Control) {
        // check view modes in order for component/control registration
        for (const activeMode of session.activeModes) {
            if (!this._componentMap[activeMode]) continue; // mode not used in view
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
        const instance = new this();
        // give each subclass its own componentMap
        this._componentMap = {};

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
                for (const control of controls as Control[]) {
                    // register control with view/mode
                    if (!this._componentMap[mode])
                        this._componentMap[mode] = {
                            controls: [],
                            components: [],
                        };

                    // if control already registered in view mode, throw error
                    if (this._componentMap[mode].controls.indexOf(control) > -1)
                        throw Error(
                            `Duplicate Control "${control.name}" registration in view mode.`,
                        );

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
