import { Expose } from 'class-transformer';

export default class ConfigModel {
    @Expose()
    VUE_APP_API_URL!: string;

    @Expose()
    VUE_APP_SSO_URL!: string;
}
