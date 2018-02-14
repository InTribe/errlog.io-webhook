import {IReporterOptions} from './ReporterOptions';
import {Reporter} from './Reporter';

export function IErrLogIoWebhook (options: IReporterOptions) {
  return new Reporter(options);
}
