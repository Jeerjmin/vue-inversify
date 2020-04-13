import { Inject, injectable } from 'inversify-props';
import AuthService, { AuthServiceS } from '@/services/auth.service';
import { CanActivateReturn, IGuard } from '@/router/types';

export const AuthGuardS = Symbol.for('AuthGuardS');
@injectable(AuthGuardS as unknown as string)
export default class AuthGuard implements IGuard {
    @Inject(AuthServiceS) private authService!: AuthService;

    async canActivate(): Promise<CanActivateReturn> {
        if (!await this.authService.isLogin()) {
            return this.authService.loginUrl;
        }
        return true;
    }
}
