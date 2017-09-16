import { Component } from '../component';
import { Control } from '../control';
import { Session } from '../session';

export class View {
    private static _componentMap: {
        [mode: string]: {
            controls: Control[];
            components: Component[];
        };
    };
    static label: string;
    static extends: typeof View[] = [];
    static session: Session;

    static getComponent(control: Control, mode: string): Component | null {
        // check in current view
        if (this._componentMap[mode] !== undefined) {
            const componentMapIndex = this._componentMap[mode].controls.indexOf(control);
            if (componentMapIndex !== -1) {
                return this._componentMap[mode].components[componentMapIndex];
            }
        }
        // component not found in view? check in parents
        for (const ancestor of this.extends) {
            const component = ancestor.getComponent(control, mode);
            if (component) return component;
        }
        // not in current view, no parent to check? return null
        return null;
    }

    static connectControl(control: Control) {
        // check view modes in order for component/control registration
        let component = null;
        for (const activeMode of this.session.activeModes) {
            component = this.getComponent(control, activeMode);
            // if component is not null, we're done looking
            if (component) break;
        }
        // only set the component when it has changed
        if (control.activeComponent !== component) control.activeComponent = component;
    }

    static init(session: Session) {
        // connect the session
        this.session = session;
        // instance gives us component mapping
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
                // set component label and view
                component.label = isSingleComponent ? key : `${key}[${i}]`;

                // register components and controls in view
                const { control, params: { mode } } = component;
                // register control with view/mode
                if (!this._componentMap[mode])
                    this._componentMap[mode] = {
                        controls: [],
                        components: [],
                    };

                // if control already registered in view mode, throw error
                if (this._componentMap[mode].controls.indexOf(control) > -1)
                    throw Error(`Duplicate Control "${control.label}" registration in view mode.`);

                // add control and component pair to component map
                this._componentMap[mode].controls.push(control);
                this._componentMap[mode].components.push(component);
                // initialize component
                if (component.onInit) component.onInit();
            }
        });
    }

    // view should not be instantiated by user
    protected constructor() {}

    [key: string]: Component | Component[] | (() => Component | Component[]);
}
