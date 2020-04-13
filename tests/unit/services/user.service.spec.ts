import 'reflect-metadata';
import { instance, mock, verify } from 'ts-mockito';
import { container } from 'inversify-props';
import UserStoreFacade, { UserStoreFacadeS } from '@/store/user/user.store-facade';
import UserService from '@/services/user.service';
import UserModel from '@/store/models/user.model';

describe('user.service.ts', () => {
    const MockUserStoreFacade = mock(UserStoreFacade);
    container.bind(UserStoreFacadeS).toConstantValue(instance(MockUserStoreFacade));

    it('UserService.saveUser', async () => {
        const userService = new UserService();

        const user: UserModel = {
            id: 1,
            firstName: 'Oleg',
            lastName: 'Tarasov',
            email: 'example@email.com',
            token: 'tokenExample',
        };

        await userService.setUser(user);

        verify(MockUserStoreFacade.saveUser(user)).once();
    });
});
