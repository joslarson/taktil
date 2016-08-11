export default class ApiProxy<ApiPricipal> {
    principal: ApiPricipal;
    protected _methodClassMap: {[key:string]: {new(...args: any[])}} = {};
    protected _methodCallCache: {} = {};

    constructor (principal: ApiPricipal) {
        this.principal = principal;
    }

    protected _extendMethodClassMap(methodClassMap: {}) {
        for (var methodName in methodClassMap) {
            this._methodClassMap[methodName] = methodClassMap[methodName];
        }
    }

    private __noSuchMethod__ (methodName: string, args) {
        if (methodName.slice(0, 3) === 'get') {  // starts with 'get'
            return this._handleGet(methodName, args);
        } else if (methodName.slice(0, 6) === 'create') {  // starts with 'create'
            return this._handleCreate(methodName, args);
        } else if (methodName.slice(0, 3) === 'add' && methodName.slice(-8) === 'Observer') {  // starts with add
            return this._handleAddObserver(methodName, args);
        } else {
            return this._getPrincipalResult(methodName, args);
        }
    }

    private _getPrincipalResult (methodName: string, args: any[]) {
        return this.principal[methodName].apply(this, args);
    }

    private _handleGet (methodName: string, args: any[]) {
        let newPrincipalResult = this._getPrincipalResult(methodName, args);
        if (typeof newPrincipalResult !== 'object') return newPrincipalResult;

        let ProxyClass = this._methodClassMap[methodName];
        let methodCallKey = this._getMethodCallKey(methodName, args);

        // check for methodCall in cache, if it's there and the result's principal
        // is the exact same object as the previous result principal, return the
        // previous proxy result instance.
        if (this._methodCallCache[methodCallKey]) {
            let prevProxyResult = this._methodCallCache[methodCallKey];
            if (prevProxyResult.principal === newPrincipalResult) return prevProxyResult;
        }

        // first time called: cache and return result
        if (ProxyClass !== undefined) {
            return this._methodCallCache[methodCallKey] = new ProxyClass(newPrincipalResult);
        } else {
            throw 'No proxy class in methodClassMap for method "${methodName}".';
        }
    }

    private _handleCreate (methodName: string, args: any[]) {
        let ProxyClass = this._methodClassMap[methodName];
        if (ProxyClass !== undefined) {
            return new ProxyClass(this._getPrincipalResult(methodName, args));
        } else {
            throw 'No proxy class in methodClassMap for method "${methodName}".';
        }
    }

    private _handleAddObserver (methodName: string, args: any[]) {
        let methodCallKey = this._getMethodCallKey(methodName, args);
        let callbackArgIndex = this._getCallbackArgIndex(args);
        let callback = args[callbackArgIndex];

        if (this._methodCallCache[methodCallKey]) {
            this._methodCallCache[methodCallKey]['callbacks'].push(callback);
        } else {
            this._methodCallCache[methodCallKey] = {'args': args, 'callbacks': [callback]};
            let principalArgs = this._unproxiedArgs(args);  // clone args, unproxy proxies
            // replace callback with custom callback that calls our handled list of callbacks
            principalArgs.splice(callbackArgIndex, 1, (...callbackArgs) => {
                // addSomethingCoolObserver => somethingCool
                // TODO: property name would be the same for methodcalls with the same methodName,
                // but different args, how do we handle this?
                let propertyName = methodName.slice(3, 4)
                    .toLowerCase().concat(methodName.slice(4, -8));
                this[propertyName] = callbackArgs.length === 1 ? callbackArgs[0] : callbackArgs;
                for (let callback of this._methodCallCache[methodCallKey]['callbacks']) {
                    callback(...callbackArgs);
                }
            });
            // setup the principal observer
            this.principal[methodName].apply(this, principalArgs);
        }
    }

    private _getMethodCallKey (methodName: string, args: any[]) {
        let key: string = methodName;
        for (let arg of args) {
            if (typeof arg === 'function') {
                key += '::func';
            } else if (arg instanceof ApiProxy) {
                key += `::${arg.principal.hashCode()}`;
            } else if (arg.hasCode !== undefined) {  // is java object (or has hashCode implented)
                key += `::${arg.hashCode()}`;
            } else if (typeof arg === 'object') {
                throw 'Error: Not sure how to hash object "${arg}".';
            } else {
                key += `::${arg}`;
            }
        }
        return key;
    }

    private _getCallbackArgIndex(args: any[]) {
        for (let i in args) {
            if (typeof args[i] === 'function') {
                return i;
            }
        }
        throw 'args array has no arg of type function to assume as callback.';
    }

    private _unproxiedArgs (args) {
        // clone args
        args = [...args];
        for (let i in args) {
            if (args[i] instanceof ApiProxy) {
                // replace proxy with principle
                args[i] = args[i].principle;
            }
        }
        return args;
    }
}
