import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';

import BrowserFilterColumn from './BrowserFilterColumn';


class BrowserFilterColumnBank extends ApiProxy<api.BrowserFilterColumnBank> {
    constructor (target: api.BrowserFilterColumnBank) {
        super(target);
        this._extendMethodClassMap({
            'getItem': BrowserFilterColumn,
        });
    }
}


export default BrowserFilterColumnBank;
