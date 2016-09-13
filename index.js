(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "@kospa/base/system", "@kospa/base/composer"], factory);
    }
})(function (require, exports) {
    "use strict";
    var system = require("@kospa/base/system");
    var composer = require("@kospa/base/composer");
    function start(options) {
        var handlersOrModules = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlersOrModules[_i - 1] = arguments[_i];
        }
        return system.asyncEach(handlersOrModules, function (handlerOrModule) {
            if (typeof handlerOrModule === "string") {
                return system.module(handlerOrModule).then(initModule);
            }
            else if (isPromiseLike(handlerOrModule)) {
                return handlerOrModule;
            }
            else if (isInitializeModule(handlerOrModule)) {
                return initModule(handlerOrModule);
            }
            else if (typeof handlerOrModule === "function") {
                return handlerOrModule();
            }
            else {
                return Promise.resolve(handlerOrModule);
            }
        }).then(function () { return compose(options); });
    }
    exports.start = start;
    function compose(options) {
        if (!options.container) {
            options.container = "main";
        }
        if (typeof options.activate === "undefined") {
            options.activate = true;
        }
        return composer.compose(options.container, options);
    }
    function initModule(mod) {
        if (isInitializeModule(mod)) {
            return Promise.resolve(mod.init());
        }
    }
    function isPromiseLike(obj) {
        return obj && typeof obj.then === "function";
    }
    function isInitializeModule(obj) {
        return obj && typeof obj.init === "function";
    }
});
