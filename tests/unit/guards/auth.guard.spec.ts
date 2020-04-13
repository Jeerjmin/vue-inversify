import 'reflect-metadata';
import { instance, mock, when } from 'ts-mockito';
import { container } from 'inversify-props';
import ConfigService, { ConfigServiceS } from '@/services/config.service';
import AuthService, { AuthServiceS } from '@/services/auth.service';
import AuthGuard from '@/router/guards/auth-guard';

describe('auth-guaurd.ts', () => {
    const MockAuthService = mock(AuthService);
    container.bind(AuthServiceS).toConstantValue(instance(MockAuthService));
    const MockSettingsService = mock(ConfigService);
    container.bind(ConfigServiceS).toConstantValue(instance(MockSettingsService));

    it('AuthGuard', () => {

    });
});
