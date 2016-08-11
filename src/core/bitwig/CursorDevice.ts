import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Channel from './Channel';
import Cursor from './Cursor';
import Device from './Device';


class CursorDevice extends Cursor {
    constructor (principal: api.CursorDevice) {
        super(principal);
        this._extendMethodClassMap({
            'getChannel': Channel,
        });
    }
}


export default CursorDevice;
