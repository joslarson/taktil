import {Bitwig} from '../core';


// singleton pattern to always get back the same bitwig instance
let bitwig: Bitwig;
(function () {
    if (!bitwig) bitwig = new Bitwig();
    return bitwig;
})();


export default bitwig;
