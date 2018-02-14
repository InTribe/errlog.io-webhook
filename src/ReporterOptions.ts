import {IErrLogIoOptions} from './IErrLogIoOptions';
import {HttpRequester} from './HttpRequest';

export interface IReporterOptions {
  url?: string;
  httpRequester?: HttpRequester;
  dateFormat?: string;
  errLogIoOptions: IErrLogIoOptions;
}
