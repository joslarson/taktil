import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import DeviceChain from './DeviceChain';
import DeviceLayerBank from './DeviceLayerBank';
import DeviceSlot from './DeviceSlot';
import ModulationSource from './ModulationSource';
import DeviceBank from './DeviceBank';
import CursorDeviceLayer from './CursorDeviceLayer';
import DirectParameterValueDisplayObserver from './DirectParameterValueDisplayObserver';
import AutomatableRangedValue from './AutomatableRangedValue';
import Macro from './Macro';
import Value from './Value';
import BooleanValue from './BooleanValue';
import DrumPadBank from './DrumPadBank';
import Browser from './Browser';


class Device extends ApiProxy<api.Device> {
    constructor (target: api.Device) {
        super(target);
        this._extendMethodClassMap({
            'getDeviceChain': DeviceChain,
            'getParameter': AutomatableRangedValue,
            'getEnvelopeParameter': AutomatableRangedValue,
            'getCommonParameter': AutomatableRangedValue,
            'getModulationSource': ModulationSource,
            'getMacro': Macro,
            'createDeviceBrowser': Browser,
            'getCursorSlot': DeviceSlot,
            'createLayerBank': DeviceLayerBank,
            'createDrumPadBank': DrumPadBank,
            'createCursorLayer': CursorDeviceLayer,
            'createSiblingsDeviceBank': DeviceBank,
        });
    }
}


export default Device;
