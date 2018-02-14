import {IReporterOptions} from './ReporterOptions';
import {HttpRequest} from './HttpRequest';
import {IRequestBody} from './IRequestBody';
let DateFormat = require('dateformat');
import {IErrLogIoOptions} from './IErrLogIoOptions';

export class Reporter {
  private defaultOptions: IReporterOptions = <IReporterOptions> {};
  private httpRequestApi: HttpRequest;

  constructor(defaultOptions: IReporterOptions) {

    if (!defaultOptions) {
      throw new Error('Empty options argument is unsupported');
    }

    if (!defaultOptions.errLogIoOptions) {
      throw new Error('Empty options.errLogIoOptions argument is unsupported');
    }

    if (!defaultOptions.errLogIoOptions.apikey) {
      throw new Error('Empty options.apiKey attribute is unsupported');
    }

    Object.assign(this.defaultOptions, defaultOptions);

    this.defaultOptions.url = <string> this.defaultOptions.url ||
      'https://relay.errlog.io/api/v1/log';

    this.httpRequestApi = defaultOptions.httpRequest || new HttpRequest();
  }

  public send(body: IErrLogIoOptions): Promise<boolean> {
    let myOptions = <IRequestBody> {};
    Object.assign(myOptions, this.defaultOptions.errLogIoOptions);
    Object.assign(myOptions, body);

    if (
      !myOptions.message ||
      typeof myOptions.message !== 'string' ||
      myOptions.message.length === 0
    ) {
      return Promise.reject(new Error('Unsupported message value'));
    }

    myOptions.errordate = DateFormat(
      (body.errordate || new Date()),
      'yyyy-mm-dd hh:MM:ss',
    );

    const packageData = {
      url: `${this.defaultOptions.url}`,
      body: myOptions,
    };

    return this.httpRequestApi.post(packageData);

  }
}
