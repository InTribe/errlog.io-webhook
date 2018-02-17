"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reporter_1 = require("./Reporter");
function ErrLogIo(apiKey) {
    var options = {
        errLogIoOptions: {
            apikey: apiKey,
        },
    };
    return new Reporter_1.Reporter(options);
}
exports.ErrLogIo = ErrLogIo;
//# sourceMappingURL=index.js.map