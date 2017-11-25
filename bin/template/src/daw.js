import taktil from 'taktil';

export class Daw {
    constructor() {
        taktil.on('init', this.init.bind(this)); // initialize store during script init
    }

    init() {
        this.transport = host.createTransport();
        // ...setup all of your "init time only" bitwig api stuff here
    }
}

export const daw = new Daw();
