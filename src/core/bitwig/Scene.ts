import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import StringValue from './StringValue';
import Value from './Value';


class Scene extends ApiProxy<api.Scene> {
    constructor (target: api.Scene) {
        super(target);
        this._extendMethodClassMap({
            'getName': StringValue,
        });
    }
}


export default Scene;
