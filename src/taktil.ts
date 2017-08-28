import { Control, ControlState } from './core/control';
import { View } from './core/view';
import { Session } from './core/session';

export const session = new Session();

export function registerControls(controls: { [name: string]: Control }) {
    session.registerControls(controls);
}

export function getControls() {
    return session.controls;
}

export function registerViews(views: { [name: string]: typeof View }) {
    return session.registerViews(views);
}

export function getViews() {
    return session.views;
}

export function getActiveView() {
    return session.activeView;
}

export function activateView(view: string) {
    return session.activateView(view);
}

export function getActiveModes() {
    return session.activeModes;
}

export function activateMode(mode: string) {
    return session.activateMode(mode);
}

export function deactivateMode(mode: string) {
    return session.deactivateMode(mode);
}

export function modeIsActive(mode: string) {
    return session.modeIsActive(mode);
}

export function on(
    label: 'activateMode' | 'deactivateMode',
    callback: (mode: string) => void
): void;
export function on(label: 'activateView', callback: (view: typeof View) => void): void;
export function on(
    label: 'init' | 'registerControls' | 'registerViews' | 'flush' | 'exit',
    callback: () => void
): void;
export function on(label: any, callback: (...args: any[]) => any) {
    session.on(label, callback);
}

export * from './core/component';
export * from './core/control';
export * from './core/helpers';
export * from './core/midi';
export * from './core/view';
