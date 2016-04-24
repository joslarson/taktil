import AbstractCollectionItem from '../../helpers/AbstractCollectionItem';
import Collection from '../../helpers/Collection';
import Midi from '../../helpers/Midi';
import AbstractControl from '../control/AbstractControl';
import DeviceControl from '../device/DeviceControl';


export default class View extends AbstractCollectionItem {
    initFunc: Function;
    parent: View;
    ctrlMap: { [mode: string]: { [deviceCtrlName: string]: AbstractControl } } = { 'BASE': {} };
    deviceCtrls: DeviceControl[] = [];

    private activeModes: string[] = [];

    constructor(initFunc: Function) {
        super();
        this.initFunc = initFunc;
    }

    init() {
        this.initFunc.apply(this);
    }

    refresh() {
        for (let deviceCtrl of this.deviceCtrls) {
            for (let activeMode of this.getActiveModes()) {
                if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][deviceCtrl.id]) {
                    let ctrl = this.ctrlMap[activeMode][deviceCtrl.id];
                    ctrl.refresh(deviceCtrl);
                    break;
                }
            }
        }
    }

    registerCtrl(ctrl: AbstractControl, deviceCtrls:DeviceControl[]|DeviceControl, mode='BASE') {
        if (deviceCtrls instanceof DeviceControl) {
            deviceCtrls = [<DeviceControl>deviceCtrls];
        }
        // register deviceCtrls w/ ctrl
        ctrl.register(<DeviceControl[]>deviceCtrls, this);
        for (let deviceCtrl of <DeviceControl[]>deviceCtrls) {
            // register deviceCtrl with view
            if (!this.ctrlMap[mode]) this.ctrlMap[mode] = {};
            this.ctrlMap[mode][deviceCtrl.id] = ctrl;

            if (this.deviceCtrls.indexOf(deviceCtrl) == -1) {
                this.deviceCtrls.push(deviceCtrl);
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

    onMidi(deviceCtrl: DeviceControl, midi: Midi) {
        let mode: string;
        let ctrl: AbstractControl;

        // if ctrl in an active mode, let the ctrl in the first associates mode handle
        for (let activeMode of this.getActiveModes()) {
            if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][deviceCtrl.id]) {
                mode = activeMode;
                ctrl = this.ctrlMap[activeMode][deviceCtrl.id];
                break;
            }
        }

        if (mode && ctrl) {
            this.ctrlMap[mode][deviceCtrl.id].onMidi(deviceCtrl, midi);
        } else {
            if (this.parent) {
                this.parent.onMidi(deviceCtrl, midi);
            } else {
                toast(`Control not implemented in view.`);
            }
        }
    }

    updateDeviceCtrlState(ctrl: AbstractControl, deviceCtrl: DeviceControl, state: any): void {
        let ctrlInView = false;
        for (let activeMode of this.getActiveModes()) {
            if (this.ctrlMap[activeMode] && this.ctrlMap[activeMode][deviceCtrl.id]) {
                let modeCtrl = this.ctrlMap[activeMode][deviceCtrl.id];
                if(modeCtrl == ctrl || modeCtrl == ctrl.parent) {
                    ctrl.setDeviceCtrlState(deviceCtrl, state);
                }

                ctrlInView = true;
                break;
            }
        }
        // if current view doesn't handle ctrl in available modes, send up to parent
        if (!ctrlInView && this.parent) {
            this.parent.updateDeviceCtrlState(ctrl, deviceCtrl, state);
        }
    }
}
