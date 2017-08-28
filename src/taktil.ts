import { Control, ControlState } from './core/control';
import { View } from './core/view';
import { Session } from './core/session';

export const session = new Session();

// Controls
////////////////////////

/**
 * Register controls to the session (can only be called once).
 * 
 * @param controls The mapping of control names to control instances to register
 * to the session. 
 */
export function registerControls(controls: { [name: string]: Control }) {
    session.registerControls(controls);
}

/**
 * Get the mapping of control names to control instances that have
 * been registered to the session.
 */
export function getControls() {
    return session.controls;
}

/** Force re-render all registered controls. */
export function resetControls() {
    return session.resetControls();
}

// Views
////////////////////////

/**
 * Register views to the session (can only be called once).
 * 
 * @param views The mapping of view names to view classes to register
 * to the session. 
 */
export function registerViews(views: { [name: string]: typeof View }) {
    return session.registerViews(views);
}

/**
 * Get the mapping of view names to view classes that have been
 * registered to the session.
 */
export function getViews() {
    return session.views;
}

/** Get the active view of the session. */
export function getActiveView() {
    return session.activeView;
}

/** Set the active view of the session. */
export function activateView(view: string) {
    return session.activateView(view);
}

// Modes
////////////////////////

/**
 * Get the list of active modes in the order they were activated,
 * from last to first.
 */
export function getActiveModes() {
    return session.activeModes;
}

/** Activate a mode, adding it to the active mode list. */
export function activateMode(mode: string) {
    return session.activateMode(mode);
}

/** Deactivate a given mode, removing it from the active mode list. */
export function deactivateMode(mode: string) {
    return session.deactivateMode(mode);
}

/** Check if a given mode is active. */
export function modeIsActive(mode: string) {
    return session.modeIsActive(mode);
}

// Events
////////////////////////

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

// Core
////////////////////////

export * from './core/component';
export * from './core/control';
export * from './core/helpers';
export * from './core/midi';
export * from './core/view';
