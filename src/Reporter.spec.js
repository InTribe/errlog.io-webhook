"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai = require("chai");
var ChaiAsPromised = require("chai-as-promised");
var simple = require("simple-mock");
var fs = require("fs");
chai.use(ChaiAsPromised);
var Reporter_1 = require("./Reporter");
var HttpRequester_1 = require("./HttpRequester");
var DateFormat = require('dateformat');
describe('Reporter', function () {
    describe('construction', function () {
        describe('failure conditions', function () {
            it('must fail if no apiKey is not set', function () {
                // Cast null as options to get past Typescript compiler warnings
                var options = { errLogIoOptions: {} };
                return chai_1.expect(function () { return new Reporter_1.Reporter(options); })
                    .to.throw('Empty options.apiKey attribute is unsupported');
            });
            it('must fail if empty apiKey', function () {
                var options = { errLogIoOptions: { apikey: '' } };
                return chai_1.expect(function () { return new Reporter_1.Reporter(options); })
                    .to.throw('Empty options.apiKey attribute is unsupported');
            });
            it('must fail if empty httpRequestNotSet', function () {
                var options = { errLogIoOptions: { apikey: 'not-empty' }, httpRequester: {} };
                return chai_1.expect(function () { return new Reporter_1.Reporter(options); })
                    .to.throw('Empty options.httpRequest attribute is unsupported');
            });
        });
        describe('success conditions', function () {
            it('must pass if apiKey is set', function () {
                var options = { errLogIoOptions: { apikey: 'hi-mom' } };
                return chai_1.expect(new Reporter_1.Reporter(options))
                    .to.be.instanceof(Reporter_1.Reporter);
            });
        });
    });
    describe('send', function () {
        describe('failure conditions', function () {
            it('must not send if no message is specified', function () {
                var options = { errLogIoOptions: { apikey: 'hi-mom' } };
                return chai_1.expect((new Reporter_1.Reporter(options)).send(options.errLogIoOptions))
                    .to.eventually.be.rejectedWith('Unsupported message value');
            });
            it('must not send if message is not a string', function () {
                // cast the object so we can inject invalid typed data.
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                        message: {},
                    },
                };
                return chai_1.expect((new Reporter_1.Reporter(options)).send(options.errLogIoOptions))
                    .to.eventually.be.rejectedWith('Unsupported message value');
            });
            it('must not send if message is not an empty string', function () {
                // cast the object so we can inject invalid typed data.
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                        message: {},
                    },
                };
                return chai_1.expect((new Reporter_1.Reporter(options)).send(options.errLogIoOptions))
                    .to.eventually.be.rejectedWith('Unsupported message value');
            });
            it('must fail if http request fails', function () {
                var mockHttpRequest = new HttpRequester_1.HttpRequester();
                var errorMessage = 'Some Error Message';
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                        message: 'My Message',
                    },
                    httpRequester: mockHttpRequest,
                };
                simple.mock(mockHttpRequest, 'post')
                    .returnWith(Promise.reject(new Error(errorMessage)));
                return chai_1.expect((new Reporter_1.Reporter(options))
                    .send(options.errLogIoOptions))
                    .to.eventually.be.rejectedWith(errorMessage);
            });
            it('must fail with appropriate error', function () {
                var options = {
                    errLogIoOptions: {
                        apikey: 'github.com/intribeco/errorlog.io-webhook',
                    },
                };
                var body = {
                    message: 'Testing',
                };
                return chai_1.expect(new Reporter_1.Reporter(options).send(body))
                    .to.eventually.be.fulfilled;
            });
        });
        describe('success conditions', function () {
            it('must pass if message is set during construction', function () {
                var mockHttpRequest = new HttpRequester_1.HttpRequester();
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                        message: 'My Message',
                    },
                    httpRequester: mockHttpRequest,
                };
                simple.mock(mockHttpRequest, 'post')
                    .returnWith(Promise.resolve(true));
                return chai_1.expect((new Reporter_1.Reporter(options)).send({}))
                    .to.eventually.be.true;
            });
            it('must pass if message is set during send', function () {
                var mockHttpRequest = new HttpRequester_1.HttpRequester();
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                    },
                    httpRequester: mockHttpRequest,
                };
                simple.mock(mockHttpRequest, 'post')
                    .returnWith(Promise.resolve(true));
                return chai_1.expect((new Reporter_1.Reporter(options)).send({ message: 'My Message' }))
                    .to.eventually.be.true;
            });
            it('must send correct date', function () {
                var mockHttpRequest = new HttpRequester_1.HttpRequester();
                var options = {
                    errLogIoOptions: {
                        apikey: 'hi-mom',
                    },
                    httpRequester: mockHttpRequest,
                };
                var date = new Date();
                var dateString = DateFormat(date, 'yyyy-mm-dd hh:MM:ss');
                var body = {
                    errordate: date,
                    message: 'My Message',
                };
                var fn = simple.mock(mockHttpRequest, 'post', function (result) {
                    return Promise.resolve(true);
                });
                return (new Reporter_1.Reporter(options)).send(body).then(function () {
                    return chai_1.expect(fn.firstCall.args[0].body.errordate)
                        .to.be.equal(dateString);
                });
            });
            it('e2e test', function () {
                var liveApiKey = fs.readFileSync('./TESTING_ERRLOGIO_API_KEY', 'utf8');
                if (!liveApiKey) {
                    throw new Error('the file has no content ../TESING_ERRLOGIO_API_KEY to be set.');
                }
                var options = {
                    errLogIoOptions: {
                        applicationname: 'errlog.io-webhook test',
                        apikey: liveApiKey,
                    },
                };
                var body = {
                    message: 'Testing',
                    filename: 'Reporter.spec.ts',
                };
                return chai_1.expect(new Reporter_1.Reporter(options).send(body))
                    .to.eventually.be.fulfilled;
            });
        });
    });
});
//# sourceMappingURL=Reporter.spec.js.map