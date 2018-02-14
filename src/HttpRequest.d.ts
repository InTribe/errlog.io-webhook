import { IRequestPostData } from './IRequestPostData';
export declare class HttpRequester {
    post(packageData: IRequestPostData): Promise<boolean>;
}
