export default class Sysex {
    port: number;
    message: string;

    constructor({ port = 0, message }: { port?: number, message: string }) {
        this.port = port;
        this.message = message;
    }
}
