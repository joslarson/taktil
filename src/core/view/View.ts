import {AbstractCollectionItem} from '../../helpers';
import {AbstractControl} from '../control';


export default class View extends AbstractCollectionItem {
    parent: View;
    ctrls: { [key: string]: { [key: string]: AbstractControl } } = { 'BASE': {} };
    ctrlMap: { [key: string]: { [key: string]: string } } = { 'BASE': {} };
    hwCtrlNames: string[] = [];
    activeModes: string[] = [];
    initFunc: Function;

    constructor(initFunc: Function) {
        super();
        this.initFunc = initFunc;
    }

    init() {
        this.initFunc.apply(this);
    }

    refresh() {
        for (let hwCtrlName of this.hwCtrlNames) {
            for (let activeMode of this.getActiveModes()) {
                if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][hwCtrlName]) {
                    var ctrlName = this.ctrlMap[activeMode][hwCtrlName];
                    var ctrl = this.ctrls[activeMode][ctrlName];
                    ctrl.refresh(hwCtrlName);
                    break;
                }
            }
        }
    }

    registerCtrl(ctrl: AbstractControl, hwCtrlNames, mode='BASE') {
        if (typeof hwCtrlNames === 'string') hwCtrlNames = [hwCtrlNames];
        log(ctrl);
        ctrl.register(hwCtrlNames, this);
        for (let hwCtrlName of hwCtrlNames) {
            // register hwCtrl w/ ctrl
            // register hwCtrl with view
            if (!this.ctrlMap[mode]) this.ctrlMap[mode] = {};
            this.ctrlMap[mode][hwCtrlName] = ctrl.name();

            if (!this.ctrls[mode]) this.ctrls[mode] = {};
            this.ctrls[mode][ctrl.name()] = ctrl;

            if (this.hwCtrlNames.indexOf(hwCtrlName) == -1) {
                this.hwCtrlNames.push(hwCtrlName);
            }
        }
    }

    activateMode(mode: string) {
        var modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.activeModes.unshift(mode);  // prepend to activeModes[]
        this.refresh(); // refresh view
    }

    deactivateMode(mode: string) {
        var modeIndex = this.activeModes.indexOf(mode);
        if (modeIndex > -1) this.activeModes.splice(modeIndex, 1);
        this.refresh();
    }

    getActiveModes() {
        var result = this.activeModes.slice(0);
        result.push('BASE');
        return result;
    }

    onMidi(hwCtrlName, midi) {
        var mode;
        var ctrlName;
        // if ctrl in an active mode, let the ctrl in the first associates mode handle
        for (let activeMode of this.getActiveModes()) {
            if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][hwCtrlName]) {
                ctrlName = this.ctrlMap[activeMode][hwCtrlName];
                mode = activeMode;
                break;
            }
        }

        if (mode && ctrlName) {
            this.ctrls[mode][ctrlName].onMidi(hwCtrlName, midi);
        } else {
            if (this.parent) {
                this.parent.onMidi(hwCtrlName, midi);
            } else {
                toast(`Control "${hwCtrlName}" not implemented in view.`);
            }
        }
    }

    updateHwCtrlState(ctrl: AbstractControl, hwCtrlName: string, state: any) {
        var ctrlInView = false;
        for (let activeMode of this.getActiveModes()) {
            if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][hwCtrlName]) {
                var modeCtrlName = this.ctrlMap[activeMode][hwCtrlName];
                var modeCtrl = this.ctrls[activeMode][modeCtrlName];

                ctrlInView = true;

                if(modeCtrl == ctrl || modeCtrl == ctrl.parent) {
                    ctrl.setHwCtrlState(hwCtrlName, state);
                }
                break;
            }
        }

        if (!ctrlInView && this.parent) {
            this.parent.updateHwCtrlState(ctrl, hwCtrlName, state);
        } else {
            // pass
        }
    }
}
