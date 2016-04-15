import {AbstractDevice} from '../core';
import {Collection} from '../helpers';


// singleton pattern to always get back the same devices collection instance
let devices: Collection<AbstractDevice>;
(function () {
    if (!devices) devices = new Collection<AbstractDevice>();
    return devices;
})();


export default devices;
