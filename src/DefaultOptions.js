"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpRequester_1 = require("./HttpRequester");
exports.DefaultOptions = {
    url: 'https://relay.errlog.io/api/v1/log',
    httpRequester: new HttpRequester_1.HttpRequester(),
    dateFormat: 'yyyy-mm-dd hh:MM:ss',
    errLogIoOptions: {},
};
//# sourceMappingURL=DefaultOptions.js.map