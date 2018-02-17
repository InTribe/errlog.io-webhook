"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpRequest_1 = require("./HttpRequest");
var DefaultOptions_1 = require("./DefaultOptions");
var DateFormat = require('dateformat');
var Reporter = /** @class */ (function () {
    function Reporter(options) {
        this.defaultOptions = {};
        Object.assign(this.defaultOptions, DefaultOptions_1.DefaultOptions);
        Object.assign(this.defaultOptions, options);
        if (!this.defaultOptions) {
            throw new Error('Empty options argument is unsupported');
        }
        if (!this.defaultOptions.errLogIoOptions) {
            throw new Error('Empty options.errLogIoOptions argument is unsupported');
        }
        if (!this.defaultOptions.errLogIoOptions.apikey) {
            throw new Error('Empty options.apiKey attribute is unsupported');
        }
        if (!(this.defaultOptions.httpRequester instanceof HttpRequest_1.HttpRequester)) {
            throw new Error('Empty options.httpRequest attribute is unsupported');
        }
        this.httpRequester = this.defaultOptions.httpRequester;
    }
    Reporter.prototype.send = function (body) {
        var myOptions = {};
        Object.assign(myOptions, this.defaultOptions.errLogIoOptions);
        Object.assign(myOptions, body);
        if (!myOptions.message ||
            typeof myOptions.message !== 'string' ||
            myOptions.message.length === 0) {
            return Promise.reject(new Error('Unsupported message value'));
        }
        myOptions.errordate = DateFormat((body.errordate || new Date()), this.defaultOptions.dateFormat);
        var packageData = {
            url: "" + this.defaultOptions.url,
            body: myOptions,
        };
        return this.httpRequester.post(packageData);
    };
    return Reporter;
}());
exports.Reporter = Reporter;
//# sourceMappingURL=Reporter.js.map