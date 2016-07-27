import Collection from '../../helpers/Collection';
import View from './View';


export default class ViewCollection extends Collection<View> {
    active: View;

    add(key: string, view: View): void {
        super.add(key, view);
        // set first view as active
        if (!this.active) this.active = view;
        // initialize the view (requires that add be called within the global.init function)
        view.init();
    }
}
