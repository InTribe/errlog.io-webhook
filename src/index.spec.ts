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
      const liveApiKey = process.env.ERRLOGIO_API_KEY;

      if (!liveApiKey) {
        throw new Error(
          'expecting the environment variable ERRLOGIO_API_KEY to be set.');
      }

      let reporter = IErrLogIo(liveApiKey);
      return expect(reporter.send({message: 'Test index.ts message'}))
        .to.be.eventually.be.true;
    });
  });
});
