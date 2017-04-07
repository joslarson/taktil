import { AbstractSimpleControl } from 'taktil';


export default class MaschineButton extends AbstractSimpleControl {
    state = { value: 0 };

    cacheOnMidiIn = false;
}
