import {IReporterOptions} from './ReporterOptions';
import {HttpRequester} from './HttpRequester';
import {IRequestBody} from './IRequestBody';
import {IErrLogIoOptions} from './IErrLogIoOptions';
import {DefaultOptions} from './DefaultOptions';

let DateFormat = require('dateformat');

export class Reporter {
  private defaultOptions: IReporterOptions = <IReporterOptions> {};
  private httpRequester: HttpRequester;

  constructor(options: IReporterOptions) {

    Object.assign(this.defaultOptions, DefaultOptions);
    Object.assign(this.defaultOptions, options);

    if (!this.defaultOptions) {
      throw new Error('Empty options argument is unsupported');
    }

    if (!this.defaultOptions.errLogIoOptions) {
      throw new Error('Empty options.errLogIoOptions argument is unsupported');
    }

    if (!this.defaultOptions.errLogIoOptions.apikey) {
      throw new Error('Empty options.apiKey attribute is unsupported');
    }

    if (!(this.defaultOptions.httpRequester instanceof HttpRequester)) {
      throw new Error('Empty options.httpRequest attribute is unsupported');
    }

    this.httpRequester = this.defaultOptions.httpRequester;
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
      this.defaultOptions.dateFormat,
    );

    const packageData = {
      url: `${this.defaultOptions.url}`,
      body: myOptions,
    };

    return this.httpRequester.post(packageData);
  }
}
