import { Inject, injectable } from 'inversify-props';
import { AxiosRequestConfig } from 'axios';
import AuthStoreFacade, { AuthStoreFacadeS } from '@/store/auth/auth.store-facade';
import TokenSessionStorageService, { TokenSessionStorageServiceS } from '@/services/token-session-storage.service';
import UserService, { UserServiceS } from '@/services/user.service';
import ConfigService, { ConfigServiceS } from '@/services/config.service';
import ApiService, { ApiServiceS } from '@/services/api/api.service';

export const AuthServiceS = Symbol.for('AuthServiceS');
@injectable(AuthServiceS as unknown as string)
export default class AuthService {
    @Inject(ApiServiceS) private apiService!: ApiService;
    @Inject(AuthStoreFacadeS) private authStoreFacade!: AuthStoreFacade;
    @Inject(TokenSessionStorageServiceS) private tokenSessionStorageService!: TokenSessionStorageService;
    @Inject(ConfigServiceS) private configService!: ConfigService;
    @Inject(UserServiceS) private userService!: UserService;

    constructor() {
        this.apiService.setRequestInterceptor(this.setTokenToHeaders.bind(this));
    }

    setTokenToHeaders(req: AxiosRequestConfig) {
        // eslint-disable-next-line no-param-reassign
        req.headers.Authorization = `Bearer ${this.authStoreFacade.auth.token}`;
        return req;
    }

    async authentication(token: string | null = null) {
        if (token !== null) {
            this.tokenSessionStorageService.setToken(token);
        }

        if (this.tokenSessionStorageService.token !== null) {
            await this.authStoreFacade.saveAuthModel({ token: this.tokenSessionStorageService.token });
            await this.userService.initUser();
        }
    }

    async isLogin() {
        if (!this.userService.user) {
            await this.authentication();
            return Boolean(this.userService.user);
        }
        return true;
    }

    logout() {
        this.tokenSessionStorageService.removeToken();
        window.location.href = `${this.configService.ssoUrl}?logOut=true`;
    }

    get loginUrl() {
        return this.configService.ssoUrl + encodeURI(`?appName=Vue-inversify&redirectUrl=${window.location.origin}/auth`);
    }
}
