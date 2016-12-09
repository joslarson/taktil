import Host from './core/api-proxy/Host';


declare const host;
const proxy = new Host(host);
global.hostproxy = proxy;


export default proxy;
