import { document, AbstractView } from 'typewig';
import { controls } from '../controllers/TransportController';

import * as components from '../components';


export default class BaseView extends AbstractView {
    // parent = BaseView;
    registrations = [
        { component: components.PlayToggle, control: controls.PLAY },
        { component: components.MetronomeToggle, control: controls.PLAY, mode: 'SHIFT' },
        { component: components.PreRollToggle, control: controls.REC, mode: 'SHIFT' },
        { component: components.RestartButton, control: controls.RESTART },
        { component: components.OverwriteToggle, control: controls.REC },
        { component: components.ShiftModeGate, control: controls.SHIFT },
        { component: components.LoopToggle, control: controls.RESTART, mode: 'SHIFT' },
    ];
}
