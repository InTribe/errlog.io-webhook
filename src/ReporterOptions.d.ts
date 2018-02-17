import { IErrLogIoOptions } from './IErrLogIoOptions';
import { HttpRequester } from './HttpRequester';
export interface IReporterOptions {
    url?: string;
    httpRequester?: HttpRequester;
    dateFormat?: string;
    errLogIoOptions: IErrLogIoOptions;
}
