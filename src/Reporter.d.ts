import { IReporterOptions } from './ReporterOptions';
import { IErrLogIoOptions } from './IErrLogIoOptions';
export declare class Reporter {
    private defaultOptions;
    private httpRequestApi;
    constructor(defaultOptions: IReporterOptions);
    send(body: IErrLogIoOptions): Promise<boolean>;
}
