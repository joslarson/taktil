import * as api from './typings/api';
import Host from './core/bitwig/Host';


// TODO: this shouldn't need to be cast as api.Host
let host: api.Host = new Host(global.host) as any as api.Host;


export default host;