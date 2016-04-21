import {Collection} from '../../helpers';
import View from './View';


export default class ViewCollection extends Collection<View> {
    active: View;

    init(): void {
        for (let view of this.items()) view.init();
    }
}
