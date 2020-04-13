import { injectable } from 'inversify-props';
import axios, {
    AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios';

interface Params {
    [param: string]: string | number;
}

export const ApiServiceS = Symbol.for('ApiServiceS');
@injectable(ApiServiceS as unknown as string)
export default class ApiService {
    private client!: AxiosInstance;

    constructor() {
        this.client = axios.create();
    }

    setRequestInterceptor(cb: (config: AxiosRequestConfig) => any) {
        this.client.interceptors.request.use(cb);
    }

    setResponseInterceptor(cb: (response: AxiosResponse) => any) {
        this.client.interceptors.response.use(cb);
    }

    async get(path: string, params: Params = {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.client.get(path, { ...config, params });
    }

    async post(path: string, data?: {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.client.post(path, data, config);
    }

    async put(path: string, data?: {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.client.put(path, data, config);
    }

    async delete(path: string, params: Params = {}, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return this.client.delete(path, { ...config, params });
    }
}
