import { Message } from './Message';

export class SysexMessage implements Message {
    port: number;
    data: string;
    urgent: boolean;

    constructor({
        port = 0,
        data,
        urgent = false,
    }: {
        port?: number;
        data: string;
        urgent?: boolean;
    }) {
        this.port = port;
        this.data = data;
        this.urgent = urgent;
    }

    toString() {
        return this.data.toUpperCase();
    }
}
