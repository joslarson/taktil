import {View, ViewCollection} from '../core';


// singleton pattern to always get back the same views collection instance
let views: ViewCollection;
(function () {
    if (!views) views = new ViewCollection();
    return views;
})();


export default views;
