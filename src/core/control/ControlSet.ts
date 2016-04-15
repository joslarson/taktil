import AbstractControl from './AbstractControl';


export default class ControlSet extends AbstractControl {
    ctrlMap: { [key: string]: AbstractControl } = {};
    createCtrl: Function;

    register(hwCtrlNameSet, view) {
        super.register(hwCtrlNameSet, view);

        for (let i = 0; i < hwCtrlNameSet.length; i++) {
            let hwCtrlName = hwCtrlNameSet[i];
            // create/add Control
            let ctrl: AbstractControl = this.createCtrl.apply(this, [i]);
            ctrl.parent = this;
            this.ctrlMap[hwCtrlName] = ctrl;
            // register Control
            ctrl.register([hwCtrlName], view);
        }
    }

    refresh(hwCtrlName: string) {
        // pass on refresh to corresponding control
        this.ctrlMap[hwCtrlName].refresh(hwCtrlName);
    }

    setCreatCtrlCallback(callback: Function) {
        this.createCtrl = callback;
        return this;
    }

    setHwCtrlState(hwCtrlName: string, state: any) {
        // pass on state to corresponding control
        this.ctrlMap[hwCtrlName].setHwCtrlState(hwCtrlName, state);
    }

    onMidi(hwCtrlName: string, midi: Midi) {
        // pass on midi to corresponding control
        this.ctrlMap[hwCtrlName].onMidi(hwCtrlName, midi);
    }
}
