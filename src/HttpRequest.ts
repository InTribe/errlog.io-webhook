import RequestPromise = require('request-promise-native');
import {IRequestPostData} from './IRequestPostData';

export class HttpRequest {
  public post(packageData: IRequestPostData): Promise<boolean> {

    const options = {
      method: 'POST',
      uri: packageData.url,
      body: packageData.body,
      json: true,
    };

    return RequestPromise(options)
      .then(
        () => { return true; },
        (result: any) => {
          return true;
        },
      );
  }
}
