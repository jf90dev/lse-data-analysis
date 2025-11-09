import { HttpResponse } from '../models/http-response.model';
export declare class HttpClient {
    protected baseUrl: string;
    private axiosInstance;
    constructor(baseUrl: string);
    get(url: string): Promise<HttpResponse>;
    post(url: string, data: any): Promise<HttpResponse>;
    private newAbortSignal;
}
