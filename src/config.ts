import Config from './core/Config';


// singleton pattern to always get back the same config instance
let config: Config;
(function () {
    if (!config) config = new Config();
    return config;
})();


export default config;
