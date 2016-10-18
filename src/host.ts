import * as api from './typings/api';
import Host from './core/bitwig/Host';


// TODO: this shouldn't need to be cast as api.Host
let host: api.Host = new Host(global.host) as any as api.Host;
// swap global scope host for proxy host (but don't use it anyways)
global.host = host;


export default host;
