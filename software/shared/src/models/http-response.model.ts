export class HttpResponse {
    status: number;
    data: any;
    error?: HttpResponseError;
}

class HttpResponseError {
    code: string;
    message: string;
    url: string;
    stack: string;    
}