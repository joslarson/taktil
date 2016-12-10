import { Host } from 'bitwig-api-proxy';


declare const host;
const hostproxy = new Host(host);
global.hostproxy = hostproxy;


export default hostproxy;
