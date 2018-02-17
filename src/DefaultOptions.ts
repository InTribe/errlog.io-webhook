import {IReporterOptions} from './ReporterOptions';
import {HttpRequester} from './HttpRequester';

export const DefaultOptions: IReporterOptions = {
  url: 'https://relay.errlog.io/api/v1/log',
  httpRequester: new HttpRequester(),
  dateFormat: 'yyyy-mm-dd hh:MM:ss',
  errLogIoOptions: {},
};
