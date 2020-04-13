import { Inject, injectable } from 'inversify-props';
import UserModel from '@/store/models/user.model';
import { StoreS, StoreType, WatchableStore } from '@/store/types';

export const UserStoreFacadeS = Symbol.for('UserStoreFacadeS');
@injectable(UserStoreFacadeS as unknown as string)
export default class UserStoreFacade implements WatchableStore {
    @Inject(StoreS) private store!: StoreType;

    get user(): UserModel | null { return this.store.state.UserStore.user; }
    async saveUser(user: UserModel) { this.store.commit('setUserUserStore', user); }

    watch(types: ('user')[], func: () => void) {
        types.forEach(type => {
            switch (type) {
                case 'user': {
                    this.store.watch(state => state.UserStore.user, () => {
                        func();
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
}
