export declare class HttpResponse {
    status: number;
    data: any;
    error?: HttpResponseError;
}
declare class HttpResponseError {
    code: string;
    message: string;
    url: string;
    stack: string;
}
export {};
