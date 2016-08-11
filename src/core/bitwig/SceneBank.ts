import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Scene from './Scene';


class SceneBank extends ApiProxy<api.SceneBank> {
    constructor (principal: api.SceneBank) {
        super(principal);
        this._extendMethodClassMap({
            'getScene': Scene,
        });
    }
}


export default SceneBank;
