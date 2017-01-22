import { api, host } from 'typewig';


export class ApiStore {
    transport: api.Transport;

    init() {
        this.transport = host.createTransport();
    }
}

const apiStore = new ApiStore();


export default apiStore;
