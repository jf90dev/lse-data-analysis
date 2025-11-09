import { HttpResponse } from "../models/http-response.model";
import { HttpClient } from "./http.client";
export declare class EodhdClient extends HttpClient {
    private readonly apiToken;
    constructor();
    get(url: string, queryParams?: Record<string, string>): Promise<HttpResponse>;
    private makeRequest;
    getHistoricalPriceData(symbol: string, from: string, to: string): Promise<HttpResponse>;
    getRealTimeData(symbol: string): Promise<HttpResponse>;
    post(url: string, data: any): Promise<HttpResponse>;
}
