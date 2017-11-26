import taktil from 'taktil';

export interface Daw {
    transport: API.Transport;
    // ...define what you are going to keep track of
}

export const daw = {} as Daw;

taktil.on('init', () => {
    daw.transport = host.createTransport();
    // ...setup all of your "init time only" bitwig api stuff here
});
