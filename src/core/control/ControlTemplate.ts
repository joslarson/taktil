import { Control } from './Control';

export type ControlMap = { [name: string]: Control };

export const ControlTemplate: {
    new <C extends ControlMap>(controls: C): C;
    <C extends ControlMap>(controls: C): C;
} = function ControlTemplate(this: ControlMap, controls: ControlMap) {
    for (const key of Object.keys(controls)) {
        const control = controls[key];
        control.name = key;
        if (new.target) this[key] = control;
    }

    if (new.target) {
        session.controls = this;
    } else {
        session.controls = controls;
        return controls;
    }
} as any;
