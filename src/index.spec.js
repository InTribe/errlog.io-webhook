"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai = require("chai");
var ChaiAsPromised = require("chai-as-promised");
var fs = require("fs");
var index_1 = require("./index");
var Reporter_1 = require("./Reporter");
chai.use(ChaiAsPromised);
describe('index.ts', function () {
    describe('construction', function () {
        it('must return a constructed object', function () {
            var reporter = index_1.ErrLogIo('myapi-key');
            return chai_1.expect(reporter).to.be.instanceof(Reporter_1.Reporter);
        });
    });
    describe('send error', function () {
        it('must send a message (requires real API key', function () {
            var liveApiKey = fs.readFileSync('./TESTING_ERRLOGIO_API_KEY', 'utf8');
            if (!liveApiKey) {
                throw new Error('the file has no content ../TESING_ERRLOGIO_API_KEY to be set.');
            }
            var reporter = index_1.ErrLogIo(liveApiKey);
            return chai_1.expect(reporter.send({ message: 'Test index.ts message' }))
                .to.be.eventually.be.true;
        });
    });
});
//# sourceMappingURL=index.spec.js.map