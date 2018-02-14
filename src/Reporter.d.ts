import { IReporterOptions } from './ReporterOptions';
import { IErrLogIoOptions } from './IErrLogIoOptions';
export declare class Reporter {
    private defaultOptions;
    private httpRequester;
    constructor(options: IReporterOptions);
    send(body: IErrLogIoOptions): Promise<boolean>;
}
