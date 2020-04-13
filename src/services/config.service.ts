import { Inject, injectable } from 'inversify-props';
import { AxiosRequestConfig } from 'axios';
import ConfigModel from '@/store/models/config.model';
import { plainToClass } from 'class-transformer';
import ApiService, { ApiServiceS } from '@/services/api/api.service';

export const ConfigServiceS = Symbol.for('ConfigServiceS');
@injectable(ConfigServiceS as unknown as string)
export default class ConfigService {
    @Inject(ApiServiceS) private apiService!: ApiService;

    private config: ConfigModel | null = null;

    async init() {
        const response = await this.apiService.get('/app.config.json');

        if (response && response.data) {
            this.config = plainToClass(ConfigModel, <ConfigModel> response.data, { excludeExtraneousValues: true });
            this.apiService.setRequestInterceptor(this.setBaseUrl.bind(this));
        }
    }

    setBaseUrl(req: AxiosRequestConfig) {
        // eslint-disable-next-line no-param-reassign
        req.baseURL = this.apiUrl || '';
        return req;
    }

    get apiUrl(): string | null {
        if (!this.config) {
            return null;
        }
        return this.config.VUE_APP_API_URL;
    }

    get ssoUrl(): string | null {
        if (!this.config) {
            return null;
        }
        return this.config.VUE_APP_SSO_URL;
    }
}
