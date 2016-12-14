import { host } from 'typewig';
import * as api from 'bitwig-api-proxy';


export class Store {
    transport: api.Transport;

    init() {
        this.transport = host.createTransport();
    }
}

const store = new Store();


export default store;
