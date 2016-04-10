import {isCc, isNote} from '../utils';


abstract class AbstractDevice {
    hwCtrls: HardwareCtrls;
    reverseHwCtrlsMap: ReverseHardwareCtrlsMap;

    constructor(hwCtrls: HardwareCtrls) {
        this.hwCtrls = hwCtrls;
        this.reverseHwCtrlsMap = this.getReverseHwCtrlsMap();
    }

    arePressed(...hwCtrlNames) {
    	var result = true;
    	for (let hwCtrlName of hwCtrlNames) {
    		var d2 = this.hwCtrls[hwCtrlName].d2;
    		if (!d2) {
    			result = false;
    			break;
    		}
    	}
    	return result;
    }

    getReverseHwCtrlsMap(): ReverseHardwareCtrlsMap {
        var result: ReverseHardwareCtrlsMap = {};
        for (let hwCtrlName in this.hwCtrls) {
            var ctrl: HardwareCtrl = this.hwCtrls[hwCtrlName];
            if (!result[ctrl.s]) result[ctrl.s] = {};
            result[ctrl.s][ctrl.d1] = hwCtrlName;
        }
        return result;
    }

    getHwCtrlName(midi: Midi) {
        return this.reverseHwCtrlsMap[midi.s][midi.d1];
    }

    updateHwCtrl(midi: Midi) {
        // ignore all midi accept cc and note messages
        if (!isCc(midi.s) && !isNote(midi.s)) return;
        var hwCtrlName = this.getHwCtrlName(midi);
        this.hwCtrls[hwCtrlName].d2 = midi.d2;
    }
}

export default AbstractDevice;
