import Collection from '../../helpers/Collection';
import Control from './Control';
import { areDeepEqual } from '../../utils';
import logger from '../../logger';


export default class ControlCollection extends Collection<Control> {
    private _midiMap: { [key: number]: { [key: number]: { [key: number]: Control } } } = {};

    add(key: string, item: Control): void {
        super.add(key, item);
        // cache reverse lookup midi values in this._midiMap
        if (this._midiMap[`${item.midiInPort}`] == undefined) {
            this._midiMap[`${item.midiInPort}`] = {};
        }
        if (this._midiMap[`${item.midiInPort}`][item.status] == undefined) {
            this._midiMap[`${item.midiInPort}`][item.status] = {};
        }
        this._midiMap[`${item.midiInPort}`][item.status][item.data1] = item;
    }

    remove(keyOrItem: string | Control): void {
        super.remove(keyOrItem);
        let item = this._items[this.indexOf(keyOrItem)];
        // cleanup cache in this._midiMap
        delete this._midiMap[item.midiInPort][item.status][item.data1];
    }

    // enables looking up with incoming midi
    midiGet(midiInIndex: number, status: number, data1: number) {
        try {
            return this._midiMap[midiInIndex][status][data1];
        } catch (e) {
            return undefined;
        }
    }
}
