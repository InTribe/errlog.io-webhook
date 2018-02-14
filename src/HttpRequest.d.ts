import { IRequestPostData } from './IRequestPostData';
export declare class HttpRequest {
    post(packageData: IRequestPostData): Promise<boolean>;
}
