import ApiProxy from './ApiProxy';
import * as api from '../../typings/api';



class CursorNavigationMode extends ApiProxy<api.CursorNavigationMode> {
    static NESTED = 0;
	static FLAT = 1;
	static GUI = 2;
}


export default CursorNavigationMode;
