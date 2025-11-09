import { HttpResponse } from "../models/http-response.model";
import { HttpClient } from "./http.client";

export class EodhdClient extends HttpClient {

    private readonly apiToken: string = '68d65954d6b239.04475818'

    constructor() {

        const baseUrl: string = 'https://eodhd.com/api'

        super(baseUrl);
    }

    async get(url: string, queryParams?: Record<string, string>): Promise<HttpResponse> {
        return await this.makeRequest(url, queryParams);
    }

    private async makeRequest(url: string, queryParams?: Record<string, string>): Promise<HttpResponse> {

        let fullUrl = `${url}?api_token=${this.apiToken}&fmt=json`
        
        // Append additional query parameters if provided
        if (queryParams) {
            for (const [key, value] of Object.entries(queryParams)) {
                fullUrl += `&${key}=${encodeURIComponent(value)}`;
            }
        }

        return await super.get(fullUrl)
    
    }

    async getHistoricalPriceData(symbol: string, from: string, to: string): Promise<HttpResponse> {
        const url = `/eod/${symbol}.LSE`;
        const queryParams = {
            from: from,
            to: to
        };
        return await this.makeRequest(url, queryParams);
    }

    async getRealTimeData(symbol: string): Promise<HttpResponse> {
        const url = `/real-time/${symbol}.LSE`;
        return await this.makeRequest(url);
    }

    async post(url: string, data: any): Promise<HttpResponse> {

        const fullUrl = `${url}?api_token=${this.apiToken}&fmt=json`
    
        return await super.post(fullUrl, data)

    }


    
}