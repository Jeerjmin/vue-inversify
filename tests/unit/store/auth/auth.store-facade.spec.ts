import 'reflect-metadata';
import { container, resetContainer } from 'inversify-props';
import { Store } from 'vuex';
import AuthStoreFacade, { AuthStoreFacadeS } from '@/store/auth/auth.store-facade';
import AuthModel from '@/store/models/auth.model';
import { StoreS, StoreType } from '@/store/types';
import { bootstrapContainer } from '@/app.container';

describe('Vuex as auth.store-facade.ts', () => {
    beforeEach(() => {
        resetContainer();
        bootstrapContainer();
    });

    it('getter AuthStoreFacade.auth', () => {
        const authStoreFacade = container.get<AuthStoreFacade>(AuthStoreFacadeS);
        const store = container.get<StoreType>(StoreS);

        expect(authStoreFacade.auth).toEqual(store.state.AuthStore.auth);
    });

    it('AuthStoreFacade.saveAuthModel', async () => {
        const authStoreFacade = container.get<AuthStoreFacade>(AuthStoreFacadeS);
        const store = container.get<StoreType>(StoreS);

        const auth: AuthModel = {
            token: '123',
        };

        await authStoreFacade.saveAuthModel(auth);

        expect(authStoreFacade.auth).toEqual(auth);
        expect(store.state.AuthStore.auth).toEqual(auth);
    });
});
