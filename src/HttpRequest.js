"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestPromise = require("request-promise-native");
var HttpRequester = /** @class */ (function () {
    function HttpRequester() {
    }
    HttpRequester.prototype.post = function (packageData) {
        var options = {
            method: 'POST',
            uri: packageData.url,
            body: packageData.body,
            json: true,
        };
        return RequestPromise(options)
            .then(function () { return true; }, function (result) {
            return true;
        });
    };
    return HttpRequester;
}());
exports.HttpRequester = HttpRequester;
//# sourceMappingURL=HttpRequest.js.map