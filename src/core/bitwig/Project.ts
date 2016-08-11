import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import Track from './Track';


class Project extends ApiProxy<api.Project> {
    constructor (principal: api.Project) {
        super(principal);
        this._extendMethodClassMap({
            'getRootTrackGroup': Track,
            'getShownTopLevelTrackGroup': Track,
        });
    }
}


export default Project;
