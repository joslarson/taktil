import { api, host } from 'typewig';


export class Store {
    transport: api.Transport;

    init() {
        this.transport = host.createTransport();
    }
}

const store = new Store();


export default store;
