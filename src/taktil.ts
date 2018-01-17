import { Control, ControlState } from './control';
import { View } from './view';
import { Session } from './session';

// create global session instance
export const session = new Session();

// Controls
////////////////////////

/**
 * Register controls to the session (can only be called once).
 * 
 * @param controls The mapping of control labels to control instances to register
 * to the session. 
 */
export function registerControls(controls: { [label: string]: Control }) {
    session.registerControls(controls);
}

/**
 * Get the mapping of control labels to control instances that have
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
 * @param views The mapping of view labels to view classes to register
 * to the session. 
 */
export function registerViews(views: { [label: string]: typeof View }) {
    return session.registerViews(views);
}

/**
 * Get the mapping of view labels to view classes that have been
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
export function activateView(label: string) {
    return session.activateView(label);
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

export * from './component';
export * from './control';
export * from './helpers';
export * from './message';
export * from './view';
