import taktil from 'taktil';

import { PlayToggle } from './components';
import { controls } from './controls';
import { daw } from './daw';

class BaseView extends taktil.View {
    playButton = new PlayToggle(controls.PLAY, { transport: daw.transport });
}

export const views = {
    BASE: BaseView,
};
