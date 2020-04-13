import { Inject, injectable } from 'inversify-props';
import ErrorException from '@/services/exceptions/error.exception';
import UnauthorizedException from '@/services/exceptions/unauthorized.exception';
import AuthService, { AuthServiceS } from '@/services/auth.service';
import NotifyService, { NotifyServiceS } from '@/services/notify.service';

export const ExceptionHandlerS = Symbol.for('ExceptionHandlerS');
@injectable(ExceptionHandlerS as unknown as string)
export default class ExceptionHandler {
    @Inject(AuthServiceS) private authService!: AuthService;
    @Inject(NotifyServiceS) private notifyService!: NotifyService;

    catch(exception: ErrorException) {
        if (exception instanceof UnauthorizedException) {
            this.authService.logout();
        } else {
            this.notifyService.error();
        }
    }
}
