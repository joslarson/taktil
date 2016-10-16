import Collection from '../../helpers/Collection';
import DeviceControl from './DeviceControl';
import { areDeepEqual } from '../../utils';


export default class DeviceControlCollection extends Collection<DeviceControl> {
    private _midiMap: { [key: number]: { [key: number]: { [key: number]: DeviceControl } } } = {};

    add(key: string, item: DeviceControl): void {
        super.add(key, item);
        // cache reverse lookup midi values in this._midiMap
        if (this._midiMap[`${item.midiInIndex}`] == undefined) {
            this._midiMap[`${item.midiInIndex}`] = {};
        }
        if (this._midiMap[`${item.midiInIndex}`][item.status] == undefined) {
            this._midiMap[`${item.midiInIndex}`][item.status] = {};
        }
        this._midiMap[`${item.midiInIndex}`][item.status][item.data1] = item;
    }

    remove(keyOrItem: string | DeviceControl): void {
        super.remove(keyOrItem);
        let item = this._items[this.indexOf(keyOrItem)];
        // cleanup cache in this._midiMap
        delete this._midiMap[`${item.midiIn}`][item.status][item.data1];
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
