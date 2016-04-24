import AbstractControl from './AbstractControl';
import View from '../view/View';
import DeviceControl from '../device/DeviceControl';
import Midi from '../../helpers/Midi';


export default class ControlSet extends AbstractControl {
    ctrlMap: { [key: string]: AbstractControl } = {};
    createCtrl: Function;

    register(deviceCtrls:DeviceControl[], view:View) {
        super.register(deviceCtrls, view);

        for (let i = 0; i < deviceCtrls.length; i++) {
            let deviceCtrl = deviceCtrls[i];
            // create/add Control
            let ctrl: AbstractControl = this.createCtrl.apply(this, [i]);
            ctrl.parent = this;
            this.ctrlMap[deviceCtrl.name()] = ctrl;
            // register Control
            ctrl.register([deviceCtrl], view);
        }
    }

    refresh(deviceCtrl:DeviceControl) {
        // pass on refresh to corresponding control
        this.ctrlMap[deviceCtrl.name()].refresh(deviceCtrl);
    }

    setCreatCtrlCallback(callback:Function) {
        this.createCtrl = callback;
        return this;
    }

    setHwCtrlState(deviceCtrl:DeviceControl, state) {
        // pass on state to corresponding control
        this.ctrlMap[deviceCtrl.name()].setDeviceCtrlState(deviceCtrl, state);
    }

    onMidi(deviceCtrl:DeviceControl, midi:Midi) {
        // pass on midi to corresponding control
        this.ctrlMap[deviceCtrl.name()].onMidi(deviceCtrl, midi);
    }
}
