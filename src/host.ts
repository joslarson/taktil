import Host from './core/api-proxy/Host';


declare const host;
const hostproxy = new Host(host);
global.hostproxy = hostproxy;


export default hostproxy;
