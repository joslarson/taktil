import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Channel from './Channel';
import Cursor from './Cursor';
import Device from './Device';


class CursorDevice extends Cursor {
    constructor (target: api.CursorDevice) {
        super(target);
        this._extendMethodClassMap({
            'getChannel': Channel,
        });
    }
}


export default CursorDevice;
