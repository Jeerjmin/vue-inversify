import 'reflect-metadata';
import { container, resetContainer } from 'inversify-props';
import UserStoreFacade, { UserStoreFacadeS } from '@/store/user/user.store-facade';
import UserModel from '@/store/models/user.model';
import { bootstrapContainer } from '@/app.container';
import { StoreS, StoreType } from '@/store/types';

describe('Vuex as user.store-facade.ts', () => {
    beforeEach(() => {
        resetContainer();
        bootstrapContainer();
    });

    it('getter UserStoreFacade.user', () => {
        const userStoreFacade = container.get<UserStoreFacade>(UserStoreFacadeS);
        const store = container.get<StoreType>(StoreS);

        expect(userStoreFacade.user).toEqual(store.state.UserStore.user);
    });

    it('UserStoreFacade.saveUserModel', async () => {
        const userStoreFacade = container.get<UserStoreFacade>(UserStoreFacadeS);
        const store = container.get<StoreType>(StoreS);

        const user: UserModel = {
            id: 1,
            firstName: 'Oleg',
            lastName: 'Tarasov',
            email: 'example@email.com',
            token: 'tokenExample',
        };

        await userStoreFacade.saveUser(user);

        expect(userStoreFacade.user).toEqual(user);
        expect(store.state.UserStore.user).toEqual(user);
    });
});
