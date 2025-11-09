import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpResponse } from '../models/http-response.model';

export class HttpClient {
    private axiosInstance: AxiosInstance;

    constructor(protected baseUrl: string) {

        this.axiosInstance = axios.create({
            baseURL: baseUrl,            
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    async get(url: string): Promise<HttpResponse> {

        try {

            const requestConfig = { signal: this.newAbortSignal(5000) };

            const response = await this.axiosInstance.get<Object>(url, requestConfig);
            
            return {
                status: response.status,
                data: response.data as Object
            } as HttpResponse;

        } catch (error: any) {

            const axiosError = error as AxiosError;
            return {
                status: axiosError.response?.status,
                data: axiosError.response?.data as Object,
                error: {
                    code: axiosError.code,
                    message: axiosError.message,
                    url: axiosError.config?.url,
                    stack: axiosError.stack
                }
            } as HttpResponse;               
        

        }
    }

    async post(url: string, data: any): Promise<HttpResponse> {

        try {

            const requestConfig = { signal: this.newAbortSignal(5000) };

            const response = await this.axiosInstance.post<Object>(url, data, requestConfig);
            
            return {
                status: response.status,
                data: response.data as Object
            } as HttpResponse;

        } catch (error: any) {

            const axiosError = error as AxiosError;      

            return {
                status: axiosError.response?.status,
                data: axiosError.response?.data as Object,
                error: {
                    code: axiosError.code,
                    message: axiosError.message,
                    url: axiosError.config?.url,
                    stack: axiosError.stack
                }
            } as HttpResponse;                

        }
   }

    private newAbortSignal(timeoutMs: number) {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), timeoutMs || 0);
      
        return abortController.signal;
      }
}