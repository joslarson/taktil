export default class SysexMessage {
    port: number;
    data: string;

    constructor({ port = 0, data }: { port?: number; data: string }) {
        this.port = port;
        this.data = data;
    }

    toString() {
        return this.data.toUpperCase();
    }
}
