import { Inject, injectable } from 'inversify-props';
import UserStoreFacade, { UserStoreFacadeS } from '@/store/user/user.store-facade';
import UserModel from '@/store/models/user.model';
import AuthStoreFacade, { AuthStoreFacadeS } from '@/store/auth/auth.store-facade';

export const UserServiceS = Symbol.for('UserServiceS');
@injectable(UserServiceS as unknown as string)
export default class UserService {
    @Inject(UserStoreFacadeS) private userStoreFacade!: UserStoreFacade;
    @Inject(AuthStoreFacadeS) private authStoreFacade!: AuthStoreFacade;

    get user(): UserModel | null {
        return this.userStoreFacade.user;
    }

    async setUser(user: UserModel) {
        await this.userStoreFacade.saveUser(user);
    }

    async initUser() {
        const { token } = this.authStoreFacade.auth;
        if (token !== null) {
            // Make api request here
            const fakeUser = {
                id: 1,
                firstName: 'Demo name',
                lastName: 'Demo lastName',
                email: 'email',
                token: 'token',
            }

            await this.setUser(fakeUser);
        }
    }
}
