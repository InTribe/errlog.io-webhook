import {expect} from 'chai';
import * as chai from 'chai';
import * as ChaiAsPromised from 'chai-as-promised';
import * as simple from 'simple-mock';

chai.use(ChaiAsPromised);

import {Reporter} from './Reporter';
import {IReporterOptions} from './ReporterOptions';
import {HttpRequest} from './HttpRequest';
import {IErrLogIoOptions} from './IErrLogIoOptions';

let DateFormat = require('dateformat');

describe('Reporter', () => {

  describe('construction', () => {
    describe('failure conditions', () => {

      it('must fail if no errLogIoOptions is not set', () => {

        // Cast null as options to get past Typescript compiler warnings
        const options = <IReporterOptions> {};
        return expect(() => new Reporter(options))
          .to.throw('Empty options.errLogIoOptions argument is unsupported');
      });

      it('must fail if no apiKey is not set', () => {

        // Cast null as options to get past Typescript compiler warnings
        const options = <IReporterOptions> {errLogIoOptions: {}};
        return expect(() => new Reporter(options))
          .to.throw('Empty options.apiKey attribute is unsupported');
      });
    });

    describe('success conditions', () => {
      it('must pass if apiKey is set', () => {

        const options = {errLogIoOptions: {apikey: 'hi-mom'}};
        return expect(new Reporter(options))
          .to.be.instanceof(Reporter);
      });
    });
  });

  describe('send', () => {
    describe('failure conditions', () => {
      it('must not send if no message is specified', () => {

        const options = {errLogIoOptions: {apikey: 'hi-mom'}};

        return expect((new Reporter(options)).send(options.errLogIoOptions))
          .to.eventually.be.rejectedWith('Unsupported message value');
      });

      it('must not send if message is not a string', () => {

        // cast the object so we can inject invalid typed data.
        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
            message: {},
          },
        };

        return expect((new Reporter(options)).send(options.errLogIoOptions))
          .to.eventually.be.rejectedWith('Unsupported message value');
      });

      it('must not send if message is not an empty string', () => {

        // cast the object so we can inject invalid typed data.
        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
            message: {},
          },
        };

        return expect((new Reporter(options)).send(options.errLogIoOptions))
          .to.eventually.be.rejectedWith('Unsupported message value');
      });

      it('must fail if http request fails', () => {

        const mockHttpRequest = new HttpRequest();
        const errorMessage = 'Some Error Message';

        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
            message: 'My Message',
          },
          httpRequest: mockHttpRequest,
        };

        simple.mock(mockHttpRequest, 'post')
          .returnWith(Promise.reject(new Error(errorMessage)));

        return expect((new Reporter(options))
          .send(options.errLogIoOptions))
            .to.eventually.be.rejectedWith(errorMessage);
      });

      it('must fail with appropriate error', () => {
        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'github.com/intribeco/errorlog.io-webhook',
          },
        };

        const body: IErrLogIoOptions = {
          message: 'Testing',
        };

        return expect(new Reporter(options).send(body))
          .to.eventually.be.fulfilled;
      });
    });

    describe('success conditions', () => {
      it('must pass if message is set during construction', () => {

        const mockHttpRequest = new HttpRequest();

        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
            message: 'My Message',
          },
          httpRequest: mockHttpRequest,
        };

        simple.mock(mockHttpRequest, 'post')
          .returnWith(Promise.resolve(true));

        return expect((new Reporter(options)).send({}))
          .to.eventually.be.true;
      });

      it('must pass if message is set during send', () => {

        const mockHttpRequest = new HttpRequest();

        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
          },
          httpRequest: mockHttpRequest,
        };

        simple.mock(mockHttpRequest, 'post')
          .returnWith(Promise.resolve(true));

        return expect((new Reporter(options)).send({message: 'My Message'}))
          .to.eventually.be.true;
      });

      it('must send correct date', () => {

        const mockHttpRequest = new HttpRequest();

        const options = <IReporterOptions> {
          errLogIoOptions: {
            apikey: 'hi-mom',
          },
          httpRequest: mockHttpRequest,
        };

        const date = new Date();
        const dateString = DateFormat(date, 'yyyy-mm-dd hh:MM:ss');

        const body: IErrLogIoOptions = {
          errordate: date,
          message: 'My Message',
        };

        let fn = simple.mock(mockHttpRequest, 'post', (result: any) => {
          return Promise.resolve(true);
        });

        return (new Reporter(options)).send(body).then(() => {
          return expect(fn.firstCall.args[0].body.errordate)
            .to.be.equal(dateString);
        });

      });

      it('e2e test', () => {
        const liveApiKey = fs.readFileSync(
          './TESTING_ERRLOGIO_API_KEY', 'utf8');

        if (!liveApiKey) {
          throw new Error(
            'the file has no content ../TESING_ERRLOGIO_API_KEY to be set.');
        }

        const options = <IReporterOptions> {
          errLogIoOptions: {
            applicationname: 'errlog.io-webhook test',
            apikey: liveApiKey,
          },
        };

        const body: IErrLogIoOptions = {
          message: 'Testing',
        };

        return expect(new Reporter(options).send(body))
          .to.eventually.be.fulfilled;
      });
    });
  });
});
