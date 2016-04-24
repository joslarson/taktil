import Config from '../core/Config';
import Bitwig from '../core/bitwig/Bitwig';
import Collection from '../helpers/Collection';
import AbstractDevice from '../core/device/AbstractDevice';
import ViewCollection from '../core/view/ViewCollection';


export default class Session {
    bitwig: Bitwig;
    devices: Collection<AbstractDevice> = new Collection<AbstractDevice>();
    views: ViewCollection = new ViewCollection();
}
