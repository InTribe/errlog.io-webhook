"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpRequest_1 = require("./HttpRequest");
exports.DefaultOptions = {
    url: 'https://relay.errlog.io/api/v1/log',
    httpRequester: new HttpRequest_1.HttpRequester(),
    dateFormat: 'yyyy-mm-dd hh:MM:ss',
    errLogIoOptions: {},
};
//# sourceMappingURL=DefaultOptions.js.map