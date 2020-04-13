import { Route } from 'vue-router';
import { NextFunction, CanActivateReturn, IGuard } from '@/router/types';
import { container } from 'inversify-props';
import ExceptionHandler, { ExceptionHandlerS } from '@/services/exceptions/exception-handler.service';

export default function SetGuards(guards: IGuard[]) {
    // eslint-disable-next-line consistent-return
    return async (to: Route, from: Route, next: NextFunction) => {
        try {
            if (!guards || guards.length === 0) {
                return next();
            }

            for (let guardIndex = 0; guardIndex < guards.length; guardIndex += 1) {
                // eslint-disable-next-line no-await-in-loop
                const result: CanActivateReturn = await guards[guardIndex].canActivate();

                if (typeof result === 'string') {
                    window.location.href = result;
                    guardIndex = guards.length;
                }
            }

            return next();
        } catch (error) {
            const exceptionHandler = container.get<ExceptionHandler>(ExceptionHandlerS);
            exceptionHandler.catch(error);
        }
    };
}
