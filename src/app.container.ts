import { container } from 'inversify-props';
import NedbCashBaseService, { NedbCashBaseServiceS } from '@/services/cash/nedb-cash-base.service';
import ApiService, { ApiServiceS } from '@/services/api/api.service';
import NotifyService, { NotifyServiceS } from '@/services/notify.service';
import TokenSessionStorageService, { TokenSessionStorageServiceS } from '@/services/token-session-storage.service';
import UserStoreFacade, { UserStoreFacadeS } from '@/store/user/user.store-facade';
import AuthStoreFacade, { AuthStoreFacadeS } from '@/store/auth/auth.store-facade';
import AuthService, { AuthServiceS } from '@/services/auth.service';
import UserService, { UserServiceS } from '@/services/user.service';
import ConfigService, { ConfigServiceS } from '@/services/config.service';
import AuthGuard, { AuthGuardS } from '@/router/guards/auth-guard';
import { AsyncContainerModule } from 'inversify';

import ExceptionHandler, { ExceptionHandlerS } from '@/services/exceptions/exception-handler.service';
import store from './store';
import { StoreS } from './store/types';

export function bootstrapContainer() {
    container.bind(StoreS).toConstantValue(store);
    container.addSingleton(ApiService, ApiServiceS);
    container.addSingleton(NedbCashBaseService, NedbCashBaseServiceS);
    container.addSingleton(NotifyService, NotifyServiceS);
    container.addSingleton(ConfigService, ConfigServiceS);
    container.addSingleton(ExceptionHandler, ExceptionHandlerS);

    container.addSingleton(AuthGuard, AuthGuardS);

    container.addSingleton(TokenSessionStorageService, TokenSessionStorageServiceS);

    container.addSingleton(UserStoreFacade, UserStoreFacadeS);
    container.addSingleton(UserService, UserServiceS);

    container.addSingleton(AuthStoreFacade, AuthStoreFacadeS);
    container.addSingleton(AuthService, AuthServiceS);
}
