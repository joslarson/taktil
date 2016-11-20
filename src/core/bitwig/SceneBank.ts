import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Scene from './Scene';


class SceneBank extends ApiProxy<api.SceneBank> {
    constructor (target: api.SceneBank) {
        super(target);
        this._extendMethodClassMap({
            'getScene': Scene,
        });
    }
}


export default SceneBank;
