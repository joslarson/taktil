import { host, document } from 'typewig';
import * as api from 'typewig/core/api-proxy';


export class Store {
    transport: api.Transport;

    init() {
        this.transport = host.createTransport();
    }
}

const store = new Store();


export default store;
