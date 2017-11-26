import taktil from 'taktil';

export const daw = {};

taktil.on('init', () => {
    daw.transport = host.createTransport();
    // ...setup all of your "init time only" bitwig api stuff here
});
