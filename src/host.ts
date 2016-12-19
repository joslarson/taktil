import { host } from 'bitwig-api-proxy';


global.hostproxy = host;  // add hostproxy to global scope for manual debugging through the console


export default host;
