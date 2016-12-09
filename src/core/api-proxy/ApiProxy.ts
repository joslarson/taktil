export default class ApiProxy {
    target;
    cache: any = {};
    protected _methodClassMap: { [key:string]: { new(...args: any[]) } } = {};
    protected _methodCallCache: {} = {};

    constructor(target) {
        this.target = target;
    }

    protected _extendMethodClassMap(methodClassMap: {}) {
        for (let methodName in methodClassMap) {
            this._methodClassMap[methodName] = methodClassMap[methodName];
        }
    }

    private __noSuchMethod__(methodName: string, args) {
        if (methodName.slice(0, 3) === 'get') {  // starts with 'get'
            return this._handleGet(methodName, args);
        } else if (methodName.slice(0, 6) === 'create') {  // starts with 'create'
            return this._handleCreate(methodName, args);
        } else if (methodName.slice(0, 3) === 'add' && methodName.slice(-8) === 'Observer') {  // starts with add, ends with Observer
            return this._handleAddObserver(methodName, args);
        } else {
            return this._getTargetResult(methodName, args);
        }
    }

    private _getTargetResult(methodName: string, args: any[]) {
        return this.target[methodName].apply(this.target, args);
    }

    private _handleGet(methodName: string, args: any[]) {
        let newTargetResult = this._getTargetResult(methodName, args);
        if (typeof newTargetResult !== 'object') return newTargetResult;

        let ProxyClass = this._methodClassMap[methodName];
        let methodCallKey = this._getMethodCallKey(methodName, args);

        // check for methodCall in cache, if it's there and the result's target
        // is the exact same object as the previous result target, return the
        // previous proxy result instance.
        if (this._methodCallCache[methodCallKey]) {
            let prevProxyResult = this._methodCallCache[methodCallKey];
            if (prevProxyResult.target === newTargetResult) return prevProxyResult;
        }

        // first time called: cache and return result
        if (ProxyClass !== undefined) {
            return this._methodCallCache[methodCallKey] = new ProxyClass(newTargetResult);
        } else {
            throw `No proxy class in methodClassMap for method "${methodName}".`;
        }
    }

    private _handleCreate(methodName: string, args: any[]) {
        let ProxyClass = this._methodClassMap[methodName];
        if (ProxyClass !== undefined) {
            return new ProxyClass(this._getTargetResult(methodName, args));
        } else {
            throw `No proxy class in methodClassMap for method "${methodName}".`;
        }
    }

    private _handleAddObserver(methodName: string, args: any[]) {
        let methodCallKey = this._getMethodCallKey(methodName, args);
        let callbackArgIndex = this._getCallbackArgIndex(args);
        let callback = args[callbackArgIndex];

        if (this._methodCallCache[methodCallKey]) {
            this._methodCallCache[methodCallKey]['callbacks'].push(callback);
        } else {
            this._methodCallCache[methodCallKey] = {'args': args, 'callbacks': [callback]};
            let targetArgs = this._unproxiedArgs(args);  // clone args, unproxy proxies
            // replace callback with custom callback that calls our handled list of callbacks
            targetArgs.splice(callbackArgIndex, 1, (...callbackArgs) => {
                // addSomethingCoolObserver => somethingCool
                // TODO: property name would be the same for method calls with the same methodName,
                // but different args, how do we handle this?
                let propertyName = methodName.slice(3, 4)
                    .toLowerCase().concat(methodName.slice(4, -8));
                this.cache[propertyName] = callbackArgs.length === 1 ? callbackArgs[0] : callbackArgs;
                for (let callback of this._methodCallCache[methodCallKey]['callbacks']) {
                    callback(...callbackArgs);
                }
            });
            // setup the target observer
            this.target[methodName](...targetArgs);
        }
    }

    private _getMethodCallKey(methodName: string, args: any[]) {
        let key: string = methodName;
        for (let arg of args) {
            if (typeof arg === 'function') {
                key += '::func';
            } else if (arg instanceof ApiProxy) {
                key += `::${arg.target.hashCode()}`;
            } else if (arg.hasCode !== undefined) {  // is java object (or has hashCode implemented)
                key += `::${arg.hashCode()}`;
            // TODO: implement hashing protocol for object args
            // } else if (typeof arg === 'object') {
            //     throw `Error: Not sure how to hash object "${arg}" for method "${methodName}" on ${this.target.name}.`;
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
        throw 'args array has no arg of type "function" to assume as callback.';
    }

    private _unproxiedArgs(args) {
        // clone args
        args = [...args];
        for (let i in args) {
            if (args[i] instanceof ApiProxy) {
                // replace proxy with target
                args[i] = args[i].target;
            }
        }
        return args;
    }
}
