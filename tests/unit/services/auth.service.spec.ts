import 'reflect-metadata';
import {
    deepEqual,
    instance, mock, reset, verify, when,
} from 'ts-mockito';
import { container } from 'inversify-props';
import AuthService from '@/services/auth.service';
import AuthStoreFacade, { AuthStoreFacadeS } from '@/store/auth/auth.store-facade';
import TokenSessionStorageService, { TokenSessionStorageServiceS } from '@/services/token-session-storage.service';
import ConfigService, { ConfigServiceS } from '@/services/config.service';

describe('auth.service.ts', () => {
    const token = 'defaultToken';

    const MockAuthStoreFacade = mock(AuthStoreFacade);
    container.bind(AuthStoreFacadeS).toConstantValue(instance(MockAuthStoreFacade));
    const MockTokenSessionStorageService = mock(TokenSessionStorageService);
    container.bind(TokenSessionStorageServiceS).toConstantValue(instance(MockTokenSessionStorageService));
    const MockSettingsService = mock(ConfigService);
    container.bind(ConfigServiceS).toConstantValue(instance(MockSettingsService));

    beforeEach(() => {
        reset(MockAuthStoreFacade);
        reset(MockTokenSessionStorageService);
        reset(MockSettingsService);
    });

    it('mount AuthService', async () => {
        when(MockTokenSessionStorageService.token).thenReturn(token);
        const authService = new AuthService();

        verify(await MockAuthStoreFacade.saveAuthModel(deepEqual({ token }))).once();
    });

    it('AuthService.authentication', async () => {
        const authService = new AuthService();

        await authService.authentication('');
        verify(MockTokenSessionStorageService.setToken(token)).never();


        await authService.authentication(token);
        verify(await MockAuthStoreFacade.saveAuthModel(deepEqual({ token }))).once();
        verify(MockTokenSessionStorageService.setToken(token)).once();
    });

    it('AuthService.isLogin', async () => {
        const authService = new AuthService();

        when(MockAuthStoreFacade.auth).thenReturn({ token: '' });
        expect(authService.isLogin).toEqual(false);

        when(MockAuthStoreFacade.auth).thenReturn({ token });
        expect(authService.isLogin).toEqual(true);
    });

    it('AuthService.setTokenToHeaders', async () => {
        const authService = new AuthService();
        when(MockAuthStoreFacade.auth).thenReturn({ token });

        const request = {
            headers: {
                Authorization: '',
            },
        };

        const expectedRequest = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        expect(await authService.setTokenToHeaders(request)).toEqual(expectedRequest);
    });

    it('AuthService.logout', () => {
        const authService = new AuthService();

        authService.logout();

        verify(MockTokenSessionStorageService.removeToken()).once();
    });
});
