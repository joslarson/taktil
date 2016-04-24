import Collection from '../../helpers/Collection';
import DeviceControl from './DeviceControl';
import {areDeepEqual} from '../../utils';


export default class DeviceControlCollection extends Collection<DeviceControl> {
    private _midiMap: { [key: number]: { [key: number]: { [key: number]: DeviceControl } } } = {};

    add(key: string, item: DeviceControl): void {
        super.add(key, item);
        // cache reverse lookup midi values in this._midiMap
        if (this._midiMap[item.midiIndex] == undefined) {
            this._midiMap[item.midiIndex] = {};
        }
        if (this._midiMap[item.midiIndex][item.status] == undefined) {
            this._midiMap[item.midiIndex][item.status] = {};
        }
        this._midiMap[item.midiIndex][item.status][item.data1] = item;
    }

    remove(keyOrItem:string|DeviceControl): void {
        super.remove(keyOrItem);
        let item = this._items[this.indexOf(keyOrItem)];
        // cleanup cache in this._midiMap
        delete this._midiMap[item.midiIndex][item.status][item.data1];
    }

    // enables looking up with incoming midi
    midiGet(midiIndex: number, status: number, data1: number) {
        return this._midiMap[midiIndex][status][data1];
    }
}
