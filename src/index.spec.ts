import {expect} from 'chai';
import * as chai from 'chai';
import * as ChaiAsPromised from 'chai-as-promised';
import {IErrLogIo} from './index';
import {Reporter} from './Reporter';

chai.use(ChaiAsPromised);

describe('index.ts', () => {

  describe('construction', () => {
    it('must return a constructed object', () => {
      let reporter = IErrLogIo('myapi-key');
      return expect(reporter).to.be.instanceof(Reporter);
    });
  });

  describe('send error', () => {
    it('must send a message (requires real API key', () => {
      const liveApiKey = fs.readFileSync(
        './TESTING_ERRLOGIO_API_KEY', 'utf8');

      if (!liveApiKey) {
        throw new Error(
          'the file has no content ../TESING_ERRLOGIO_API_KEY to be set.');
      }

      let reporter = IErrLogIo(liveApiKey);
      return expect(reporter.send({message: 'Test index.ts message'}))
        .to.be.eventually.be.true;
    });
  });
});
