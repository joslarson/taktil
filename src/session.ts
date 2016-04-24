import Session from './core/Session';


// singleton pattern to always get back the same config instance
let session: Session;
(function () {
    if (!session) session = new Session();
    return session;
})();


export default session;
