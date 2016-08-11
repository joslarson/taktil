import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import StringValue from './StringValue';
import Value from './Value';


class Scene extends ApiProxy<api.Scene> {
    constructor (principal: api.Scene) {
        super(principal);
        this._extendMethodClassMap({
            'getName': StringValue,
        });
    }
}


export default Scene;
