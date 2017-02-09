export class ApiStore {
    transport: API.Transport;

    init() {
        this.transport = host.createTransport();
    }
}

const apiStore = new ApiStore();


export default apiStore;
